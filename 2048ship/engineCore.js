// создать холст--готово
// нарисовать игрока--готово
// спавн врагов--готово
// спавн бонуса--готово
// добавление звуков--готово
// партикл эфект--
// экран старт--
// экран конца--
// колижн врагов--готово
//выравнивание игрока по середине в начале игры--готово
//исправлен баг подёргивания--готово
//добавлен визуальный эффект подсветки--готово
//динамическая смена сложности--готово
//счетчик кликов--готово
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
let pW = innerWidth / 2;
let pH = innerHeight * 0.90;
let maxheight = 10;
let eW = Math.floor(Math.random() * innerWidth - 100); // начальные значения бонус
let eH = Math.floor(Math.random() * maxheight); // начальные значения бонус
let ezW = Math.floor(Math.random() * innerWidth - 100); // начальные значения враг
let ezH = Math.floor(Math.random() * maxheight); // начальные значения враг
let ezW2 = Math.floor(Math.random() * innerWidth - 100); // начальные значения враг2
let ezH2 = Math.floor(Math.random() * maxheight); // начальные значения враг2
let clickcounter = 0; //счетчик кликов
let startdifficulty = 6;
//звук (на высокой скорости аудио файлы не успевают повторно активироваться)
const audio1 = document.getElementById("audio1"); //вызов через audio.play()
const audio2 = document.getElementById("audio2");
//
//респав бонуса
function bonusrespawn() {
    let bw = Math.floor(Math.random() * innerWidth - 100); // дальнейшие изменения
    let bh = Math.floor(Math.random() * maxheight); // дальнейшие изменения
    bonus.wCords = bw;
    bonus.hCords = bh;
};
//респавн врага 1
function ezenemyrespawn() {
    let bw = Math.floor(Math.random() * innerWidth - 100); // дальнейшие изменения
    let bh = Math.floor(Math.random() * maxheight); // дальнейшие изменения
    ezenemy.wCords = bw;
    ezenemy.hCords = bh;
};
//респавн врага 2
function ezenemyrespawn2() {
    let bw = Math.floor(Math.random() * innerWidth - 100); // дальнейшие изменения
    let bh = Math.floor(Math.random() * maxheight); // дальнейшие изменения
    ezenemy2.wCords = bw;
    ezenemy2.hCords = bh;
};

let player = {
    wCords: `${Math.round(pW)}`, // ширина
    hCords: `${Math.round(pH)}`, // высота
    sizeW: 100, //размерВ
    sizeH: 100, //размерШ
    color: "orange", //цвет игрока
    text: 2, //текст для игрока
};
let bonus = {
    wCords: `${eW}`,
    hCords: `${eH}`,
    sizeW: 100, //размерВ
    sizeH: 100, //размерШ
    color: "orange", //цвет бонуса.
};
//упрощенный враг
let ezenemy = {
    wCords: `${ezW}`,
    hCords: `${ezH}`,
    sizeW: 100, //размерВ
    sizeH: 100, //размерШ
    color: "pink", //цвет врага.
};
//копируем врага
let ezenemy2 = {
    wCords: `${ezW2}`,
    hCords: `${ezH2}`,
    sizeW: 100, //размерВ
    sizeH: 100, //размерШ
    color: "pink", //цвет врага.
};
//
let enemyArray = []; //массив врагов
class Enemy {
    constructor(wCords, hCords, sizeW, sizeH, color) {
        this.wCords = 1
        this.hCords = 1
        this.sizeW = 10
        this.sizeH = 10
        this.color = "red"
    }
};
let testfun = () => {
    enemyArray.push(new Enemy())
}
let leftOrRight = innerWidth / 2; //позиция клика
//рисуем врага (не используемое)
let spawnEnemy = () => {
    ctx.beginPath();
    ctx.rect(enemyArray[0].wCords, enemyArray[0].hCords, enemyArray[0].sizeH, enemyArray[0].sizeW);
    ctx.closePath();
    ctx.fillStyle = enemyArray[0].color;
    ctx.fill();
}
//рисуем бонус
let spawnBonus = () => {
    ctx.beginPath();
    ctx.shadowColor = 'orange';
    ctx.shadowBlur = 15;
    ctx.rect(bonus.wCords, bonus.hCords, bonus.sizeH, bonus.sizeW);
    ctx.closePath();
    ctx.fillStyle = bonus.color;
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = "18px Arial";
    ctx.fillText(`${player.text}`, +bonus.wCords + 20, +bonus.hCords + 50);
};
//рисуем врага используемое
let spawnEzenemy = () => {
    ctx.beginPath();
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 15;
    ctx.rect(ezenemy.wCords, ezenemy.hCords, ezenemy.sizeH, ezenemy.sizeW);
    ctx.closePath();
    ctx.fillStyle = ezenemy.color;
    ctx.fill();
};
//рисуем врага2
let spawnEzenemy2 = () => {
    ctx.beginPath();
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 15;
    ctx.rect(ezenemy2.wCords, ezenemy2.hCords, ezenemy2.sizeH, ezenemy2.sizeW);
    ctx.closePath();
    ctx.fillStyle = ezenemy2.color;
    ctx.fill();
};


