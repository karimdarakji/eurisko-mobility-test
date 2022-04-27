import { Grid, Paper, Skeleton } from "@mui/material";
import { forwardRef } from "react";
import logo192 from "../images/logo192.png";

import styles from "../styles/Article.module.scss";

interface IArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia?: any;
  headline?: any;
  keywords?: any;
  pub_date: string;
  document_type?: string;
  news_desk?: string;
  section_name?: string;
  byline?: {
    original: string;
    person: any;
    organization: any;
  };
  type_of_material?: string;
  _id: string;
  word_count?: number;
  uri?: string;
  isLoading: boolean;
}

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
          <div style={{ height: 522 }}>
            <Skeleton
              sx={{ height: 250 }}
              animation="wave"
              variant="rectangular"
            />
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
        ) : (
          <>
            <div className={styles.article__image}>
              <img
                alt={snippet}
                src={
                  multimedia.length
                    ? `https://static01.nyt.com/${multimedia[0].url}`
                    : logo192
                }
              />
            </div>

            <div className={styles.article__body}>
              <div className={styles.article__byline}>{byline?.original}</div>
              <div className={styles.article__title}>{abstract}</div>
              <div className={styles.article__desc}>{lead_paragraph}</div>
            </div>
          </>
        )}
      </Paper>
    </Grid>
  )
);

export default Articles;
