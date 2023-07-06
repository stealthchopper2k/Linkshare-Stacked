import { DashboardState, FileBoxProps } from "@/ts/interfaces/dashboard";
import { Suspense } from "react";
import { FileBox } from "./filebox/FileBox";
import { FileStoreType } from "@/ts/enums/dashboard";

const Dashboard: React.FC<DashboardState> = async ({ user, login_state }) => {
  const file_boxes = await getFileBoxes(""); // user.username

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="mx-auto w-4/5">
          {file_boxes.map((box, i) => (
            <FileBox
              key={i}
              files={box.files}
              style={box.style}
              collection={box.collection}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

async function getFileBoxes(username: string): Promise<FileBoxProps[]> {
  const res = await fetch("http://localhost:3000/api/files");

  // dummy data
  const boxes: FileBoxProps[] = [
    {
      files: [
        {
          id: 1,
          name: "Georgi",
          url: "acc",
          category: "Overhead Doors",
          date: "July 20, 69 20:18:59 GMT+00:00",
        },
        {
          id: 2,
          name: "Clement",
          url: "",
          category: "Site Furnishings",
          date: "July 20, 69 20:17:40 GMT+00:00",
        },
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
      ],
      style: FileStoreType.timeline,
      collection: "Random Files",
    },
    {
      files: [
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
      ],
      style: FileStoreType.size,
      collection: "New Files",
    },
  ];
  // const files = await res.json();
  return boxes;
}

export default Dashboard;
