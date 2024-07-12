import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="flex flex-col items-center gap-20 p-20">
      <h1>404. Такой страницы нет</h1>
      <Link className="text-blue-950 underline" to="/">
        Вернуться на главную
      </Link>
    </div>
  );
}
