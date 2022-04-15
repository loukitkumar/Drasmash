import React from "react";

import classes from "./UsersList.module.css";

function UsersList(props) {
  return (
    <div
      className={`${classes.users} overflow-auto`}
      style={{ maxHeight: "200px" }}
    >
      <div className={classes.title}>Users</div>
      {props.users.map((user) => (
        <button key={user.userId}>
          <h3>{user.userName}</h3>
          <span>{user.score}</span>
        </button>
      ))}
    </div>
  );
}

export default UsersList;
