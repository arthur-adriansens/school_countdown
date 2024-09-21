/** @format */

const add_zero = (number) => {
    return number < 10 ? `0${number}` : number;
};

function get_lesson_info(now) {
    const hour = add_zero(now.getHours());
    const minute = add_zero(now.getMinutes());
    const now_converted = Number(`${now.getDay()}${hour}${minute}`);

    for (let time of Object.keys(schedule)) {
        if (time < now_converted) continue;

        if (time > Number(`${now.getDay()}${schedule[time][3]}`)) {
            const next = Object.keys(schedule).find((x) => x[0] == now.getDay() + 1);
            return [schedule[next]];
        }

        const index = Object.keys(schedule).indexOf(time) - 1;
        const lesson = schedule[Object.keys(schedule)[index]];
        return [lesson.slice(0, 2), lesson.slice(2, 4)];
    }

    return [];
}

function get_day_info(now) {
    const day = days[now.getDay()];
    const date = `${add_zero(now.getDate())}/${add_zero(now.getMonth())}`;
    const time = `${add_zero(now.getHours())}:${add_zero(now.getMinutes())}`;

    return `${day} ${date} - ${time}`;
}

function count_schooldays() {
    let total = months_length.reduce((add, current) => current + add, 0);

    // subtract weekend days
    total -= Math.floor(total / 7) * 2;

    // substract lesson-free days (if not a weekend)
    for (let day of Object.keys(events)) {
        const day_mod = `${day.length == 3 ? "0" : ""}${day}`;
        const year = day_mod.slice(2, 4) >= 9 ? "2024" : "2025";
        const date = new Date(`${year}-${day_mod.slice(2, 4)}-${day_mod.slice(0, 2)}`);

        if (date.getDay() == 0 || date.getDay() == 6) continue;
        total -= 1;
    }

    const result = {
        total_schooldays: total,
        total_lessons: total * Object.keys(schedule).length,
        total_weeks: total / 5,
    };

    console.log(result);
    return result;
}

function calc_days_passed() {
    const now = new Date();
    let total = months_length.reduce((add, current) => current + add, 0);

    let day_in_month = 2; // 2 september skippen
    let month = 0;
    let real_month = 9;
    const month_length = () => months_length[month];

    let counter = -1;
    for (let i of new Array(total)) {
        // check if i > current scanning month's length => next month's length, day=1
        if (day_in_month > month_length()) {
            month++;
            real_month = real_month > 12 ? 1 : real_month + 1;
            day_in_month = 1;
        }

        // check day, if weekend or in lesson-free => skip
        const year = month > 3 ? "2025" : "2024";
        const date = new Date(`${year} ${months[month]} ${day_in_month}`);

        // later than today => stop
        if (date.getTime() > now.getTime()) {
            // today's lessons done
            const lessons_done = Object.keys(schedule)
                .filter((time) => time[0] <= now.getDay())
                .filter((time) => Number(time) <= Number(`${now.getDay()}${now.getHours()}${add_zero(now.getMinutes())}`));
            const done = lessons_done.length - 1;

            // result
            const weeks_done = Math.floor(counter / 5);
            const result = {
                total_schooldays_done: counter,
                total_lessons_done: weeks_done * Object.keys(schedule).length + done,
                total_weeks_done: weeks_done,
            };

            console.log(result);
            return result;
        }

        const day = date.getDay();
        const day_mod = `${day_in_month}${real_month}`;
        if (day != 6 && day != 0 && !Object.keys(events).includes(day_mod)) {
            counter++;
        }

        day_in_month++;
    }

    console.log(counter);
}

