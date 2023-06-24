const time = document.querySelector(".notify__time");

setInterval(() => {
    let localTime = new Date().toLocaleTimeString();
    time.textContent = localTime;
}, 1000);

// ==================================
const allApps = document.querySelectorAll(".app_interface");
const allIcons = document.querySelectorAll(".apps>*");

allIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
        allApps.forEach((app, idx) => {
            app.classList.remove("active");
            // very shaky condition but works 😅
            if (e.target.classList.contains(app.classList[1])) {
                app.classList.add("active");
            }

            if (e.target.classList.value == "") {
                document
                    .querySelector(".app_interface.recipe_app")
                    .classList.add("active");
            }
        });
    });
});
