import { DashboardState, FileBoxProps } from "@/ts/interfaces/dashboard";
import { Suspense } from "react";
import { FileBox } from "./FileBox";

const Dashboard: React.FC<DashboardState> = async ({ user, login_state }) => {
  const file_boxes = await getFileBoxes(user.username);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {file_boxes.map((box, i) => (
          <Suspense fallback={<p>Loading Files...</p>}>
            <FileBox key={i} files={box.files} style={box.style} />
          </Suspense>
        ))}
      </div>
    </main>
  );
};

async function getFileBoxes(username: string): Promise<FileBoxProps[]> {
  const res = await fetch("http://localhost:3000/api/files");
  const files = await res.json();
  return files;
}

export default Dashboard;
