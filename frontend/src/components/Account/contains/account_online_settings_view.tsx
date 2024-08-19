import { useEffect, useState } from "react";
import { MultiUpdateInput } from "../../field/MultiUpdateInput";

type AccountOnlineSettingsProps = {
  login: string;
};

export function AccountOnlineSettings({ login }: AccountOnlineSettingsProps) {
  const [online, setOnline] = useState<AccountOnlineInfo>();

  useEffect(() => {
    setOnline({
      is_online: false,
      last_online: "01:11",
      online_periods: 3,
      online_delay: 32,
      time_utc: 0,
    });
  }, []);

  const submit = () => {
    console.log(online);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <h3>Настройки онлайна</h3>
      <div className="w-full flex flex-col gap-3">
        {online ? (
          <>
            <div>
              <div className="flex items-center gap-1">
                <span
                  className={
                    "w-2 h-2 " +
                    (online.is_online ? "bg-green-400" : "bg-gray-500")
                  }
                ></span>
                {online?.is_online ? "Онлайн" : "Оффлайн"}
              </div>
              {!online.is_online && (
                <span className="text-xs font-extralight ">
                  Последнее посещение: {online.last_online}
                </span>
              )}
            </div>

            <div className="w-full">
              <MultiUpdateInput
                callbackHandler={submit}
                inputs={[
                  {
                    label: "Периоды посещения в день",
                    onChange: (v) =>
                      setOnline({
                        ...online,
                        online_periods: !isNaN(parseInt(v)) ? parseInt(v) : 0,
                      }),
                    value: online.online_periods.toString(),
                  },
                  {
                    label: "Затяжность онлайна (в минутах)",
                    onChange: (v) =>
                      setOnline({
                        ...online,
                        online_delay: !isNaN(parseInt(v)) ? parseInt(v) : 0,
                      }),
                    value: online.online_delay.toString(),
                  },
                  {
                    label: "UTC",
                    onChange: (v) =>
                      setOnline({
                        ...online,
                        time_utc: !isNaN(parseInt(v)) ? parseInt(v) : 0,
                      }),
                    value: online.time_utc.toString(),
                  },
                ]}
              />
            </div>
          </>
        ) : (
          <p>Не удалось получить информацию</p>
        )}
      </div>
    </div>
  );
}
