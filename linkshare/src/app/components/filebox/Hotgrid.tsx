// import React, { useState } from "react";
// import { Grid } from "@mui/material";
// import { getHotlistFiles } from "../../dashboard/[id]/page";
// import { RabbitHole } from "./Rabbithole";
// import { User } from "@/ts/interfaces/dashboard";

// const HotlistGrid: React.FC<{ username: User }> = async ({ username }) => {
//   const hotlistData: File[] = await getHotlistFiles("mawli");

//   return (
//     <Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
//       {hotlistData.map((file: File, i) => (
//         <Grid mobile={6} tablet={4} laptop={3} key={i}>
//           <RabbitHole file={file}></RabbitHole>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// const [hotlistData, setHotlistData] = useState([
//     { title: "Item 1", imageUrl: "image1.jpg" },
//     { title: "Item 2", imageUrl: "image2.jpg" },
//     { title: "Item 3", imageUrl: "image3.jpg" },
//     // Add more initial items as needed
//   ]);

//   const handleItemClick = (index) => {
//     // Update the hotlistData based on user interaction
//     // For example, move the clicked item to the top of the list
//     const clickedItem = hotlistData[index];
//     const updatedData = [
//       clickedItem,
//       ...hotlistData.filter((item, i) => i !== index),
//     ];
//     setHotlistData(updatedData);
//   };

// const HotlistGrid = ({ recent_files }) => {
//   const [hotlistData, setHotlistData] = useState([
//     { title: "Item 1", imageUrl: "image1.jpg" },
//     { title: "Item 2", imageUrl: "image2.jpg" },
//     { title: "Item 3", imageUrl: "image3.jpg" },
//     // Add more initial items as needed
//   ]);

//   const handleItemClick = (index) => {
//     // Update the hotlistData based on user interaction
//     // For example, move the clicked item to the top of the list
//     const clickedItem = hotlistData[index];
//     const updatedData = [
//       clickedItem,
//       ...hotlistData.filter((item, i) => i !== index),
//     ];
//     setHotlistData(updatedData);
//   };

// export async function getHotlistFiles(username: string): Promise<File[]> {
//   const res = await fetch("http://localhost:3000/api/files2");
//   const files = await res.json();
//   return files;
// }

// export async function updateHotlistFiles(username: string): Promise<File[]> {
//   const res = await fetch("http://localhost:3000/api/files2");
//   const files = await res.json();
//   return files;
// }

// export default HotlistGrid;
