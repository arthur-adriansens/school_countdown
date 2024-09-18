/** @format */

const days = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

const schedule = {
    10825: ["biologie", "C02", "Lissa  Van der Pluym", "0915"],
    10915: ["Frans", "A05", "Charlotte De Vriese", "1005"],
    11020: ["Engels", "A26", "Liesbeth Van Maele", "1110"],
    11200: ["Nederlands", "E03", "Sarah Goetgeluck", "1250"],
    11110: ["Frans", "E12", "Charlotte De Vriese", "1200"],
    11355: ["mentoraat", "C12, C22", "Loreto De Brabandere, Tim Van Leirsberghe", "1445"],
    11455: ["wiskunde", "C14", "Isabel Ternier", "1545"],
    20915: ["Nederlands", "E03", "Sarah Goetgeluck", "1005"],
    21020: ["wiskunde", "D11", "Isabel Ternier", "1110"],
    21110: ["fysica", "C12", "Tim Van Leirsberghe", "1200"],
    21200: ["Engels", "C31", "Liesbeth Van Maele", "1250"],
    21355: ["chemie", "C22", "Lissa  Van der Pluym", "1445"],
    21455: ["wiskunde 8", "D11", "Isabel Ternier", "1545"],
    21545: ["wiskunde 8", "D11", "Isabel Ternier", "1635"],
    30825: ["godsdienst", "C31", "Veerle Verbeke", "0915"],
    30915: ["geschiedenis", "E12", "Sietske Meulebrouck", "1005"],
    31020: ["Frans", "B21", "Charlotte De Vriese", "1110"],
    31110: ["fysica", "C12", "Tim Van Leirsberghe", "1200"],
    40825: ["aardrijkskunde", "E11", "Mart Grommen", "0915"],
    40915: ["chemie", "C22", "Lissa  Van der Pluym", "1005"],
    41020: ["wiskunde", "D11", "Isabel Ternier", "1110"],
    41110: ["wiskunde", "D11", "Isabel Ternier", "1200"],
    41200: ["geschiedenis", "E12", "Sietske Meulebrouck", "1250"],
    41355: ["Nederlands", "E03", "Sarah Goetgeluck", "1445"],
    41455: ["Nederlands", "E03", "Sarah Goetgeluck", "1545"],
    50825: ["biologie", "C12", "Lissa  Van der Pluym", "0915"],
    50915: ["aardrijkskunde", "E11", "Mart Grommen", "1005"],
    51020: ["wiskunde", "D11", "Isabel Ternier", "1110"],
    51110: ["wiskunde", "D11", "Isabel Ternier", "1200"],
    51200: ["godsdienst", "C31", "Veerle Verbeke", "1250"],
    51355: ["lichamelijke opvoeding", "Temp2", "Charlotte De Groote", "1445"],
    51455: ["lichamelijke opvoeding", "Temp2", "Charlotte De Groote", "1545"],
};

const events = {
    // TODO: 0509 = zoveelste dag van het jaar
    509: "Ardennen",
    609: "Ardennen",
    //maandagmiddag 21 oktober 2024 klassenraadmiddag (geen lessen)
    2810: "herfstvakantie",
    2910: "herfstvakantie",
    3010: "herfstvakantie",
    3110: "herfstvakantie",
    111: "herfstvakantie",
    // maandag 4 november 2024 oudercontact
    1111: "Wapenstilstand",
    // dinsdag 12 november 2024 mondiale vormingsdag
    //1612: "laatste proefwerkdag",
    1712: "kerstvakantie",
    1812: "kerstvakantie",
    1912: "kerstvakantie",
    2012: "kerstvakantie",
    2112: "kerstvakantie",
    2212: "kerstvakantie",
    2312: "kerstvakantie",
    2412: "kerstvakantie",
    2512: "kerstvakantie",
    2612: "kerstvakantie",
    2712: "kerstvakantie",
    2812: "kerstvakantie",
    2912: "kerstvakantie",
    3012: "kerstvakantie",
    3112: "kerstvakantie",
    101: "kerstvakantie",
    201: "kerstvakantie",
    301: "kerstvakantie",

    // maandag 6 januari 2025 start tweede trimester
    3101: "pedagogische studiedag",
    2402: "klassenraadmiddag",
    303: "krokusvakantie",
    403: "krokusvakantie",
    503: "krokusvakantie",
    603: "krokusvakantie",
    703: "krokusvakantie",
    // zaterdag 22 maart 2025 infodag
    // vrijdag 4 april 2025 oudercontact
    704: "paasvakantie",
    804: "paasvakantie",
    904: "paasvakantie",
    1004: "paasvakantie",
    1104: "paasvakantie",
    1204: "paasvakantie",
    1304: "paasvakantie",
    1404: "paasvakantie",
    1504: "paasvakantie",
    1604: "paasvakantie",
    1704: "paasvakantie",
    1804: "paasvakantie",
    2104: "paasmaandag",

    // dinsdag 22 april 2025 start derde trimester
    105: "Feest van de Arbeid",
    205: "facultatieve vrije dag",
    2905: "O.-L.-H.-Hemelvaart",
    3005: "vrije dag",
    906: "pinkstermaandag",
    //2006: "laatste proefwerkdag",
    // vrijdag 27 juni 2025 oudercontact
    // maandag 30 juni 2025 laatste schooldag
};

const months = ["september", "oktober", "november", "december", "januari", "februari", "maart", "april", "mei", "juni"];
const months_length = [29, 31, 30, 31, 31, 28, 31, 30, 31, 20];
