import { useEffect, useState } from "react";
import ArrowIcon from "/arrow-right.svg";

export function SubscriptionProcesses() {
  const [processesList, setProcesses] = useState([{}, {}]);
  const [historyList, setHistory] = useState([{}, {}]);

  useEffect(() => {}, []);

  return (
    <div className="border border-gray-700 w-6/12 h-3/4 flex flex-col max-[780px]:w-full overflow-y-scroll">
      <div className="border-b pb-6">
        <h3 className="p-4 text-green-500 font-bold text-4xl">В работе</h3>
        <div className="pl-5 flex flex-col gap-4 ">
          {processesList.map((process) => {
            return (
              <div className="flex w-full">
                <img src={ArrowIcon} alt="process" />
              </div>
            );
          })}
        </div>
      </div>
      <h3 className="p-4">История накруток</h3>
      <div className="flex flex-col gap-2">
        {historyList.map((action) => {
          return (
            <div className="flex w-full px-4 py-3 hover:bg-slate-100">
              action
            </div>
          );
        })}
      </div>
    </div>
  );
}
