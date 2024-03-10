import React, { useState } from "react";

const DisplayOptions = () => {
  // State variables to manage display options
  const [fontSize, setFontSize] = useState("medium");
  const [fontFamily, setFontFamily] = useState("serif");
  const [theme, setTheme] = useState("light");

  // Function to handle changes in display options
  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  const handleFontFamilyChange = (family) => {
    setFontFamily(family);
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <div className="flex">
      <div className="display-options p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Display Options</h2>
        <div className="mb-2">
          <label className="block text-gray-700">Font Size:</label>
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={fontSize}
            onChange={(e) => handleFontSizeChange(e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Font Family:</label>
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={fontFamily}
            onChange={(e) => handleFontFamilyChange(e.target.value)}
          >
            <option value="serif">Serif</option>
            <option value="sans-serif">Sans-serif</option>
            <option value="monospace">Monospace</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Theme:</label>
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};

export default DisplayOptions;
