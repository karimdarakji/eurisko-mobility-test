import { Container, Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import Articles from "../Components/Articles";
import Logout from "../Components/Logout";
import { IArticle } from "../global";
import { useGetArticlesQuery } from "../redux/apis/ArticlesAPI";
import styles from "../styles/Dashboard.module.scss";

const ViewDashboard = () => {
  const [page, setPage] = useState(0);
  const { data = [], isLoading, error } = useGetArticlesQuery(page);

  const [articles, setArticles] = useState<IArticle[]>([]);

  // search function
  const [search, setSearch] = useState("");
  const [searchedValues, setSearchedValues] = useState<IArticle[]>([]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value) {
      setSearchedValues(
        articles.filter(
          ({ abstract, lead_paragraph }) =>
            abstract.toLowerCase().includes(e.target.value) ||
            lead_paragraph.toLowerCase().includes(e.target.value)
        )
      );
    } else {
      setSearchedValues([]);
    }
  };

  //to detect and run function when user reaches last card
  const observer = useRef<any>();
  const lastElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          setPage(page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [articles]
  );

  // when data is available from the api, push them to the articles state
  useEffect(() => {
    if (data.length) {
      const combineData = [...articles, ...data];
      setArticles([...new Set(combineData)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Container>
      <div className={styles.dashboard__main}>
        <TextField
          fullWidth
          id="search"
          style={{ marginBottom: "3%" }}
          label="Search Articles"
          onChange={handleSearch}
        />
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={3}>
              {isLoading &&
                [0, 1, 2].map((value, index) => (
                  <Articles key={`article${index}`} isLoading />
                ))}
              {error && (
                <div style={{ marginTop: "10%" }}>Something went wrong</div>
              )}
              {search ? (
                searchedValues.length ? (
                  searchedValues.map((value: any, index: number) => (
                    <Articles key={value?._id + index} {...value} />
                  ))
                ) : (
                  <div style={{ marginTop: "10%" }}>Article not found</div>
                )
              ) : (
                articles?.map((value: any, index: number) => (
                  <Articles
                    ref={
                      index === articles.length - 1 ? lastElementRef : undefined
                    }
                    key={value?._id + index}
                    {...value}
                  />
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Logout />
    </Container>
  );
};

export default ViewDashboard;
