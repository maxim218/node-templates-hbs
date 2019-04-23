"use strict";

// поднимаем сервер на порте 5000
const express = require("express");
const app = express();
const port = 5000;
app.listen(port);
console.log("Server port: " + port);

// активируем шаблонизатор
app.set("view engine", "hbs");

// запрос на получение первой страницы
app.get("/page/first", function (request, response) {
    // отправляем страницу и передаем данные для вставки
    response.render("first.hbs", {
        creator: "Колотовкин Максим",
        mail: "maxim.kolotovkin@yandex.ru",
        arr: [
            "Петя Петров",
            "Ваня Иванов",
            "Александ Александров",
        ]
    });
});

// массив для хранения сообщений
const messagesArr = [];

// запрос на получение второй страницы
app.get("/page/second", function (request, response) {
    // проверяем массив на пустоту
    let emptyArr = true;
    if(messagesArr.length > 0) {
        emptyArr = false;
    }

    // отправляем страницу и передаем данные для вставки
    response.render("second.hbs", {
        injectionFirst: "<h1>Hello</h1><h2>World</h2>",
        injectionSecond: '<script>alert(111); alert(222);</script>',
        injectionThird: `<b>I am Maxim</b>`,
        messagesArr: messagesArr,
        emptyArr: emptyArr,
    });
});

// запрос на добавление записи в массив
app.post("/record/add", function (request, response) {
    // массив для хранения частей
    const bodyArr = [];
    request.on('data', (data) => {
        // добавляем часть в конец массива
        bodyArr.push(data.toString());
    }).on('end', () => {
        // преобразуем массив в строку
        const bodyString = bodyArr.join("");
        // преобразуем полученные данные в объект
        const messageObj = JSON.parse(bodyString.toString());
        // добавляем сообщение в массив сообщений
        messagesArr.push(messageObj);
        // отправляем ответ клиенту об успешном добавлении записи
        response.end("Запись успешно добавлена");
    });
});

