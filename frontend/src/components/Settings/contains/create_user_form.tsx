import { useState } from "react";
import { DefaultInput } from "../../field/DefaultInput";
import { CheckboxInput } from "../../field/CheckboxInput";
import { PasswordInput } from "../../field/PasswordInput";
import { DefaultButton } from "../../button/DefaultButton";
import { create_user } from "../../../api/users";

type CreateUserFormProps = {};

export function CreateUserForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [useFunc, setUseFunc] = useState(false);
  const [createUsers, setCreateUsers] = useState(false);
  const [manageTg, setManageTG] = useState(false);
  const [checkTgMsg, setCheckTgMsg] = useState(false);

  const new_user = () => {
    create_user({
      name: name,
      is_admin: admin,
      use_func: useFunc,
      create_users: createUsers,
      manage_tg_accounts: manageTg,
      check_tg_msg: checkTgMsg,
      password: password == "" ? null : password,
    })
      .then((value) => {
        const data = value.data;

        alert("User successfully created");
        if (password == "")
          alert("Незабудьте просмотреть сгенерированный пароль");
        console.log(data);
        setPassword(data["password"]);
      })
      .catch((error) => {
        alert(error.response.data.detail);
      });
  };

  return (
    <form className="p-5 px-8 grid grid-cols-2 gap-8">
      <DefaultInput onChange={(v) => setName(v)} label="Имя" required />
      <PasswordInput onChange={(v) => setPassword(v)} value={password} />
      <CheckboxInput callbackHandler={(v) => setAdmin(v)} label="Админ" />
      <CheckboxInput
        callbackHandler={(v) => setUseFunc(v)}
        label="Пользование функцией системы"
      />
      <CheckboxInput
        callbackHandler={(v) => setCreateUsers(v)}
        label="Создание пользователей системы"
      />
      <CheckboxInput
        callbackHandler={(v) => setManageTG(v)}
        label="Регистрация и настройка телеграмм аккаунта"
      />
      <CheckboxInput
        callbackHandler={(v) => setCheckTgMsg(v)}
        label="Просмотр телеграмм сообщений"
      />
      <DefaultButton callbackHandler={new_user} text="Добавить" />
    </form>
  );
}
