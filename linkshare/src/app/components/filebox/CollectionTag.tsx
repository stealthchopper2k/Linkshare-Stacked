import React, { useRef, useState, useEffect } from "react";
import { CollectionTag } from "@/ts/interfaces/dashboard";

const CollectionTag = ({ collection_name, CollectionInput }: CollectionTag) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setEditing] = useState(false);

  const handleDoubleClick = () => {
    setEditing(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="relative border border-black">
      <div className="absolute top-[-35px] border border-black rounded-md whitespace-nowrap bg-white">
        {isEditing ? (
          <input
            value={collection_name}
            onChange={(e) => {
              CollectionInput(e);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
            ref={inputRef}
            onBlur={handleBlur}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {collection_name}
          </span>
        )}
      </div>
    </div>
  );
};

export default CollectionTag;
