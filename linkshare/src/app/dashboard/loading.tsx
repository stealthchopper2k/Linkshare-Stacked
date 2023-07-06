"use client";
import Skeleton from "@mui/material/Skeleton";
import { GridComponent } from "./filebox/Grid";

const Loading = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="mx-auto w-4/5">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" width={210} height={118}>
              <GridComponent filtered_files={[]} />
            </Skeleton>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
