import React from "react";
import { Link } from "react-router-dom"; // Added for navigation

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">404</h1>
      <div className="bg-white px-6 py-2 text-sm rounded shadow-sm rotate-12 absolute mb-24 border border-gray-100 font-medium text-gray-600">
        Page Not Found
      </div>
      <p className="text-xl text-gray-500 mt-4 max-w-md">
        Oops... That page does not exist! It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;

