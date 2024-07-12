import { useAuth } from "../hooks/AuthProvider";

const auth = useAuth();

export const UseFunc = ({ children }: LayoutProp) => {
  if (auth.user?.use_func) return <>{children}</>;
  else return <></>;
};

export const ManageTgAccounts = ({ children }: LayoutProp) => {
  if (auth.user?.manage_tg_accounts) return <>{children}</>;
  else return <></>;
};
