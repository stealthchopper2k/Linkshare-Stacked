import Link from "next/link";
import { File } from "@/ts/interfaces/dashboard";

export const RabbitHole: React.FC<{ file: File }> = ({ file }) => {
  return (
    <Link className="text-white" href={file.url}>
      <div className="border-2 border-indigo-600 rounded-full border-black bg-gray-700 flex flex-col box-border aspect-w-1 aspect-h-1 h-[4rem] w-[4rem] p-2 border-2 sm:h-[5rem] md:h-[6.5rem] sm:w-[5rem] md:w-[6.5rem] justify-center items-center text-center">
        <h1 className="justify-self-center">{file.name}</h1>
      </div>
    </Link>
  );
};
