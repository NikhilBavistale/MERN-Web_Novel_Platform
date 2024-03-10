import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <FaExclamationTriangle className="text-6xl text-red-500" />
      <h1 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-gray-100">
        404 | Page Not Found
      </h1>
      <p className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Sorry, the page you are looking for does not exist or is under construction.
      </p>
    </div>
  );
};

export default NotFoundPage;