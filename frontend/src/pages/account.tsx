import { useParams } from "react-router-dom";
import { AccountData } from "../components/Account/account_data";

export function AccountPage() {
  const login = useParams().login || "";
  
  return (
    <div className="w-full h-full">
      <AccountData login={login} />
    </div>
  );
}
