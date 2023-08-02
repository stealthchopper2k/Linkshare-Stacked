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

  const inputClass= "px-2 py-1 focus:ring-2 focus:ring-blue-500 text-white rounded-tl-md bg-slate-800 border-b-2"

  return (
      <div className="absolute top-0 border-r-2 border-b-2 rounded-tl-md border-black whitespace-nowrap bg-slate-800 lg:text-lg md:text-md sm:text-sm">
        {editmode && isEditing ? (
          <input
            value={collection_name}
            onChange={(e) => {
              CollectionInput(e);
            }}
          onKeyDown={(e) => {
              e.stopPropagation(); // stop the input event from propogating to drag and drop
              handleKeyDown(e);
            }}
            ref={inputRef}
            type=""
            onBlur={handleBlur}
            className={inputClass}
          />
        ) : (
          <span
              onDoubleClick={(e) => {
                handleDoubleClick(e)
              }}
            className={inputClass}
          >
            {collection_name}
          </span>
        )}
      </div>
  );
};

export default CollectionTag;
