import React from "react";
import { List, Skeleton as MuiSkeleton } from "@mui/material";

const Skeleton: React.FC = () => {
  return (
    <List>
      {[...Array(3)].map((_, index) => (
        <MuiSkeleton
          key={index}
          variant="rectangular"
          height={60}
          style={{ marginBottom: 10 }}
        />
      ))}
    </List>
  );
};

export default Skeleton;
