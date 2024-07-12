import { useEffect, useState } from "react";
import { DefaultInput } from "../field/DefaultInput";
import { get_tg_accounts_count } from "../../api/telegram_accounts";
import { OptionsInput } from "../field/OptionsInput";
import { DefaultButton } from "../button/DefaultButton";
import { start_subscription_func } from "../../api/telegram_actions";

export function SubscriptionFunction() {
  const [channelLink, setChannelLink] = useState("");
  const [maxAccountsLength, setMaxAccountsLength] = useState(0);
  const [accountsLength, setAccountLength] = useState("");
  const [functionMode, setMode] = useState(0);
  const functionModes = [
    { name: "Сразу" },
    { name: "В течении часа" },
    { name: "В течении дня" },
  ];

  useEffect(() => {
    get_tg_accounts_count().then((value) => {
      setMaxAccountsLength(value.data);
    });
  }, []);

  const functionAction = () => {
    console.log("subs function start!");
    start_subscription_func({
      tg_link: channelLink,
      count: parseInt(accountsLength),
      mode: functionModes[functionMode].name,
    })
      .then((value) => {
        if (value.data["ok"]) alert("Процесс закончен");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-5/12 max-[780px]:w-full flex flex-col gap-10">
      <h2>Накрутка</h2>
      <form className="p-4 flex flex-col gap-6 w-full">
        <DefaultInput
          onChange={(v) => setChannelLink(v)}
          label="Ссылка на канал/чат"
          required
        />
        <DefaultInput
          onChange={(v) => setAccountLength(v)}
          label="Количество аккаунтов"
          discription={`Всего аккаунтов: ` + maxAccountsLength}
          required
        />
        <OptionsInput
          label="Режим накрута"
          options={functionModes}
          onChange={(i: number) => setMode(i)}
          required
          current={functionMode}
        />
      </form>
      <DefaultButton
        text="Запуск"
        callbackHandler={functionAction}
        custom="w-1/3 border-red-500 border-2 hover:bg-red-200"
      />
    </div>
  );
}
