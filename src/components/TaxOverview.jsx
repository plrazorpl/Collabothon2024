/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

// Component for displaying individual tax items
const TaxItem = ({ tax }) => (
  <div className="flex justify-between items-center border-b py-2">
    <div>{tax.name}</div>
    <div>€{tax.amount.toFixed(2)}</div>
    <div className="text-gray-500">{tax.deadline}</div>
  </div>
);

// Main TaxOverview component
function TaxOverview({ onClose }) {
  const [salary, setSalary] = useState(""); // State for the salary input
  const [noIncome, setNoIncome] = useState(false); // State for no income checkbox
  const [selectedAccount, setSelectedAccount] = useState(
    "DE89 3704 0044 0532 0130 00"
  ); // Selected account state
  const [showTaxes, setShowTaxes] = useState(false); // State to show/hide tax information
  const [paymentPeriod, setPaymentPeriod] = useState("monthly"); // State for payment period
  const [isVisible, setIsVisible] = useState(false); // State for visibility

  // Calculate taxes based on salary and payment period
  const taxes =
    noIncome || !salary
      ? []
      : [
          {
            name: "VAT (Mehrwertsteuer)",
            amount: salary * (paymentPeriod === "annually" ? 0.6 : 0.05),
            deadline: "2024-11-10",
          },
          {
            name: "Corporate Tax (Körperschaftsteuer)",
            amount: salary * (paymentPeriod === "annually" ? 0.48 : 0.04),
            deadline: "2024-12-15",
          },
          {
            name: "Trade Tax (Gewerbesteuer)",
            amount: salary * (paymentPeriod === "annually" ? 0.24 : 0.02),
            deadline: "2024-10-31",
          },
          {
            name: "Solidarity Surcharge (Solidaritätszuschlag)",
            amount: salary * (paymentPeriod === "annually" ? 0.18 : 0.015),
            deadline: "2024-11-25",
          },
          {
            name: "Church Tax (Kirchensteuer)",
            amount: salary * (paymentPeriod === "annually" ? 0.12 : 0.01),
            deadline: "2024-11-18",
          },
          {
            name: "Employer Social Security Contribution (Sozialversicherungsbeitrag)",
            amount: salary * (paymentPeriod === "annually" ? 0.36 : 0.03),
            deadline: "2024-12-01",
          },
        ];

  // Calculate total amount due
  const totalAmount = taxes.reduce((sum, tax) => sum + tax.amount, 0);

  // Effect to show taxes based on salary
  useEffect(() => {
    if (salary && !noIncome) {
      setShowTaxes(true);
    } else {
      setShowTaxes(false);
    }
  }, [salary, noIncome]);

  useEffect(() => {
    setIsVisible(true); // Trigger animation on mount
  }, []);

  return (
    <div
      className={`w-[500px] p-4 bg-white rounded-3xl shadow-custom border relative transition-all duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors duration-300 ease-in-out"
        onClick={onClose}
      >
        <FaTimes size={18} />
      </button>

      <h1 className="text-2xl font-semibold mb-4">
        Payment of Taxes and Contributions
      </h1>

      <div className="mb-4">
        <label className="block text-gray-700">
          Enter your company&apos;s income:
        </label>
        <input
          type="number"
          value={salary}
          onChange={(e) => {
            const value = e.target.value;
            setSalary(value);
          }}
          placeholder="Enter the income amount"
          className="w-full border border-gray-300 p-2 rounded-lg mt-2 placeholder-gray-400"
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="mr-2 text-gray-700">No income for this period:</label>
        <input
          type="checkbox"
          checked={noIncome}
          onChange={(e) => setNoIncome(e.target.checked)}
          className="h-5 w-5"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Select payment period:</label>
        <select
          value={paymentPeriod}
          onChange={(e) => setPaymentPeriod(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-lg mt-2"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="annually">Annually</option>
        </select>
      </div>

      <div
        style={{
          maxHeight: showTaxes ? "500px" : "0",
          opacity: showTaxes ? "1" : "0",
          overflow: "hidden",
          transition: "max-height 0.5s ease, opacity 0.5s ease",
        }}
      >
        {!noIncome && salary && (
          <>
            {taxes.map((tax, index) => (
              <TaxItem key={index} tax={tax} />
            ))}
            <div className="mt-4 text-right">
              <span className="font-semibold">Total Due:</span> €
              {totalAmount.toFixed(2)}
            </div>
          </>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Select account:</label>
        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-lg mt-2"
        >
          <option value="DE89 3704 0044 0532 0130 00">
            DE89 3704 0044 0532 0130 00 (Balance: €51,000)
          </option>
          <option value="DE44 5001 0517 5407 3249 31">
            DE44 5001 0517 5407 3249 31 (Balance: €10,000)
          </option>
          <option value="DE68 2012 0500 0001 2333 44">
            DE68 2012 0500 0001 2333 44 (Balance: €25,000)
          </option>
        </select>
      </div>

      <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg">
        {noIncome ? "Continue" : "Pay Now"}
      </button>
    </div>
  );
}

export default TaxOverview;
