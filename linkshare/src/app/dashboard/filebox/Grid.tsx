import Grid from "@mui/material/Unstable_Grid2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Link from "next/link";
import { File } from "@/ts/interfaces/dashboard";

export const GridComponent: React.FC<{ filtered_files: File[] }> = ({
  filtered_files,
}) => {
  return (
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          values: {
            laptop: 1024,
            tablet: 640,
            mobile: 0,
            desktop: 1280,
          },
        },
      })}
    >
      <Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
        {filtered_files.map((file, i) => (
          <Grid mobile={6} tablet={4} laptop={3} key={i}>
            <Link className="" href={file.url}>
              <div className="border-2 border-indigo-600 rounded-full border-black bg-gray-700 flex flex-col box-border aspect-w-1 aspect-h-1 h-[4rem] w-[4rem] p-2 border-2 sm:h-[5rem] md:h-[6.5rem] sm:w-[5rem] md:w-[6.5rem] justify-center items-center text-center">
                <h1 className="justify-self-center">{file.name}</h1>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};
