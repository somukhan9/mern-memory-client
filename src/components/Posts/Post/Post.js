import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentId } from "../../../actions/postCurrentId";
import { likePost, deletePost } from "../../../actions/post";
import moment from "moment";
import useStyle from "./style";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import Delete from "@material-ui/icons/Delete";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
} from "@material-ui/core";

const Post = ({ post }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const Like = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.id) ? (
        <>
          <ThumbUpAlt fontSize="small" /> &nbsp;{" "}
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others `
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""} `}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" /> &nbsp; {post.likes.length}{" "}
          {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" /> &nbsp; Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {user?.id === post.uid && (
          <Button
            style={{ color: "#fff" }}
            size="small"
            onClick={() => {
              dispatch(setCurrentId(post._id));
            }}
          >
            <MoreHoriz fontSize="default" />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          disabled={!user}
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <Like />
        </Button>
        {user?.id === post.uid && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <Delete fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
