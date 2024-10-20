import React, { useState } from "react";
import Select from "react-tailwindcss-select";
import { Option } from "react-tailwindcss-select/dist/components/type";

// const options: Array<Option> = [
//     {label: "Euro", value: "EUR", flag: "https://flagcdn.com/w40/eu.png"},
//     {label: "Switzerland", value: "CHF", flag: "https://flagcdn.com/w40/ch.png"},
//     {label: "United States",value: "USD", flag: "https://flagcdn.com/w40/us.png"},
//     {label: "United Kingdom",value: "GBP", flag: "https://flagcdn.com/w40/gb.png"},
//     {label: "China", value: "CNY", flag: "https://flagcdn.com/w40/cn.png"},
//     {label: "Australia", value: "AUD", flag: "https://flagcdn.com/w40/au.png"},
//     {label: "Japan", value: "JPY", flag: "https://flagcdn.com/w40/jp.png"},
//     {label: "Poland", value: "PLN", flag: "https://flagcdn.com/w40/pl.png"}
// ];

interface AppOption extends Option {
  value: Key | null | undefined;
  label: any;
  flag: string;
}

const options: Array<AppOption> = [
  { label: "EUR / Euro", value: "EUR", flag: "https://flagcdn.com/w40/eu.png" },
  {
    label: "CHF / Switzerland",
    value: "CHF",
    flag: "https://flagcdn.com/w40/ch.png",
  },
  {
    label: "USD / United States",
    value: "USD",
    flag: "https://flagcdn.com/w40/us.png",
  },
  {
    label: "GBP / United Kingdom",
    value: "GBP",
    flag: "https://flagcdn.com/w40/gb.png",
  },
  {
    label: "CNY / China",
    value: "CNY",
    flag: "https://flagcdn.com/w40/cn.png",
  },
  {
    label: "AUD / Australia",
    value: "AUD",
    flag: "https://flagcdn.com/w40/au.png",
  },
  {
    label: "JPY / Japan",
    value: "JPY",
    flag: "https://flagcdn.com/w40/jp.png",
  },
  {
    label: "PLN / Poland",
    value: "PLN",
    flag: "https://flagcdn.com/w40/pl.png",
  },
];

// const options: Array<Option> = [
//     { value: "fox", label: "🦊 Fox" },
//     { value: "Butterfly", label: "🦋 Butterfly" },
//     { value: "Honeybee", label: "🐝 Honeybee" }
// ];

const CurrencySearch = () => {
  // const [isOpen, setIsOpen] = useState(false)

  const [country, setCountry] = useState<AppOption | null>(null);

  const handleChange = (value: AppOption) => {
    console.log("value:", value);
    setCountry(value);
  };

  return (
    <>
      <form className="max-w-sm mx-auto flex items-center space-x-4 py-4">
        <select
          id="underline_select"
          value={"EUR"}
          disabled={true}
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option value="EUR" selected>
            EUR
          </option>
        </select>

        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
        </button>

        <select
          id="underline_select"
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option selected>Choose a country</option>
          {options.map((value) => {
            // ikona value.flag
            return (
              <option key={value.value} value={value.value}>
                {`${value.label}`}
              </option>
            );
          })}
        </select>
      </form>
    </>
  );
};

export default CurrencySearch;
