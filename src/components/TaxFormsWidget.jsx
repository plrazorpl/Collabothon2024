import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const TaxFormsWidget = ({ onClose }) => {
  const [forms, setForms] = useState([
    { id: 1, name: "VAT Form", status: "in-progress", details: "" },
    {
      id: 2,
      name: "Income Tax Form",
      status: "completed",
      details: "Submitted on 2024-03-15",
    },
    { id: 3, name: "Corporate Tax Form", status: "overdue", details: "" },
  ]);

  const [selectedForm, setSelectedForm] = useState(null);
  const [formDetails, setFormDetails] = useState({
    taxNumber: "",
    income: "",
    deductions: "",
    dueDate: "",
    notes: "",
  });
  const [showFormDetails, setShowFormDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State for visibility animation

  // Trigger visibility animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFormSelect = (form) => {
    setSelectedForm(form);
    setFormDetails({
      taxNumber: "",
      income: "",
      deductions: "",
      dueDate: "",
      notes: "",
    });
    setShowFormDetails(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedForms = forms.map((form) =>
      form.id === selectedForm.id
        ? {
            ...form,
            status: "completed",
            details: `Tax Number: ${formDetails.taxNumber}, Income: €${formDetails.income}, Deductions: €${formDetails.deductions}, Due Date: ${formDetails.dueDate}, Notes: ${formDetails.notes}`,
          }
        : form
    );
    setForms(updatedForms);
    setShowFormDetails(false);
    setSelectedForm(null);
    setFormDetails({
      taxNumber: "",
      income: "",
      deductions: "",
      dueDate: "",
      notes: "",
    });
  };

  const handleDelete = (id) => {
    const updatedForms = forms.filter((form) => form.id !== id);
    setForms(updatedForms);
  };

  return (
    <div
      className={`relative w-96 mx-auto p-4 bg-white rounded-3xl shadow-custom transition-all duration-300 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors duration-300 ease-in-out"
        onClick={onClose}
      >
        <FaTimes size={18} />
      </button>

      <h2 className="text-xl font-semibold mb-2">Tax Forms and Filings</h2>

      <ul className="space-y-2">
        {forms.map((form) => (
          <li
            key={form.id}
            className={`p-2 border rounded-md transition-all duration-300 ${
              form.status === "completed"
                ? "bg-green-100"
                : form.status === "overdue"
                ? "bg-red-100"
                : "bg-yellow-100"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold">{form.name}</span>
              <div>
                <button
                  className="text-orange-500 hover:text-orange-600 mr-2"
                  onClick={() => handleFormSelect(form)}
                >
                  {form.status === "completed" ? "View Details" : "Edit"}
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(form.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div
              className={`mt-1 transition-all duration-300 ${
                showFormDetails && selectedForm?.id === form.id
                  ? "opacity-100 h-auto"
                  : "opacity-0 h-0 overflow-hidden"
              }`}
            >
              {form.details && <p>{form.details}</p>}
            </div>
          </li>
        ))}
      </ul>

      {showFormDetails && selectedForm && (
        <div className="mt-2">
          <h3 className="text-lg font-semibold">
            Fill Out {selectedForm.name}
          </h3>
          <div className="space-y-2">
            <input
              type="text"
              name="taxNumber"
              placeholder="Tax Number"
              value={formDetails.taxNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-1 rounded-lg"
            />
            <input
              type="number"
              name="income"
              placeholder="Income (€)"
              value={formDetails.income}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-1 rounded-lg"
            />
            <input
              type="number"
              name="deductions"
              placeholder="Deductions (€)"
              value={formDetails.deductions}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-1 rounded-lg"
            />
            <input
              type="date"
              name="dueDate"
              value={formDetails.dueDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-1 rounded-lg"
            />
            <textarea
              name="notes"
              placeholder="Additional Notes"
              value={formDetails.notes}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-1 rounded-lg"
              rows={3}
            />
          </div>
          <button
            className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-1 rounded-lg transition-transform duration-300"
            onClick={handleSubmit}
          >
            Submit {selectedForm.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default TaxFormsWidget;
