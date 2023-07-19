import { DashboardState, FileBoxProps } from "@/ts/interfaces/dashboard";
import { HeaderComponent } from "../../components/header/heading";
import { Board } from "@/app/components/filebox/Board";

const Dashboard: React.FC<DashboardState> = async ({ user, login_state }) => {
  const file_boxes = await getFileBoxes(""); // user.username

  return (
    <main className="p-5 bg-gradient-to-b from-blue-200 to-blue-100">
      <div className="z-10 w-full font-mono text-sm lg:flex min-h-screen">
        <div className="mx-auto w-2/5 flex flex-col justify-center items-center">
          <HeaderComponent />
          <Board boxes={file_boxes} />
        </div>
      </div>
    </main>
  );
};

async function getFileBoxes(username: string) {
  const res = await fetch("http://localhost:3000/api/files");

  // dummy data
  const boxes = [
    {
      box_id: "B1",
      files: [
        {
          file_id: "F0",
          name: "Georgi",
          url: "http://localhost:3000/tree/1",
          category: "Overhead Doors",
          date: "July 20, 69 20:18:59 GMT+00:00",
        },
        {
          file_id: "F1",
          name: "Georgi",
          url: "http://localhost:3000/tree/1",
          category: "Overhead Doors",
          date: "July 20, 69 20:18:59 GMT+00:00",
        },
        {
          file_id: "F2",
          name: "Clement",
          url: "http://localhost:3000/tree/2",
          category: "Site Furnishings",
          date: "July 20, 69 20:17:40 GMT+00:00",
        },
        {
          file_id: "F3",
          name: "Georgi",
          url: "http://localhost:3000/tree/3",
          category: "Overhead Doors",
          date: "July 20, 69 20:17:40 GMT+00:00",
        },
        {
          file_id: "F4",
          name: "Georgi",
          url: "http://localhost:3000/tree/3",
          category: "Overhead Doors",
          date: "July 20, 69 20:17:40 GMT+00:00",
        },
        {
          file_id: "F5",
          name: "Georgi",
          url: "http://localhost:3000/tree/3",
          category: "Overhead Doors",
          date: "July 20, 69 20:17:40 GMT+00:00",
        },
        {
          file_id: "F6",
          name: "Georgi",
          url: "http://localhost:3000/tree/3",
          category: "Overhead Doors",
          date: "July 20, 69 20:17:40 GMT+00:00",
        },
      ],
      collection_name: "Random Files",
    },
    {
      box_id: "B2",
      files: [
        {
          file_id: "F7",
          name: "Georgi",
          url: "gerg",
          category: "Overhead Doors",
          date: "July 20, 69 20:17:40 GMT+00:00",
        },
        {
          file_id: "F8",
          name: "Clement",
          url: "sadfasdasds",
          category: "Site Furnishings",
          date: "July 20, 69 20:17:40 GMT+00:00",
        },
      ],
      collection_name: "New Files",
    },
  ];
  // const files = await res.json();
  return boxes;
}

export default Dashboard;
