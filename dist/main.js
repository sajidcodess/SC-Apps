const time = document.querySelector(".notify__time");

setInterval(() => {
  let localTime = new Date().toLocaleTimeString();
  time.textContent = localTime;
}, 1000);

// ==================================
const allApps = document.querySelectorAll("main>*");
const allIcons = document.querySelectorAll(".apps>*");
console.log(allIcons);
allIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    icon.classList.remove("active");
    console.log(e.target.classList);
  });
});
