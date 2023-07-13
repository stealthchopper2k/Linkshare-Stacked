import Link from "next/link";
import { File } from "@/ts/interfaces/dashboard";

export const RabbitHole: React.FC<{ file: File }> = ({ file }) => {
  return (
    <Link className="text-white" href={file.url}>
      <div className="transform hover:scale-105 transition-all duration-300 border-2 border-black rounded-full border-black bg-orange-900 flex flex-col box-border aspect-w-1 aspect-h-1 h-[4rem] w-[4rem] p-2 md:h-[6.5rem] sm:w-[5rem] md:w-[6.5rem] justify-center items-center text-center">
        <h1 className="justify-self-center">{file.name}</h1>
      </div>
    </Link>
  );
};
