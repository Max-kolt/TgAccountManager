import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../button/DefaultButton";
import { useAuth } from "../../hooks/AuthProvider";

export function MainPanel() {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <div className="flex hover:bg-g flex-col justify-center h-5/6 items-center gap-5 ">
      {(auth.user?.manage_tg_accounts || auth.user?.is_admin) && (
        <DefaultButton
          callbackHandler={() => navigate("/base")}
          text="Загрузить базу"
          custom="w-40 "
        />
      )}
      {(auth.user?.use_func || auth.user?.is_admin) && (
        <DefaultButton
          callbackHandler={() => navigate("/sub_func")}
          text="Накрутка"
          custom="w-40"
        />
      )}
    </div>
  );
}