function update_info() {
    const now = new Date();
    document.querySelector("#day_info").innerHTML = get_day_info(now);

    const [basic, extra] = get_lesson_info(now);
    document.querySelector("#lesson_info").innerHTML = basic ? `${basic[0]} - ${basic[1]}` : "";

    const total = count_schooldays();
    document.querySelector("#days_total").innerHTML = total.total_schooldays;
    document.querySelector("#hours_total").innerHTML = total.total_lessons;
    document.querySelector("#weeks_total").innerHTML = total.total_weeks;

    const passed = calc_days_passed();
    document.querySelector("#days_togo").innerHTML = total.total_schooldays - passed.total_schooldays_done;
    document.querySelector("#hours_togo").innerHTML = total.total_lessons - passed.total_lessons_done;
    document.querySelector("#weeks_togo").innerHTML = total.total_weeks - passed.total_weeks_done;

    const percentage = (passed.total_schooldays_done / total.total_schooldays) * 100;
    document.documentElement.style.setProperty("--progress", `${percentage}%`);
    document.querySelector("#percentage").innerHTML = `${Math.floor(percentage)}%`;
}

function fullScreenChange(e) {
    const fullscreen_btn = document.querySelector("#fullscreen");
    const inFullScreen = window.innerHeight >= screen.height;
    inFullScreen ? fullscreen_btn.classList.add("hidden") : fullscreen_btn.classList.remove("hidden");

    if (!e || e.type != "click") return;
    click_animation(fullscreen_btn);
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    }
}

function submit_name(keydown_function) {
    const name = document.querySelector("#name_input").value;

    const wrapper = document.querySelector(".popup_wrapper");
    const children = Array.from(wrapper.children);
    document.querySelector(".active").classList.replace("active", "hidden");
    const new_active_i = children.indexOf(document.querySelector("hidden")) + 2;
    if (new_active_i <= children.length) {
        children[new_active_i].classList.add("active");
    }

    if (name) {
        localStorage.setItem("name", name);
        document.querySelector("#name").innerHTML = name;

        document.removeEventListener("click", submit_name);
        document.removeEventListener("keydown", keydown_function);
    } else {
        document.querySelector("#name_input").style.borderColor = "var(--error)";
    }
}

function click_animation(element) {
    element.classList.remove("click");
    element.classList.add("click");
    const remove = () => {
        element.classList.remove("click");
        element.removeEventListener("animationend", remove);
    };
    element.addEventListener("animationend", remove);
}

function previewColor(e) {
    if (!e.target.classList.contains("color")) return;
    const popup = document.querySelector(".popup_wrapper");
    // click_animation(e.target);

    if (e.target.classList?.contains("confirm")) {
        popup.classList.remove("visible");
        localStorage.setItem("color", e.target.dataset.color);
        return;
    }
    document.querySelector(".confirm")?.classList.remove("confirm");
    e.target.classList.add("confirm");

    popup.classList.remove("visible");
    setTimeout(() => popup.classList.add("visible"), 5 * 1000);

    document.documentElement.className = "";
    document.documentElement.classList.add(e.target.dataset.color);
}

window.onload = () => {
    /* display name */
    if (!localStorage.getItem("name")) {
        document.querySelector(".popup_wrapper").classList.add("visible");

        document.querySelector("#submit_name").addEventListener("click", submit_name);
        const keydown = (e) => {
            if (e.key == "Enter" && e.target.id == "name_input") {
                submit_name(keydown);
            }
        };
        document.addEventListener("keydown", keydown);
    }

    document.querySelector("#name").innerHTML = localStorage.getItem("name");
    document.documentElement.className = localStorage.getItem("color");

    /* main*/
    const startTime = performance.now();
    update_info();
    console.log(`Main function took ${performance.now() - startTime}ms!`);
    setInterval(update_info, 15 * 1000);

    /* event listeners */
    document.querySelector(".colors").addEventListener("click", previewColor);

    document.querySelector("#fullscreen").addEventListener("click", fullScreenChange);
    window.addEventListener("resize", fullScreenChange);
    fullScreenChange();

    document.querySelector("#edit").addEventListener("click", () => {
        localStorage.clear();
        window.location.reload();
    });

    const edit_btn = document.querySelector("#edit");
    edit_btn.addEventListener("click", () => click_animation(edit_btn));

    const conefetti_btn = document.querySelector(".confetti_btn");
    conefetti_btn.addEventListener("click", () => {
        confetti({
            particleCount: 1000,
            spread: Math.floor(Math.random() * (360 - 250 + 1) + 250),
            origin: {
                x: 0.5,
                y: 0.5,
            },
        });

        click_animation(conefetti_btn);
    });
};
