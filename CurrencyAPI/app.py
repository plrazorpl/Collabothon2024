import codecs
import os
import sys

import numpy as np
import pandas as pd
from flask import Flask, jsonify
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model

app = Flask(__name__)

if sys.platform == 'win32':
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())

# Step 1: Load data from CSV
def load_data(file_path):
    data = pd.read_csv(file_path)
    return data


# Step 2: Preprocess the data
def preprocess_data(data):
    if 'TIME_PERIOD' not in data.columns or 'OBS_VALUE' not in data.columns:
        raise KeyError("Expected columns 'TIME_PERIOD' and 'OBS_VALUE' not found in the data.")

    data['TIME_PERIOD'] = pd.to_datetime(data['TIME_PERIOD'])
    data.set_index('TIME_PERIOD', inplace=True)

    exchange_rates = data[['OBS_VALUE']].ffill().values
    return exchange_rates, data.index


# Step 3: Scale the data
def scale_data(data):
    scaler = MinMaxScaler(feature_range=(0, 1))
    return scaler.fit_transform(data), scaler


# Step 4: Create sequences
def create_dataset(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length - 1):
        X.append(data[i:(i + seq_length), 0])
        y.append(data[i + seq_length, 0])
    return np.array(X), np.array(y)


# Step 5: Predict future values
def predict_future(model, data, seq_length, future_steps, scaler):
    future_predictions = []
    last_sequence = data[-seq_length:]  # Start with the last sequence in the test data

    for _ in range(future_steps):
        last_sequence_reshaped = np.reshape(last_sequence, (1, seq_length, 1))
        next_value = model.predict(last_sequence_reshaped)
        future_predictions.append(next_value[0, 0])
        last_sequence = np.append(last_sequence[1:], next_value, axis=0)

    future_predictions = scaler.inverse_transform(np.array(future_predictions).reshape(-1, 1))
    return future_predictions


@app.route('/predict/<int:time>', methods=['GET'])
def predict(time):
    model_path = 'currency_model.h5'
    data_path = 'ecb_exchange_rates.csv'

    # Load and preprocess data
    data = load_data(data_path)
    exchange_rates, date_index = preprocess_data(data)

    # Scale the data
    scaled_data, scaler = scale_data(exchange_rates)

    # Create dataset sequences
    sequence_length = 60
    X, y = create_dataset(scaled_data, sequence_length)
    X = np.reshape(X, (X.shape[0], X.shape[1], 1))

    # Split into training and testing sets
    training_size = int(len(X) * 0.8)
    X_train, X_test = X[:training_size], X[training_size:]
    y_train, y_test = y[:training_size], y[training_size:]

    # Load the model
    if not os.path.exists(model_path):
        return jsonify({"error": "Model file not found"}), 404
    model = load_model(model_path)

    # Make predictions for the test data
    predictions = model.predict(X_test)
    predictions = scaler.inverse_transform(predictions)

    # Prepare x-axis data for actual and predicted values
    actual_dates = date_index[-len(y_test):].tolist()  # Actual dates
    predicted_dates = actual_dates[len(actual_dates) - len(predictions):]  # Adjusted predicted dates

    future_predictions = predict_future(model, scaled_data, sequence_length, time, scaler)

    # Create future date range
    last_date = actual_dates[-1]
    future_dates = pd.date_range(last_date, periods=time + 1, freq='D')[1:]

    # Prepare response data
    actual = scaler.inverse_transform([y_test]).flatten().tolist()
    predicted = predictions.flatten().tolist()
    future_pred_list = future_predictions.flatten().tolist()

    # Return the three series in JSON format, including x-axis data
    return jsonify({
        'actual': {
            'dates': actual_dates,
            'values': actual
        },
        'predicted': {
            'dates': predicted_dates,
            'values': predicted
        },
        'future': {
            'dates': future_dates.tolist(),
            'values': future_pred_list
        }
    })


if __name__ == '__main__':
    app.run(debug=True)
