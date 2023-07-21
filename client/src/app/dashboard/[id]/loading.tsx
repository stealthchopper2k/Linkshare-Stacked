"use client";
import Skeleton from "@mui/material/Skeleton";

const Loading = () => {
  const data = {
    id: "1",
    files: [
      {
        file_id: 3,
        name: "Georgi",
        url: "gerg",
        category: "Overhead Doors",
        date: "July 20, 69 20:17:40 GMT+00:00",
      },
      {
        file_id: 4,
        name: "Clement",
        url: "",
        category: "Site Furnishings",
        date: "July 20, 69 20:17:40 GMT+00:00",
      },
    ],
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="mx-auto w-4/5">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" width={610} height={618}>
              {/* <GridComponent
                filtered_files={data.files}
                box_id={data.id}
                index={i}
                collection_name={"placeholder"}
              /> */}
            </Skeleton>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
