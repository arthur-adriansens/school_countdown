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
    document.querySelector("#lesson_info").innerHTML = `${basic[0]} - ${basic[1]}`;

    const total = count_schooldays();
    document.querySelector("#days_total").innerHTML = total.total_schooldays;
    document.querySelector("#hours_total").innerHTML = total.total_lessons;
    document.querySelector("#weeks_total").innerHTML = total.total_weeks;

    const passed = calc_days_passed();
    document.querySelector("#days_togo").innerHTML = total.total_schooldays - passed.total_schooldays_done;
    document.querySelector("#hours_togo").innerHTML = total.total_lessons - passed.total_lessons_done;
    document.querySelector("#weeks_togo").innerHTML = total.total_weeks - passed.total_weeks_done;

    const percentage = (passed.total_weeks_done / total.total_weeks) * 100;
    document.documentElement.style.setProperty("--progress", `${percentage}%`);
    document.querySelector("#percentage").innerHTML = `${Math.floor(percentage)}%`;
}

window.onload = () => {
    if (!localStorage.getItem("name")) {
        document.querySelector(".popup_wrapper").classList.add("visible");

        document.querySelector("#submit_name").onclick = () => {
            const name = document.querySelector("#name_input").value;

            if (name) {
                localStorage.setItem("name", name);
                document.querySelector(".popup_wrapper").classList.remove("visible");
                document.querySelector("#name").innerHTML = name;
            } else {
                document.querySelector("#name_input").style.borderColor = "var(--error)";
            }
        };
    }

    document.querySelector("#name").innerHTML = localStorage.getItem("name");
    update_info();

    // document.onkeypress = (e) => {
    //     if (e.key == "h") {
    //         document.querySelector("img.previewImg").classList.toggle("visible");
    //     }
    // };
};
