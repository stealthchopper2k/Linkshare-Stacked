import React, { useRef, useState, useEffect } from "react";
import { CollectionTag } from "@/ts/interfaces/dashboard";

const CollectionTag = ({ collection_name, CollectionInput, RevertCollectionInput, PersistOldCollectionName, editmode }: CollectionTag) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setEditing] = useState(false);

  const handleDoubleClick = (e: any) => {
    setEditing(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Escape") {
      if (inputRef.current && inputRef.current.value !== "") {
        handleBlur();
        PersistOldCollectionName(inputRef.current.value)
      } else {
        RevertCollectionInput();
        setEditing(false);
      }
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
      <div className="absolute top-0 border border-black rounded-md whitespace-nowrap bg-white">
        {editmode && isEditing ? (
          <input
            value={collection_name}
            onChange={(e) => {
              CollectionInput(e);
            }}
          onKeyDown={(e) => {
              e.stopPropagation();
              handleKeyDown(e);
            }}
            ref={inputRef}
            type=""
            onBlur={handleBlur}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        ) : (
          <span
              onDoubleClick={(e) => {
                handleDoubleClick(e)
              }}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            {collection_name}
          </span>
        )}
      </div>
  );
};

export default CollectionTag;
