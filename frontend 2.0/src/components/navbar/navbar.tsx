import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { DefaultButton } from "../button/DefaultButton";
import NotificationIcon from "../../../public/notifications.svg";
import { useState } from "react";

export function Navbar() {
  const auth = useAuth();
  const [newNotification, setNewNotification] = useState(false);
  const [notificationPopup, setNotificationPopup] = useState(false);

  const clickNotification = () => {
    if (newNotification) setNewNotification(false);
    setNotificationPopup(true);
  };

  return (
    <>
      <div className=" items-center flex justify-between p-5">
        <h4>User: {auth.user ? auth.user.name : "..."}</h4>
        <div className="flex gap-10 items-center justify-center">
          <Link className="underline text-blue-950" to="/">
            Главная
          </Link>
          {(auth.user?.is_admin || auth.user?.create_users) && (
            <Link className="underline text-blue-950" to="/settings">
              Настройки сайта
            </Link>
          )}
          <DefaultButton
            img={NotificationIcon}
            custom="p-2"
            callbackHandler={clickNotification}
          />
        </div>
      </div>
      {notificationPopup && <></>}
    </>
  );
}
