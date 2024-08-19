document.querySelector(".user-info").innerHTML = `User: ${localStorage.getItem(
  "user"
)}`;

document.querySelector(".logout").addEventListener("click", () => {
  logout();
});

const inputs = document.querySelectorAll("input[type=button]");
const close = document.querySelectorAll(".close");

inputs.forEach((input) => {
  input.addEventListener("click", () => {
    const element = input.getAttribute("data-active");
    console.log(element);
    document.querySelector(`.${element}`).classList.toggle("active");
  });
});

close.forEach((close) => {
  close.addEventListener("click", () => {
    const element = close.getAttribute("data-close");
    document.querySelector(`.${element}`).classList.remove("active");
  });
});

const notif = document.querySelector(".notifications.popup__wrapper");
const notif_btn = document.querySelector(".notifications__wrapper");

notif_btn.addEventListener("click", () => {
  notif.classList.toggle("active");
});

notif.addEventListener("click", () => {
  notif.classList.toggle("active");
});
