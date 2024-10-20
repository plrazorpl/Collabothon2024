"use client";
import React, { ReactNode, useEffect } from "react";

interface DrawerProps {
  open: boolean;
  handleToggle: () => void;
  width: "50%" | "75%";
  children: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  handleToggle,
  width,
  children,
}) => {
  const layerWidth = width === "50%" ? "w-1/2" : "w-3/4";

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up by removing the class when the component is unmounted
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-10 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleToggle}
      />
      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 bg-white shadow-lg h-full transition-transform duration-300 pb-16 z-20 w-full xl:w-1/2 ${
          open ? "translate-x-0" : "translate-x-full"
        } ${layerWidth}`}
      >
        {/* Action Buttons */}
        <div className="flex justify-between items-center p-8 py-8 border-gray-300 border-b-2 shadow-md">
          <div
            onClick={handleToggle}
            className="flex items-center space-x-2 cursor-pointer"
          >
            {/* Back Button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>

            <span className="text-lg font-medium">Close</span>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="p-4 overflow-y-auto h-full">
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
