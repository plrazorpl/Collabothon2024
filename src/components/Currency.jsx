/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // Import the close icon

// Component for displaying transaction summary
const TransactionSummary = ({ transaction }) => (
  <div className="flex justify-between items-center border-b py-2">
    <div>
      {transaction.fromAccount} ➔ {transaction.toAccount}
    </div>
    <div>
      {transaction.amount.toFixed(2)} {transaction.currency}
    </div>
    <div className="text-gray-500">{transaction.date}</div>
    <div className="text-gray-500">
      Fee: {transaction.conversionFee.toFixed(2)} {transaction.currency}
    </div>
  </div>
);

// Main MultiCurrencyTransaction component
function MultiCurrencyTransaction({ onClose }) {
  // Accept onClose as a prop
  const [fromAccount, setFromAccount] = useState("DE89 3704 0044 0532 0130 00");
  const [toAccount, setToAccount] = useState("DE44 5001 0517 5407 3249 31");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [conversionFee, setConversionFee] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Mock accounts with different currencies
  const accounts = [
    { id: "DE89 3704 0044 0532 0130 00", balance: 51000, currency: "EUR" },
    { id: "DE44 5001 0517 5407 3249 31", balance: 10000, currency: "USD" },
    { id: "DE68 2012 0500 0001 2333 44", balance: 25000, currency: "DEM" },
  ];

  const conversionFees = {
    EUR: 0.02, // 2% fee for converting from EUR
    USD: 0.03, // 3% fee for converting from USD
    DEM: 0.025, // 2.5% fee for converting from DEM
  };

  const calculateConversionFee = (inputAmount) => {
    const fromCurrency = accounts.find(
      (acc) => acc.id === fromAccount
    ).currency;
    const conversionFeeRate =
      fromCurrency === toAccount ? 0 : conversionFees[fromCurrency];
    const fee = inputAmount * conversionFeeRate;
    return fee;
  };

  const handleAmountChange = (e) => {
    const inputAmount = parseFloat(e.target.value) || 0;
    setAmount(inputAmount);
    const fee = calculateConversionFee(inputAmount);
    setConversionFee(fee);
  };

  const handleTransaction = () => {
    if (amount && fromAccount && toAccount) {
      const fromCurrency = accounts.find(
        (acc) => acc.id === fromAccount
      ).currency;
      const toCurrency = accounts.find((acc) => acc.id === toAccount).currency;

      const newTransaction = {
        fromAccount,
        toAccount,
        amount: amount - conversionFee,
        currency: toCurrency,
        conversionFee,
        date: new Date().toLocaleDateString(),
      };

      setTransactions([...transactions, newTransaction]);
      setAmount("");
      setConversionFee(0);
    }
  };

  useEffect(() => {
    setIsVisible(true); // Trigger slide-in animation on mount
  }, []);

  return (
    <div
      className={`relative w-[800px] p-4 bg-white rounded-3xl shadow-custom border mx-auto transition-transform duration-300 ease-in-out transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors duration-300 ease-in-out"
        onClick={onClose} // Call the onClose function passed as a prop
      >
        <FaTimes size={18} />
      </button>

      <h1 className="text-2xl font-semibold mb-4">
        Multi-Currency Transactions
      </h1>

      <div className="mb-4">
        <label className="block text-gray-700">From Account:</label>
        <select
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-lg mt-2"
        >
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.id} (Balance: {account.balance} {account.currency})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">To Account:</label>
        <select
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-lg mt-2"
        >
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.id} (Balance: {account.balance} {account.currency})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Transaction Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="w-full border border-gray-300 p-2 rounded-lg mt-2 placeholder-gray-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Conversion Fee:</label>
        <div className="border border-gray-300 p-2 rounded-lg mt-2">
          {conversionFee.toFixed(2)}{" "}
          {accounts.find((acc) => acc.id === fromAccount).currency}
        </div>
      </div>

      <button
        onClick={handleTransaction}
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
      >
        Execute Transaction
      </button>

      <h2 className="text-xl font-semibold mt-6">Transaction Summary</h2>
      <div className="mt-2 max-h-60 overflow-y-auto">
        {transactions.map((transaction, index) => (
          <TransactionSummary key={index} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default MultiCurrencyTransaction;
