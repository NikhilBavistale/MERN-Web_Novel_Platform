import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Label,
  Pagination,
  Select,
  TextInput,
} from "flowbite-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const NovelList = () => {
  const [userNovels, setUserNovels] = useState([]);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [sortType, setSortType] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(searchParams.get("searchTerm") || "");
  }, [searchParams]);

  useEffect(() => {
    const fetchAllNovels = async () => {
      try {
        const res = await fetch(`/api/novels`);
        const data = await res.json();
        if (res.ok) {
          setUserNovels(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllNovels();
  }, []);

  const filteredNovels = userNovels
    .filter((novel) => {
      if (filterType === "all") {
        return true;
      } else {
        return novel.status === filterType;
      }
    })
    .sort((a, b) => {
      if (
        sortType === "popular" ||
        sortType === "recommended" ||
        sortType === "rating" ||
        sortType === "updated"
      ) {
        // Handle the sorting logic for these sort types
      } else if (a[sortType] && b[sortType]) {
        return a[sortType].localeCompare(b[sortType]);
      } else {
        return 0;
      }
    });

  const totalPages = Math.ceil(filteredNovels.length / itemsPerPage);

  const novelsForCurrentPage = filteredNovels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="mt-5 px-4 lg:px-24">
      <h2 className="text-5xl font-bold text-center">All Novels are here</h2>
      <div className="flex flex-col md:flex-row justify-between items-center my-8">
        <div className="mb-4 md:mb-0">
          <Label>Search By:</Label>
          <TextInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mb-4 md:mb-0">
          <Label>Sort By:</Label>
          <Select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
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
        <div>
          <Label>Filter By:</Label>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="paused">Paused</option>
          </Select>
        </div>
      </div>
      <div className="grid gap-8 my-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredNovels.length > 0 ? (
          novelsForCurrentPage.map((novel, index) => (
            <Card key={index} className="flex flex-col h-full">
              <div className="aspect-w-4 aspect-h-6">
                <img
                  src={novel.imageURL}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Content */}
              <div className="flex-grow flex flex-col gap-1 justify-between p-1">
                <div>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {novel.title.length > 10
                      ? novel.title.substring(0, 20) + "..."
                      : novel.title}
                  </h5>

                  <p className="font-normal text-gray-700 dark:text-gray-400 truncate">
                    {novel.description.length > 100
                      ? novel.description.substring(0, 300) + "..."
                      : novel.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <Button
                    onClick={() => navigate(`/novels/${novel._id}`)}
                    gradientDuoTone="purpleToPink"
                    className="w-full"
                  >
                    Read Now
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
      <div className="flex justify-center mt-4 ">
        {window.innerWidth < 1024 ? (
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
      </div>
    </div>
  );
};

export default NovelList;
