import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../actions/auth";
import decode from "jwt-decode";
import useStyles from "./style";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const logoutUser = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const decodedToken = decode(refreshToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) return logoutUser();
    }
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h4"
          align="center"
        >
          iMemory
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple}>{user?.name?.charAt(0)}</Avatar>
            <Typography className={classes.name} variant="h6">
              {user?.name}
            </Typography>
            <Button
              variant="contained"
              className={""}
              color="secondary"
              onClick={logoutUser}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            color="primary"
            variant="contained"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
