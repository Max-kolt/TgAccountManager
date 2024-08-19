import { useEffect, useState } from "react";

export function UserListSection() {
  const [usersList, setusersList] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col items-center w-full">
      {usersList.map((user) => {
        return <div className="w-full p-4"></div>;
      })}
    </div>
  );
}
