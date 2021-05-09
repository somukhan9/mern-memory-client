import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import useStyle from "./style";
import { Grid, CircularProgress, Typography } from "@material-ui/core";

const Posts = () => {
  const classes = useStyle();
  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.length === 0 ? (
        <Typography variant="h4" style={{ color: "#fff" }}>
          No Post Found
        </Typography>
      ) : (
        posts.map((post) => {
          return (
            <Grid item key={post._id} xs={12} sm={6}>
              <Post post={post} />
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default Posts;
