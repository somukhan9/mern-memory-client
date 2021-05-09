import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ERROR } from "../../constants/actionTypes";

const Error = ({ error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: ERROR, payload: "" });
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);

  return (
    <Typography variant="h6" align="center" color="secondary">
      {error}
    </Typography>
  );
};

export default Error;
