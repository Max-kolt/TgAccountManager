import { useState } from "react";
import { DefaultInput } from "../field/DefaultInput";
import { DefaultPopup } from "./default_popup";
import { DefaultButton } from "../button/DefaultButton";
import { add_account, confirm_account } from "../../api/telegram_accounts";
import { Loader } from "../sharing/loader";
import { PasswordInput } from "../field/PasswordInput";

type AddAccountProps = {
  clickHandler: () => void;
};

export function AddAccountPopup({ clickHandler }: AddAccountProps) {
  const [state, setState] = useState<"add" | "confirm" | "loading">("add");

  const [apiId, setApiId] = useState("");
  const [apiHash, setApiHash] = useState("");
  const [userId, setUserId] = useState("");
  const [login, setLogin] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [coonfirmationCode, setConfirmationCode] = useState("");

  const addAccountAction = () => {
    if (apiId && apiHash && login && phone) {
      const data = {
        user_id: userId,
        login: login.length > 0 ? login : null,
        phone: phone,
        api_id: parseInt(apiId),
        api_hash: apiHash,
        password: password.length > 0 ? password : null,
      };
      setState("loading");
      add_account(data)
        .then((response) => {
          setState("confirm");
        })
        .catch(function (error) {
          setState("add");
          if (error.response.status == 400) alert(error.response.data.detail);
        });
    } else alert("Не все поля заполненны!");
  };

  const confirmAccountAction = () => {
    if (coonfirmationCode) {
      let data;
      try {
        data = {
          user_id: parseInt(userId),
          confirm_code: coonfirmationCode,
        };
      } catch {
        alert("Неверный формат ввода");
        return;
      }
      setState("loading");
      confirm_account(data)
        .then((value) => {
          if (value.data["ok"]) location = location;
        })
        .catch(function (error) {
          if (error.response.status == 400) {
            alert("Для аккаунта необходим ввод пароля.\nПовторите еще раз.");
            setState("add");
          } else if (error.response.status == 404) {
            alert(
              "Время ожидания кода авторизации истекло,\nповторите операцию заново"
            );
            setState("add");
          } else {
            clickHandler();
            alert("Что-то пошло не так.\nОбратитесь к администратору");
          }
        });
    } else alert("Впишите код подтверждения");
  };

  return (
    <DefaultPopup custom="static" clickHandler={clickHandler}>
      <div className="p-12 px-20 bg-white border gap-8 border-gray-800 rounded-2xl flex flex-col items-center">
        {(state == "add" && (
          <>
            <h3>Добавить аккаунт</h3>
            <form className="flex flex-col w-full gap-2">
              <DefaultInput
                label="api_id"
                required
                onChange={(v) => setApiId(v)}
              />
              <DefaultInput
                label="api_hash"
                required
                onChange={(v) => setApiHash(v)}
              />
              <DefaultInput
                label="user_id"
                required
                onChange={(v) => setUserId(v)}
              />
              <DefaultInput
                label="Имя пользователя"
                required
                onChange={(v) => setLogin(v)}
              />
              <DefaultInput
                label="Телефон"
                required
                onChange={(v) => setPhone(v)}
              />
              <PasswordInput onChange={(v) => setPassword(v)} />
            </form>
            <DefaultButton
              callbackHandler={addAccountAction}
              custom="border-green-600 bg-green-50 hover:bg-green-200"
              text="Добавить"
            />
          </>
        )) ||
          (state == "confirm" && (
            <>
              <h3>Подтвердите аккаунт</h3>
              <form className="flex flex-col w-full gap-2">
                <DefaultInput
                  label="Код подтверждения"
                  required
                  onChange={(v) => setConfirmationCode(v)}
                />
              </form>
              <DefaultButton
                callbackHandler={confirmAccountAction}
                custom="border-green-600 bg-green-50 hover:bg-green-200"
                text="Подтверждение"
              />
            </>
          )) ||
          (state == "loading" && <Loader />)}
      </div>
    </DefaultPopup>
  );
}
