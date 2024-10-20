import {
  FaTimes,
  FaMoneyBillWave,
  FaRegClipboard,
  FaCalendarCheck,
} from "react-icons/fa";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function DebtStatusWidget({ onClose }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State for visibility

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  useEffect(() => {
    setIsVisible(true); // Trigger animation on mount
  }, []);

  return (
    <div
      className={`relative w-96 h-auto p-4 bg-white rounded-3xl shadow-custom border flex flex-col justify-between transition-all duration-300 ease-in-out transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors duration-300 ease-in-out"
        onClick={onClose}
      >
        <FaTimes size={18} />
      </button>

      <div>
        <h2 className="text-xl font-semibold mb-3">Debt Status</h2>
        <div className="my-2 border-b border-gray-300"></div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <p className="text-md font-medium">Total Debt</p>
            <p className="text-xl font-bold text-red-600">10,000 €</p>
          </div>
          <div>
            <p className="text-md font-medium">Remaining Balance</p>
            <p className="text-xl font-bold text-green-600">5,000 €</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mb-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-md bg-green-100 flex items-center">
              <FaMoneyBillWave className="text-green-700 mr-3" />
              <div>
                <p className="text-sm font-bold">Loans</p>
                <p className="text-md font-bold text-green-700">1,000 €</p>
              </div>
            </div>
            <div className="p-2 rounded-md bg-yellow-100 flex items-center">
              <FaRegClipboard className="text-yellow-700 mr-3" />
              <div>
                <p className="text-sm font-bold">Invoices</p>
                <p className="text-md font-bold text-yellow-700">2,000 €</p>
              </div>
            </div>
            <div className="p-2 rounded-md bg-red-100 flex items-center">
              <FaCalendarCheck className="text-red-700 mr-3" />
              <div>
                <p className="text-sm font-bold">Taxes</p>
                <p className="text-md font-bold text-red-700">3,000 €</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div
            className="text-md font-medium cursor-pointer select-none flex items-center mt-2"
            onClick={toggleNotifications}
          >
            Upcoming payments
            <span className="ml-2">
              {isNotificationsOpen ? (
                <svg
                  className="w-4 h-4 transform rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isNotificationsOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            {isNotificationsOpen && (
              <ul className="list-disc list-inside mt-2">
                <li className="text-sm text-gray-600 mb-1">
                  Tax payment due in 3 days
                </li>
                <li className="text-sm text-gray-600 mb-1">
                  Loan payment overdue by 5 days
                </li>
                <li className="text-sm text-gray-600 mb-1">
                  Invoice from Supplier X awaiting payment
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <button className="mt-2 font-poppins font-semibold text-white bg-orange-500 py-2 px-4 rounded-lg hover:bg-orange-600 text-sm">
          Pay Now
        </button>
        <button className="mt-2 font-poppins font-semibold text-black border border-gray-400 py-2 px-4 rounded-lg bg-white text-sm">
          Set Up Reminder
        </button>
        <button className="mt-2 font-poppins font-semibold text-black bg-white py-2 px-4 rounded-lg text-sm">
          View Details
        </button>
      </div>
    </div>
  );
}

export default DebtStatusWidget;
