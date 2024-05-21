function loggin(user, password) {
  const data = `username=${user}&password=${password}`;

  fetch("http://0.0.0.0/api/v2/auth/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  }).then((response) => {
    response.json().then((value) => {
      if (response.ok) {
        localStorage.setItem("token", value["access_token"]);
        localStorage.setItem("user", user);
        localStorage.setItem("privileges", getUserPrivileges(user));
        window.location = "index.html";
      } else alert(value["detail"]);
    });
  });
}

function logout() {
  localStorage.removeItem("token");
  window.location = "login.html";
}

function isAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    fetch("http://0.0.0.0/api/v2/auth/check", {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {});
    return;
  }
  window.location = "login.html";
}

function refreshToken(token) {
  fetch("http://0.0.0.0/api/auth/refresh", {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

function getUserPrivileges(user) {
  return;
}
