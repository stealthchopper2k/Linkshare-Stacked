"use client";
import Skeleton from "@mui/material/Skeleton";
import { GridComponent } from "../components/filebox/Grid";

const Loading = () => {
  const files = [
    {
      id: 3,
      name: "Georgi",
      url: "gerg",
      category: "Overhead Doors",
      date: "July 20, 69 20:17:40 GMT+00:00",
    },
    {
      id: 4,
      name: "Clement",
      url: "",
      category: "Site Furnishings",
      date: "July 20, 69 20:17:40 GMT+00:00",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="mx-auto w-4/5">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" width={210} height={118}>
              <GridComponent filtered_files={files} />
            </Skeleton>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
