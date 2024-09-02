import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_api } from "../api/auth";

type props = { children: React.ReactNode };
type userProps = {
  name: string;
  create_roles: boolean;
  is_admin: boolean;
  create_users: boolean;
  manage_tg_accounts: boolean;
  is_active: boolean;
  use_func: boolean;
  check_tg_msg: boolean;
  created_at: string;
};
type contextProps = {
  token: null | string;
  user: userProps;
  logIn: ({ login, password }: loginProps) => void | boolean;
  logOut: () => void;
};
type loginProps = {
  login: string;
  password: string;
};

const AuthContext = createContext<contextProps>({
  token: null,
  user: {
    name: "",
    create_roles: false,
    is_admin: false,
    create_users: false,
    manage_tg_accounts: false,
    is_active: false,
    use_func: false,
    check_tg_msg: false,
    created_at: "",
  },
  logIn: () => {},
  logOut: () => {},
});

function AuthProvider({ children }: props) {
  const [user, setUser] = useState<userProps>({
    name: localStorage.getItem("name") || "",
    create_roles: Boolean(localStorage.getItem("create_roles")),
    is_admin: Boolean(localStorage.getItem("is_admin")),
    create_users: Boolean(localStorage.getItem("create_users")),
    manage_tg_accounts: Boolean(localStorage.getItem("manage_tg_accounts")),
    is_active: Boolean(localStorage.getItem("is_active")),
    use_func: Boolean(localStorage.getItem("use_func")),
    check_tg_msg: Boolean(localStorage.getItem("check_tg_msg")),
    created_at: localStorage.getItem("created_at") || "",
  });
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const logIn = ({ login, password }: loginProps) => {
    login_api({ name: login, password: password }).then((response) => {
      const data = response.data;
      localStorage.setItem("site", data["access_token"]);
      setToken(data["access_token"]);

      var user_data: userProps = {
        name: data["user"]["name"],
        create_roles: data["user"]["create_roles"],
        is_admin: data["user"]["is_admin"],
        create_users: data["user"]["create_users"],
        manage_tg_accounts: data["user"]["manage_tg_accounts"],
        is_active: data["user"]["is_active"],
        use_func: data["user"]["use_func"],
        check_tg_msg: data["user"]["check_tg_msg"],
        created_at: data["user"]["created_at"],
      };

      Object.entries<string | boolean>(data["user"]).map((value) => {
        localStorage.setItem(value[0], `${value[1]}`);
      });

      setUser(user_data);
    });
    if (token == "") return false;
    return true;
  };
  const logOut = () => {
    navigate("/login");
    localStorage.removeItem("site");
  };

  return (
    <AuthContext.Provider value={{ user, token, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
