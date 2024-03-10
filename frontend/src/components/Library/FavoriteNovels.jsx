import { Card } from "flowbite-react";
import React from "react";

const FavoriteNovels = ({ novels }) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Favorite Novels</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Display novels */}
        {novels.map((novel) => (
          // <div key={novel._id} className="bg-gray-200 p-4 rounded">
          //   <h3 className="text-lg font-semibold">{novel.title}</h3>
          //   <p>{novel.author}</p>
          // </div>
          <Card className="max-w-sm" imgSrc={novel.imageURL} horizontal>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {novel.title}
            </h5>
            <p className="mt-1 text-gray-700 dark:text-gray-400">
              {novel.authorName}
            </p>
          
          </Card>
        ))}
      </div>
    </div>
  );
};
export default FavoriteNovels;
