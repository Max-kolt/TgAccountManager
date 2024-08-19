import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../components/field/PasswordInput";
import { DefaultButton } from "../components/button/DefaultButton";
import { DefaultInput } from "../components/field/DefaultInput";

export function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const submitAuthHandler = () => {
    if (login !== "" && password !== "") {
      if (!auth.logIn({ login, password })) {
        console.log("not good");
        alert("Name or password invalid");
        return;
      }

      navigate("/");

      return;
    }
    alert("pleae provide a valid input");
  };

  return (
    <div className="flex items-center justify-center flex-col gap-3 h-full">
      <h3>Вход</h3>
      <div className="border-2 rounded-xl border-neutral-950 p-5 px-10">
        <form className="flex flex-col gap-5 items-center">
          <DefaultInput onChange={(v) => setLogin(v)} label="Имя" required />
          <PasswordInput onChange={(v) => setPassword(v)} required />
          <DefaultButton
            callbackHandler={() => submitAuthHandler()}
            text="Войти"
            custom="p-1 px-6"
          />
        </form>
      </div>
    </div>
  );
}
