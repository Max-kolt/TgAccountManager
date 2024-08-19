import { useEffect, useState } from "react";
import { DefaultInput } from "../field/DefaultInput";
import { get_tg_accounts_count } from "../../api/telegram_accounts";
import { OptionsInput } from "../field/OptionsInput";
import { DefaultButton } from "../button/DefaultButton";
import { start_subscription_func } from "../../api/telegram_actions";
import { RangeInput } from "../field/RangeInput";
import { CheckboxInput } from "../field/CheckboxInput";

export function SubscriptionFunction() {
  const [channelLink, setChannelLink] = useState("");
  const [maxAccountsLength, setMaxAccountsLength] = useState(0);
  const [accountsLength, setAccountLength] = useState(1);
  const [boyGirlRatio, setBoyGirlRatio] = useState(100);
  const [botCheck, setBotCheck] = useState(false);
  const [botMessageHandler, setMessageHandler] = useState("");
  const [botAnswer, setBotAnswer] = useState("");
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
    // console.log("subs function start!");
    start_subscription_func({
      tg_link: channelLink,
      count: accountsLength,
      boy_girl_ratio: boyGirlRatio,
      mode: functionModes[functionMode].name,
    })
      .then((value) => {
        if (value.data["ok"]) location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.detail);
      });
  };

  return (
    <div className="w-5/12 max-[780px]:w-full flex flex-col gap-10">
      <h2>Накрутка</h2>
      <form className="p-4 flex flex-col gap-6 w-full h-3/5 relative overflow-x-scroll">
        <DefaultInput
          onChange={(v) => setChannelLink(v)}
          label="Ссылка на канал/чат"
          required
        />
        <RangeInput
          max={maxAccountsLength}
          min={1}
          default_value={accountsLength}
          label="Количество аккаунтов"
          onChange={(v) => setAccountLength(v)}
          description={"Всего аккаунтов: " + maxAccountsLength}
        />
        <RangeInput
          max={100}
          min={0}
          default_value={boyGirlRatio}
          label="Соотношение мальчик/девочка"
          first_name="М"
          second_name="Д"
          onChange={(v) => setBoyGirlRatio(v)}
          description=""
        />
        <OptionsInput
          label="Режим накрута"
          options={functionModes}
          onChange={(i: number) => setMode(i)}
          required
          current={functionMode}
        />
        <CheckboxInput
          label="Есть проверка на бота"
          callbackHandler={(v) => setBotCheck(v)}
        />
        {botCheck && (
          <div className="flex flex-col pl-5 w-full gap-4">
            <DefaultInput
              onChange={(v) => setMessageHandler(v)}
              label="Сообщение, на которое необходимо ответить"
              required
            />
            <DefaultInput
              onChange={(v) => setBotAnswer(v)}
              label="Сообщение для прохождения"
              required
            />
          </div>
        )}
      </form>
      <DefaultButton
        text="Запуск"
        callbackHandler={functionAction}
        custom="w-1/3 border-red-500 border-2 hover:bg-red-200"
      />
    </div>
  );
}
