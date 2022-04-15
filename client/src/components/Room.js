import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/auth";

import Container from "./container/Container";
import UsersList from "./UsersList";
import OpenConversation from "./OpenConversation";

function Room(props) {
  const [usersDetails, setUsersDetails] = useState([]);
  const authCtx = useContext(AuthContext);

  const socket = authCtx.socket;

  useEffect(() => {
    if (socket == null) return;

    socket.on("joined", (users) => {
      console.log(users);
      setUsersDetails(users);
    });

    socket.on("left", (users) => {
      console.log(users);
      setUsersDetails(users);
    });

    socket.on("logout", (groupUsers) => {
      setUsersDetails(groupUsers[props.roomId]);
    });

    return () => {
      socket.off("joined");
      socket.off("left");
    };
  }, [socket]);

  return (
    <div style={{ display: "flex", minHeight: "100%" }}>
      <Container socket={socket} roomId={props.roomId} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          margin: "20px",
        }}
      >
        <UsersList users={usersDetails} />
        <OpenConversation groupId={props.roomId} />
      </div>
    </div>
  );
}

export default Room;
