import React, { useEffect, useState } from 'react'
import NovelCards from './NovelCards'

const OtherNovels = () => {
    const [novels, setNovels] = useState([]);

    useEffect(() => {
      fetch("api/novels/")
        .then((res) => res.json())
        .then((data) => setNovels(data.slice(5, 12)));
    }, []);
  
    return (
      <div>
        <NovelCards novels={novels} headline="Other Novels" />
      </div>
    );
}

export default OtherNovels