import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Search() {
  return (
    <div>
      <form className="flex my-8 items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none p-2"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
