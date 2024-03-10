import React from "react";

const ReadingNow = ({ novels }) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reading Now</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Display novels */}
        {novels.map((novel) => (
          <div key={novel._id} className="bg-gray-200 p-4 rounded">
            <h3 className="text-lg font-semibold">{novel.title}</h3>
            <p>{novel.author}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingNow;
