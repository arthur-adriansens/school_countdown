/** @format */

function scrape_lessons() {
    // scrape HTML - raw data
    const scheduleHtml = document.querySelectorAll(".ple--brief:not(.ple--submissive)");
    const scheduleNew = {};

    // raw data to usefull object
    for (let lesson of scheduleHtml) {
        const lessonClassroom = lesson.querySelector(".brief-ple-content__name").innerHTML.split(" • ");
        const HourSubjectTeacher = lesson.querySelector(".brief-ple-content__info").innerHTML.split(" • ");

        // remove things that aren't lessons
        if (HourSubjectTeacher.length == 1 || lessonClassroom.length == 1) continue;

        // remove end of lesson from object keys
        const [lesson_start, lesson_end] = HourSubjectTeacher[0].replaceAll(":", "").split("-");

        // fixes right overs in object + remove end time lesson
        const dayIndex = Array.from(lesson.parentElement.parentElement.children).indexOf(lesson.parentElement);
        const lessonTime = `${dayIndex}${lesson_start}`;

        if (HourSubjectTeacher.length == 2) {
            scheduleNew[lessonTime] = [lessonClassroom[0], lessonClassroom[1], HourSubjectTeacher[1], lesson_end];
        } else {
            scheduleNew[lessonTime] = [lessonClassroom[0], lessonClassroom[1], HourSubjectTeacher[2], lesson_end];
        }
    }

    console.log(scheduleNew);
}
