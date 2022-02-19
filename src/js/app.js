const time = document.querySelector(".notify__time");

setInterval(() => {
  let localTime = new Date().toLocaleTimeString();
  time.textContent = localTime;
}, 1000);

// ==================================
const allApps = document.querySelectorAll("main>*");
const allIcons = document.querySelectorAll(".apps>*");

allIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    allApps.forEach((app, idx) => {
      app.classList.remove("active");
      if (e.target.classList.contains(app.classList[0])) {
        app.classList.add("active");
      }
    });
  });
});
