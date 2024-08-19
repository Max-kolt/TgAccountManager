import { useState } from "react";
import { DefaultPopup } from "./default_popup";
import { DefaultInput } from "../field/DefaultInput";
import { send_tg_message } from "../../api/telegram_accounts";
import { DefaultButton } from "../button/DefaultButton";

type SendMessagePopupProps = {
  clickHandler: () => void;
  hints?: { chat_id: string; chat_name: string }[];
  login: string;
};

export function SendMessagePopup({
  clickHandler,
  login,
  hints,
}: SendMessagePopupProps) {
  const [toUser, setUserReceiver] = useState("");
  const [messageText, setMessageText] = useState("");

  const submit = () => {
    if ([toUser, messageText].includes("")) {
      alert("Необходимо заполнить все поля");
      return;
    }
    send_tg_message({
      login: login,
      message_to_user: toUser,
      text: messageText,
    })
      .then((response) => {
        if (response.data["ok"]) {
          alert("Сообщение отправленно");
          clickHandler();
        }
      })
      .catch((error) => {
        alert(
          "Что-то пошло не так, попробуйте позже или обратитесь к администратору."
        );
      });
  };

  return (
    <DefaultPopup custom="static" clickHandler={clickHandler}>
      <div className="p-10 bg-white border border-gray-900 rounded-xl flex flex-col gap-5 items-center">
        <h3>Отправить сообщение</h3>
        <form className="flex flex-col gap-5 items-center">
          <DefaultInput
            label="Отправить пользователю"
            onChange={(v) => setUserReceiver(v)}
            hints={hints?.map((hint) => {
              return { id: hint.chat_id, name: hint.chat_name };
            })}
            value={toUser}
            required
          />
          <DefaultInput
            label="Сообщение"
            onChange={(v) => setMessageText(v)}
            required
          />
          <DefaultButton
            callbackHandler={submit}
            custom=" border-2 border-green-400 hover:bg-green-200"
            text="Отправить"
          />
        </form>
      </div>
    </DefaultPopup>
  );
}
