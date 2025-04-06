import { useEffect, useState } from "react";
import { get_tg_account } from "../../api/telegram_accounts";
import { Loader } from "../sharing/loader";

import { AccountView } from "./contains/account_view";
import { AccountOnlineSettings } from "./contains/account_online_settings_view";
import { ChatsView } from "./contains/chats_view";

type AccountDataProps = { login: string };

export function AccountData({ login }: AccountDataProps) {
  const accountState = useState<AccountInfo>({ id: 0, login: "", phone: "" });
  const fnameState = useState("");
  const lnameState = useState("");
  const genderState = useState<"М" | "Д" | "">("");
  const descriptionState = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("send req");
    get_tg_account(login)
      .then((value) => {
        const account = value.data;

        accountState[1]({
          id: account["id"],
          login: account["login"],
          phone: account["phone"],
        });
        descriptionState[1](account["description"]);
        fnameState[1](account["fname"]);
        lnameState[1](account["lname"]);
      })
      .catch((error) => {
        alert(error.response.data.detail);

      });
    accountState[1]({
      id: 
      login: login,
      phone: "phone",
    });
    genderState[1]("");
    descriptionState[1]("description");
    fnameState[1]("fname");
    lnameState[1]("lname");
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [accountState[0]]);

  return (
    <div className="p-10 w-full h-full">
      {accountState[0].login != "" ? (
        <div className="w-full flex flex-col items-center gap-20">
          <AccountView
            accountState={accountState}
            fnameState={fnameState}
            lnameState={lnameState}
            descriptionState={descriptionState}
            genderState={genderState}
          />
          <AccountOnlineSettings login={login} />
          {/* <ChatsView login={login} /> */}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {loading ? <Loader /> : <p>Не удалось получить данные</p>}
        </div>
      )}
    </div>
  );
}
