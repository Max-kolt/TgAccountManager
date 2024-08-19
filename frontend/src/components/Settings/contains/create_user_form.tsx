import { useState } from "react";
import { DefaultInput } from "../../field/DefaultInput";
import { CheckboxInput } from "../../field/CheckboxInput";
import { PasswordInput } from "../../field/PasswordInput";

type CreateUserFormProps = {};

export function CreateUserForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [useFunc, setUseFunc] = useState(false);
  const [createUsers, setCreateUsers] = useState(false);
  const [manageTg, setManageTG] = useState(false);
  const [checkTgMsg, setCheckTgMsg] = useState(false);

  const create_user = () => {};

  return (
    <form className="p-5 px-8 grid grid-cols-2 gap-8">
      <DefaultInput onChange={(v) => setName(v)} label="Имя" required />
      <PasswordInput onChange={(v) => setPassword(v)} />
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
    </form>
  );
}
