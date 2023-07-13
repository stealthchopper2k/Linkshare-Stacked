import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { File } from "@/ts/interfaces/dashboard";
import { RabbitHole } from "./Rabbithole";

export const GridComponent: React.FC<{ filtered_files: File[] }> = ({
  filtered_files,
}) => {
  return (
    <div className="p-5">
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
        <Grid container spacing={2}>
          {filtered_files.map((file, i) => (
            <Grid key={i} item sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <RabbitHole file={file} />
            </Grid>
          ))}
        </Grid>
      </ThemeProvider>
    </div>
  );
};
