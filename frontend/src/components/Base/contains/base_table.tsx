import { useEffect, useState } from "react";
import { get_tg_accounts } from "../../../api/telegram_accounts";
import { Link } from "react-router-dom";
import { Loader } from "../../sharing/loader";

type filters = "phone" | "login" | "createdAt" | "lastActivity" | null;

export function BaseTable() {
  const [accountsList, setAccountList] = useState<AccountTableInfo[]>([
    // {
    //   login: "VenedictIvanIvanovich_klaud_cvards_smasldasda",
    //   phone: "+79313417960",
    //   created_at: "24.07.24",
    //   last_activity: "",
    // },
    // {
    //   login: "kuitikofs",
    //   phone: "+79313417961",
    //   created_at: "24.07.24",
    //   last_activity: "29.07.24",
    // },
  ]);
  const [loader, setLoader] = useState(true);

  const [filter, setFilter] = useState<filters>(null);

  useEffect(() => {
    get_tg_accounts().then((value) => {
      const accounts = value.data;
      if (accounts.length != 0) setAccountList(accounts);
    });
    setLoader(false);
  }, []);

  useEffect(() => {
    console.log(filter);
    // TODO: Можно реализовать фильтер по полям
  }, [filter]);

  return (
    <div className="border h-3/4 h- border-gray-800 w-full overflow-y-scroll overflow-x-scroll">
      <div className="font-bold flex justify-between w-full">
        <div
          onClick={() => setFilter("login")}
          className="cursor-pointer text-nowrap overflow-hidden border-b hover:bg-slate-200 h-14 flex items-center justify-start px-3 min-w-40 w-full border-l first:border-l-0"
        >
          Имя пользователя
        </div>
        <div
          onClick={() => setFilter("phone")}
          className="cursor-pointer text-nowrap overflow-hidden border-b hover:bg-slate-200 h-14 flex items-center justify-start px-3 min-w-40 w-full border-l first:border-l-0"
        >
          Номер телефона
        </div>
        <div
          onClick={() => setFilter("lastActivity")}
          className="cursor-pointer text-nowrap overflow-hidden border-b hover:bg-slate-200 h-14 flex items-center justify-start px-3 min-w-40 w-full border-l first:border-l-0"
        >
          Последняя активность
        </div>
        <div
          onClick={() => setFilter("createdAt")}
          className="cursor-pointer text-nowrap overflow-hidden border-b hover:bg-slate-200 h-14 flex items-center justify-start px-3 min-w-40 w-full border-l first:border-l-0"
        >
          Дата создания
        </div>
      </div>
      {loader ? (
        <div className="flex justify-center items-center h-5/6">
          <Loader />
        </div>
      ) : accountsList.length != 0 ? (
        <div className="font-light w-full flex flex-col">
          {accountsList?.map((account) => {
            return (
              <div
                key={account.login}
                onClick={() => console.log(account.login)}
                className="font-bold flex justify-between w-full"
              >
                <div className="font-light h-14 flex items-center justify-start px-3 min-w-40 w-full  overflow-hidden border-b border-l first:border-l-0">
                  <Link
                    className="underline text-blue-950"
                    to={"/account/" + account.login}
                  >
                    {account.login}
                  </Link>
                </div>
                <div className="font-light h-14 flex items-center justify-start px-3 min-w-40 w-full  overflow-hidden border-b border-l first:border-l-0">
                  {account.phone}
                </div>
                <div className="font-light h-14 flex items-center justify-start px-3 min-w-40 w-full  overflow-hidden border-b border-l first:border-l-0">
                  {account.last_activity || ""}
                </div>
                <div className="font-light h-14 flex items-center justify-start px-3 min-w-40 w-full  overflow-hidden border-b border-l first:border-l-0">
                  {account.created_at || ""}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-5/6">Пусто</div>
      )}
    </div>
  );
}
