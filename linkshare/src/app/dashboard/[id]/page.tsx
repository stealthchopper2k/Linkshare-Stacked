import { DashboardState, FileBoxProps } from "@/ts/interfaces/dashboard";
import { FileBox } from "../../components/filebox/FileBox";
import { FileStoreType } from "@/ts/enums/dashboard";
import { HeaderComponent } from "../../components/header/heading";

const Dashboard: React.FC<DashboardState> = async ({ user, login_state }) => {
  const file_boxes = await getFileBoxes(""); // user.username

  return (
    <main className="flex min-h-screen flex-col items-center p-5 bg-gradient-to-b from-blue-200 to-blue-100">
      <div className="z-10 w-full max-w-5xl justify-between font-mono text-sm lg:flex">
        <div className="mx-auto w-3/5 pattern-lines-xl">
          <HeaderComponent />
          {file_boxes.map((box, i) => (
            <FileBox
              key={i}
              files={box.files}
              style={box.style}
              collection_name={box.collection_name}
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
          file_id: 1,
          name: "Georgi",
          url: "http://localhost:3000/tree/1",
          category: "Overhead Doors",
          date: "July 20, 69 20:18:59 GMT+00:00",
        },
        {
          file_id: 2,
          name: "Clement",
          url: "http://localhost:3000/tree/2",
          category: "Site Furnishings",
          date: "July 20, 69 20:17:40 GMT+00:00",
        },
        {
          file_id: 3,
          name: "Georgi",
          url: "http://localhost:3000/tree/3",
          category: "Overhead Doors",
          date: "July 20, 69 20:17:40 GMT+00:00",
        },
      ],
      style: FileStoreType.timeline,
      collection_name: "Random Files",
    },
    {
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
      style: FileStoreType.size,
      collection_name: "New Files",
    },
  ];
  // const files = await res.json();
  return boxes;
}

export default Dashboard;
