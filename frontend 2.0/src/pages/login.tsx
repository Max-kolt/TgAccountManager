import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

export function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const submitAuthHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login !== "" && password !== "") {
      auth.logIn({ login, password });
      return;
    }
    alert("pleae provide a valid input");
  };

  return (
    <div className="flex items-center justify-center flex-col gap-3 h-full">
      <h3>Вход</h3>
      <div className="border-2 rounded-xl border-neutral-950 p-5 px-10">
        <form
          className="flex flex-col gap-5 items-center"
          onSubmit={submitAuthHandler}
        >
          <div className="flex flex-col">
            <label htmlFor="login">login</label>
            <input
              className="border border-neutral-950 p-1 rounded-lg"
              id="login"
              name="login"
              type="text"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">password</label>
            <input
              className="border border-neutral-950 p-1 rounded-lg"
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            className="border border-neutral-950 rounded-lg w-fit p-1"
            type="submit"
            value="Войти"
          />
        </form>
      </div>
    </div>
  );
}
