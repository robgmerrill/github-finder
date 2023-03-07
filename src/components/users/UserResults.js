import React from "react";
import { useEffect, useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserList() {
  const { isLoading, users, fetchUsers } = useContext(GithubContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!isLoading) {
    return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {users && users.map((user) => <UserItem key={user.id} user={user} />)}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserList;
