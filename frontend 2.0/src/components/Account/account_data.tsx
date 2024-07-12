import { useEffect, useState } from "react";

type AccountDataProps = { login: string };

export function AccountData({ login }: AccountDataProps) {
  const [accountInfo, setAccountInfo] = useState<AccountInfo>();

  useEffect(() => {
    setAccountInfo({ login: login, phone: "+235345122312" });
  }, []);

  return (
    <div className="p-10">
      <h3>{accountInfo?.login}</h3>
      <p>Телефон: {accountInfo?.phone}</p>
    </div>
  );
}
