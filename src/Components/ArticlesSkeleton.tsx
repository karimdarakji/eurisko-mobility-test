import { Skeleton } from "@mui/material";
import React from "react";

const ArticlesSkeleton = () => {
  return (
    <div style={{ height: 522 }}>
      <Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />
      <Skeleton height={30} width={"75%"} style={{ margin: "5% 0" }} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} style={{ marginBottom: "5%" }} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
    </div>
  );
};

export default ArticlesSkeleton;
