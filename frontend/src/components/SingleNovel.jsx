import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleNovel = () => {
  const { id } = useParams();
  const [novel, setNovel] = useState(null);

  useEffect(() => {
    fetch(`/api/novels/${id}`)
      .then((res) => res.json())
      .then((data) => setNovel(data));
  }, [id]);

  if (!novel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10 px-4 lg:px-20">
      <h1>{novel.title}</h1>
      <img src={novel.imageURL} alt={novel.title} className="h-96" />
      <p>{novel.description}</p>
      {/* other novel details... */}
    </div>
  );
};

export default SingleNovel;