window.onload = draw(); // после загрузки страницы вызываем canvas
function draw() {
    let w = canvas.width = innerWidth;
    let h = canvas.height = innerHeight;
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, w, h);
    //счетчик
    ctx.fillStyle = '#ad9baa';
    ctx.fillRect(innerWidth - 300, 10, 500, 120);
    ctx.fillStyle = '#004777';
    ctx.font = "30px Arial";
    ctx.fillText(`Your result: ${player.text}`, innerWidth - 260, 40);
    ctx.fillStyle = '#dbfcff';
    ctx.font = "20px Arial";
    ctx.fillText(`Speedup every 3 clicks: ${clickcounter}`, innerWidth - 270, 80);


    //квадрат игрока
    ctx.beginPath();
    ctx.shadowColor = 'yellow';
    ctx.shadowBlur = 15;
    ctx.fillStyle = player.color;
    ctx.fillRect(player.wCords, player.hCords, player.sizeH, player.sizeW);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = "18px Arial";
    ctx.fillText(`${player.text}`, +player.wCords + 20, +player.hCords + 50);
    //
    requestAnimationFrame(control); //анимация
    spawnBonus();
    spawnEzenemy();
    spawnEzenemy2();
   // testfun(); новый обьект массива
   // spawnEnemy(); отрисовка нового обьекта
};
//отрисовали canvas по всей длине и ширине клиента.
let tesst = () => {
    console.log("allright");
};
//считываем клики
canvas.addEventListener("click", (event) => {
    let x = event.clientX;
    leftOrRight = x;
    clickcounter++; // счетчик кликов
   // control(); игра ускоряется в два раза после каждого нажатия
});
//анимация движение налево и движение направо.
function control() {
    if (leftOrRight < player.wCords -12) {
        player.wCords = +player.wCords - 12;
    } else if (leftOrRight > player.wCords) {
        player.wCords = +player.wCords + 12;
    }
    window.requestAnimationFrame(draw);
    bonus.hCords = +bonus.hCords + startdifficulty; //падение бонуса
    ezenemy.hCords = +ezenemy.hCords + 3; //падение врага
    ezenemy2.hCords = +ezenemy2.hCords + 8; //падение врага2

};
//измеряем интервал коллизии
let interval = player.hCords;
interval = +interval - 100;
let colision = setInterval(() => {
    if (bonus.hCords >= interval) {
        console.log("ok");
        crash();
        bonusrespawn();
    } else {
        console.log("no");
    }
}, 400);
//костыль дубликат
let colisionE = setInterval(() => {
    if (ezenemy.hCords >= interval) {
        ezyenemycrash();
        ezenemyrespawn();
    } 
}, 400);
let colisionE2 = setInterval(() => {
    if (ezenemy2.hCords >= interval) {
        ezyenemycrash2();
        ezenemyrespawn2();
    }
}, 400);
//
let crash = () => {
    if (bonus.wCords >= player.wCords - 100 && bonus.wCords <= player.wCords + 100) {
        player.text = +player.text * 2; //удваение счёта
        audio2.play();
    } else {
        player.text = +player.text / 2; // деление результата
        audio1.play();
    }
};
//костыль 
let ezyenemycrash = () => {
    if (ezenemy.wCords >= player.wCords - 100 && ezenemy.wCords <= player.wCords + 100) {
        confirm("GAME OVER");
    } 
};
let ezyenemycrash2 = () => {
    if (ezenemy2.wCords >= player.wCords - 100 && ezenemy2.wCords <= player.wCords + 100) {
        confirm("GAME OVER");
    }
};
//
//изменение сложности
let difficultychanger = setInterval(() => {
    if (clickcounter >= 3) {
        startdifficulty = +startdifficulty + 1;
        clickcounter = 0;
    }
}, 500);
//12.7.2021