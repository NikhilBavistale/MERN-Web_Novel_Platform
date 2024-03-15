import { Label, Pagination, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

const SortFilterPagination = ({
  filterTerm,
  setFilterTerm,
  sortOption,
  setSortOption,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const windowWidth = useWindowWidth();
  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center gap-2 py-1 my-1">
      <div className="flex flex-col md:flex-row justify-between items-center my-8">
        <div className="mb-4 md:mb-0">
          <Label>Sort By:</Label>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)} // Changed from setSortType to setSortOption
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="genre">Genre</option>
            <option value="popular">Popular</option>
            <option value="recommended">Recommended</option>
            <option value="rating">Rating</option>
            <option value="updated">Time Updated</option>
          </Select>
        </div>
        {windowWidth < 1024 ? (
          <Pagination
            layout="table"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            showIcons
          />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            showIcons
          />
        )}
        <div>
          <Label>Filter By:</Label>
          <Select
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="paused">Paused</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SortFilterPagination;
