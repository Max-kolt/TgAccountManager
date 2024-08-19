import { useState } from "react";
import { DefaultButton } from "../button/DefaultButton";
import { BaseTable } from "./contains/base_table";
import { AddAccountPopup } from "../popup/add_account_popup";

export function BaseBlock() {
  const [addAccount, setAddAccount] = useState(false);
  return (
    <div className="w-full  h-5/6 flex flex-col p-8 gap-4 items-start">
      <h2>База аккаунтов</h2>
      <DefaultButton
        callbackHandler={() => setAddAccount(true)}
        custom="border-green-600 bg-green-50 hover:bg-green-200"
        text="Добавить аккаунт"
      />

      <BaseTable />

      {addAccount && (
        <div className="fixed flex justify-center items-center bg-gray-600 bg-opacity-40 top-0 left-0 w-full h-full">
          <AddAccountPopup clickHandler={() => setAddAccount(false)} />
        </div>
      )}
    </div>
  );
}
