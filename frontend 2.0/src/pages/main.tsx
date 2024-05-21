import React from "react";

export function MainPage() {
  return (
    <>
      <header>
        <div className="user-wrapper">
          <div className="user-info">User: ...</div>
          <img className="logout" src="static/img/logout.svg" alt="logout" />
        </div>
        <nav>
          <div className="notifications__wrapper">
            <img
              className="img-btn"
              src="static/img/notifications.svg"
              alt="notifications"
            />
            <span className="notif active">1</span>
          </div>
          <a target="_blank" href="settings.html">
            <img
              className="img-btn"
              src="static/img/settings.svg"
              alt="settings"
            />
          </a>
        </nav>
      </header>
      <section className="main__wrapper">
        <div className="main__content">
          <a href="sub_func.html">
            <input type="button" value="Накрутка" />
          </a>
          <a href="tg_base.html">
            <input type="button" value="База аккаунтов" />
          </a>
        </div>
      </section>
    </>
  );
}
