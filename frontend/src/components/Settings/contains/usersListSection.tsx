import { useEffect, useState } from "react";
import { delete_user, get_all_users } from "../../../api/users";
import TrashIcon from "/public/trash.svg";
import { DefaultButton } from "../../button/DefaultButton";

export function UserListSection() {
  const [usersList, setUsersList] = useState<UserInfo[]>([]);


  useEffect(() => {
    get_all_users().then((value) => {
      console.log(value.data);
      setUsersList(value.data);
    });
  }, []);

  const del_user = (username: string) => {
    delete_user(username).then((value) => {
      setUsersList(
        usersList.filter((user) => {
          return user.name != username;
        })
      );
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      {usersList.map((user) => {
        return (
          <div className="w-full p-4 flex justify-between items-center border-t">
            {user.is_admin ? "admin: " : "user: "} {user.name}
            <DefaultButton
              img={TrashIcon}
              callbackHandler={() => del_user(user.name)}
              custom="border-red-400 hover:bg-red-300"
            />
          </div>
        );
      })}
    </div>
  );
}
