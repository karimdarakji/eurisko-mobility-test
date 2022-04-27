import { Grid, Paper } from "@mui/material";
import { forwardRef } from "react";
import { IArticle } from "../global";
import logo192 from "../images/logo192.png";

import styles from "../styles/Article.module.scss";
import ArticlesSkeleton from "./ArticlesSkeleton";

const Articles = forwardRef<any, any>(
  (
    {
      abstract,
      web_url,
      snippet,
      lead_paragraph,
      source,
      pub_date,
      multimedia,
      byline,
      isLoading,
    }: IArticle,
    ref
  ) => (
    <Grid ref={ref} item>
      <Paper
        sx={{
          width: 300,
        }}
        elevation={3}
        style={{ cursor: "pointer" }}
      >
        {isLoading ? (
          <ArticlesSkeleton />
        ) : (
          <>
            <Grid className={styles.article__image}>
              <img
                alt={snippet}
                src={
                  multimedia.length
                    ? `https://static01.nyt.com/${multimedia[0].url}`
                    : logo192
                }
              />
            </Grid>

            <Grid className={styles.article__body}>
              <Grid className={styles.article__byline}>{byline?.original}</Grid>
              <Grid className={styles.article__title}>{abstract}</Grid>
              <Grid className={styles.article__desc}>{lead_paragraph}</Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Grid>
  )
);

export default Articles;
