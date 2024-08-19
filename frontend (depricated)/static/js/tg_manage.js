MOCK_DATA = [
  {
    id: 1,
    info: "Павел Анисимов, anipavel, +79323910304",
  },
  {
    id: 2,
    info: "Ирина, irinata, +79323354305",
  },
  {
    id: 3,
    info: "Ghostrun, ghostrunnerio, +7932235431",
  },
];

for (let index = 0; index < MOCK_DATA.length; index++) {
  const element = MOCK_DATA[index];
  document.querySelector(
    ".users-table"
  ).innerHTML += `<tr><td>${element.id}</td><td>${element.info}</td><td><button class="edit-profile">edit</button></td></tr>`;
}
