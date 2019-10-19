const displayBtn = document.getElementById("asidebtn");
const closeDisplayBtn = document.getElementById("btn-close");
const sideBar = document.getElementById("aside");

displayBtn.addEventListener("click", () => {
  sideBar.classList.remove("none");
  displayBtn.classList.add("none");
});

closeDisplayBtn.addEventListener("click", () => {
  sideBar.classList.add("none");
  displayBtn.classList.remove("none");
});
