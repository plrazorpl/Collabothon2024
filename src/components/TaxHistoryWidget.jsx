import { useState, useEffect } from "react";
import { FaSearch, FaFileCsv, FaTimes } from "react-icons/fa";

const taxHistoryData = [
  {
    date: "2024-03-15",
    type: "Income Tax",
    amount: 1200.5,
    status: "Paid",
  },
  {
    date: "2024-01-10",
    type: "Value Added Tax (VAT)",
    amount: 800.0,
    status: "Paid",
  },
  {
    date: "2023-12-05",
    type: "Corporate Tax",
    amount: 1500.0,
    status: "Pending",
  },
  {
    date: "2023-10-20",
    type: "Property Tax",
    amount: 600.75,
    status: "Paid",
  },
  {
    date: "2023-07-15",
    type: "Income Tax",
    amount: 950.0,
    status: "Paid",
  },
  // More tax history entries for mock data
  {
    date: "2023-05-10",
    type: "Corporate Tax",
    amount: 1300.0,
    status: "Paid",
  },
  {
    date: "2023-03-15",
    type: "Income Tax",
    amount: 1100.0,
    status: "Paid",
  },
  {
    date: "2023-01-20",
    type: "Value Added Tax (VAT)",
    amount: 900.0,
    status: "Paid",
  },
  {
    date: "2022-12-15",
    type: "Property Tax",
    amount: 700.0,
    status: "Paid",
  },
  {
    date: "2022-10-10",
    type: "Corporate Tax",
    amount: 1250.0,
    status: "Pending",
  },
  {
    date: "2022-09-01",
    type: "Income Tax",
    amount: 950.5,
    status: "Paid",
  },
];

// eslint-disable-next-line react/prop-types
function TaxHistoryWidget({ onClose }) {
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false); // State for visibility

  // Trigger visibility when the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredTaxHistory = taxHistoryData.filter((tax) => {
    const matchesType = selectedType === "All" || tax.type === selectedType;
    const matchesSearch =
      tax.date.includes(searchTerm) ||
      tax.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const downloadCSV = () => {
    const csvRows = [
      ["Date", "Type", "Amount (€)", "Status"],
      ...filteredTaxHistory.map((tax) => [
        tax.date,
        tax.type,
        tax.amount.toFixed(2),
        tax.status,
      ]),
    ];

    const csvString = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "tax_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`w-[550px] p-4 bg-white rounded-3xl shadow-custom border relative transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors duration-300 ease-in-out"
        onClick={onClose}
      >
        <FaTimes size={18} />
      </button>

      <h2 className="text-xl font-semibold mb-3">Tax History</h2>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md p-2 flex-grow transition duration-200 ease-in-out focus:ring focus:ring-blue-300 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-gray-500 ml-2" size={20} />
        </div>
        <select
          className="border border-gray-300 rounded-md p-2 w-full transition duration-200 ease-in-out focus:ring focus:ring-blue-300 focus:border-blue-500"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Income Tax">Income Tax</option>
          <option value="Value Added Tax (VAT)">Value Added Tax (VAT)</option>
          <option value="Corporate Tax">Corporate Tax</option>
          <option value="Property Tax">Property Tax</option>
        </select>
      </div>

      <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTaxHistory.length > 0 ? (
              filteredTaxHistory.map((tax, index) => (
                <tr
                  key={index}
                  className={`border-b transition duration-200 ease-in-out transform hover:scale-105 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4">{tax.date}</td>
                  <td className="py-2 px-4">{tax.type}</td>
                  <td className="py-2 px-4">{tax.amount.toFixed(2)} €</td>
                  <td
                    className={`py-2 px-4 ${
                      tax.status === "Paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tax.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-600">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={downloadCSV}
        className="mt-4 w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 flex items-center justify-center"
      >
        <FaFileCsv className="mr-2" />
        Download CSV
      </button>
    </div>
  );
}

export default TaxHistoryWidget;
