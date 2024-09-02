import { useState } from "react";
import ArrowIcon from "/arrow-down.svg";
import { CreateUserForm } from "./contains/create_user_form";
import { MultiUpdateInput } from "../field/MultiUpdateInput";
import { UpdatePasswordSection } from "./contains/update_password_section";
import { useAuth } from "../../hooks/AuthProvider";
import { UserListSection } from "./contains/usersListSection";

export function SettingsData() {
  const [createMode, setCreateMode] = useState(false);
  const user = useAuth();
  console.log(user.user?.create_users);

  return (
    <div className="w-full  flex flex-col gap-3">
      <UpdatePasswordSection />
      {user.user?.create_users && (
        <div className="border border-slate-600 bg-slate-100 w-full h-full rounded-xl">
          <div
            onClick={() => setCreateMode(!createMode)}
            className="w-full rounded-xl flex justify-between bg-slate-300 items-center p-3"
          >
            <h4 className="font-medium text-xl">Cоздать нового пользователя</h4>
            <img
              src={ArrowIcon}
              className={
                "transition-transform " + (!createMode && "-rotate-90")
              }
              alt=""
            />
          </div>
          {createMode && <CreateUserForm />}
        </div>
      )}
      {user.user?.is_admin && <UserListSection />}
    </div>
  );
}
