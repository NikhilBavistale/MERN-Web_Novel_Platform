import React from "react";
import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const DashSearch = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const fetchData = (value) => {
    fetch(`/api/search?query=${encodeURIComponent(value)}`)
      .then((response) => response.json())
      .then((json) => {
        setResults(json);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleResultClick = (novelId) => {
    navigate(`/novels/${novelId}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/novels`);
  };
  return (
    <div className="relative">
      <TextInput
        placeholder="Type to search..."
        rightIcon={AiOutlineSearch}
        className="hidden lg:inline"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {results && results.length > 0 && (
        <div className="absolute z-10 w-full bg-white flex flex-col shadow-md rounded-lg mt-4 overflow-y-auto max-h-75 sm:max-h-60 md:max-h-48 lg:max-h-[24rem]">
          {results.map((result, id) => {
            return (
              <div
                className="p-2 pl-5 hover:bg-gray-200"
                onClick={() => handleResultClick(result._id)}
                key={id}
              >
                {result.title}
              </div>
            );
          })}
        </div>
      )}
      <Button
        className="w-12 h-10 lg:hidden"
        color="gray"
        pill
        onClick={handleSubmit}
      >
        <AiOutlineSearch />
      </Button>
    </div>
  );
};

export default DashSearch;
