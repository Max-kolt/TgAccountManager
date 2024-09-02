import { useState } from "react";
import { MultiUpdateInput } from "../../field/MultiUpdateInput";
import { useAuth } from "../../../hooks/AuthProvider";
import { change_user_password } from "../../../api/users";

export function UpdatePasswordSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [active, setActive] = useState(false);
  const auth = useAuth();

  const submit = () => {
    if (newPassword == "" || currentPassword == "") {
      return;
    }

    change_user_password(auth.user.name, {
      previous_password: currentPassword,
      new_password: newPassword,
    })
      .then((value) => {
        if (value.data["ok"]) {
          setNewPassword("");
          setCurrentPassword("");
          setActive(false);
          alert("Password successfully changed");
          return;
        }
        alert("Password not changed");
      })
      .catch((error) => {
        alert("Old password not valid");
      });
  };

  return (
    <div className="border border-black rounded-lg w-full flex flex-col gap-3 bg-slate-50 p-4 px-6">
      <h3>Поменять пароль</h3>
      <MultiUpdateInput
        callbackHandler={submit}
        manipulatingActive={active}
        inputs={[
          {
            label: "Старый пароль",
            value: currentPassword,
            onChange: (v) => setCurrentPassword(v),
          },
          {
            label: "Новый пароль",
            value: newPassword,
            onChange: (v) => setNewPassword(v),
          },
        ]}
      />
    </div>
  );
}
