import { useState } from "react";
import { MultiUpdateInput } from "../../field/MultiUpdateInput";
import { useAuth } from "../../../hooks/AuthProvider";

export function UpdatePasswordSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const auth = useAuth();

  const submit = () => {};

  return (
    <div className="border border-black rounded-lg w-full flex flex-col gap-3 bg-slate-50 p-4 px-6">
      <h3>Поменять пароль</h3>
      <MultiUpdateInput
        callbackHandler={submit}
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
