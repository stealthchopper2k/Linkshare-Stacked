import Grid from "@mui/material/Unstable_Grid2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { File } from "@/ts/interfaces/dashboard";
import { RabbitHole } from "./Rabbithole";

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
            <RabbitHole file={file}></RabbitHole>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};
