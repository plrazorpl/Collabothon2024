import { useState } from "react";
import {
  FaTimes,
  FaMoneyBillWave,
  FaHistory,
  FaChartBar,
  FaFileInvoice,
  FaExchangeAlt, // Updated icon for currency transactions
} from "react-icons/fa";
import commerzduck from "../assets/commerzduck.png";
import commerzduckExpanded from "../assets/commerzduckExpanded.png"; // New image for expanded state
import DebtStatusWidget from "./DebtStatusWidget";
import TaxHistoryWidget from "./TaxHistoryWidget";
import TaxOverview from "./TaxOverview";
import TaxFormsWidget from "./TaxFormsWidget";
import MultiCurrencyTransaction from "./Currency"; // Import the new widget

const Widget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeWidget, setActiveWidget] = useState(null);

  const toggleWidget = (widget) => {
    setActiveWidget((prev) => (prev === widget ? null : widget));
  };

  const renderActiveWidget = () => {
    switch (activeWidget) {
      case "debt":
        return <DebtStatusWidget onClose={() => toggleWidget("debt")} />;
      case "history":
        return <TaxHistoryWidget onClose={() => toggleWidget("history")} />;
      case "overview":
        return <TaxOverview onClose={() => toggleWidget("overview")} />;
      case "forms":
        return <TaxFormsWidget onClose={() => toggleWidget("forms")} />;
      case "currency": // New case for the MultiCurrencyTransaction widget
        return (
          <MultiCurrencyTransaction onClose={() => toggleWidget("currency")} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <div
        className={`transition-all duration-300 ease-in-out flex flex-col items-center justify-around border bg-white rounded-3xl shadow-custom w-72 ${
          isExpanded ? "h-[500px]" : "h-64"
        }`}
      >
        <div className="flex flex-col items-center my-4">
          <img
            src={isExpanded ? commerzduckExpanded : commerzduck} // Conditional rendering of the image
            alt="commerzduck"
            className="w-48 transition-all duration-300 ease-in-out"
          />
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="font-poppins font-semibold text-white bg-orange-500 py-2 px-8 rounded-3xl text-sm hover:bg-orange-600 transition-colors duration-300 ease-in-out"
              title="Open Accountant"
            >
              Accountant
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="flex flex-col space-y-3 w-full p-4">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-red-500 transition-colors duration-300 ease-in-out"
              title="Close Menu"
            >
              <FaTimes size={18} />
            </button>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Debt Status", icon: FaMoneyBillWave, widget: "debt" },
                { label: "Tax History", icon: FaHistory, widget: "history" },
                { label: "Tax Overview", icon: FaChartBar, widget: "overview" },
                { label: "Tax Forms", icon: FaFileInvoice, widget: "forms" },
                {
                  label: "Currency Transactions",
                  icon: FaExchangeAlt, // Changed icon for currency transactions
                  widget: "currency",
                },
              ].map(({ label, icon: Icon, widget }) => (
                <button
                  key={widget}
                  onClick={() => toggleWidget(widget)}
                  className={`hover:bg-gray-100 transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md p-2 flex flex-col items-center rounded-lg text-xs border border-orange-500 bg-orange-100 ${
                    activeWidget === widget ? "bg-gray-200" : ""
                  }`}
                  title={label}
                >
                  <Icon size={20} className="text-orange-500 mb-1" />
                  <span className="text-xs font-medium text-gray-700">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 ml-4">
        {activeWidget && (
          <div key={activeWidget} className="w-72">
            {renderActiveWidget()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Widget;
