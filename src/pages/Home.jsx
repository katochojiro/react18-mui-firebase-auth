import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

export default function Home() {
  const auth = useSelector((store) => store.auth);
  return (
    <div>
      {auth.isLoggedIn && (
        <div className="">
          {auth.name} {auth.email} {auth.photoURL}
          <Avatar src={auth.photoURL}></Avatar>
        </div>
      )}
      {!auth.isLoggedIn && <div className=""></div>}{" "}
    </div>
  );
}
