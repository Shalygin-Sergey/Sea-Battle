const CELL_SIZE = 23;
const FIELD_SIZE = 30;

const canvas = document.querySelector('canvas'); // ищем первый тег canvas по селектору в нашем документе
const context = canvas.getContext('2d'); // запрашиваем контекст отрисовки с помощью метода getContext у canvas в формате 2d

canvas.width = 1000;
canvas.height = 500;

const mouse = getMouse(canvas)

/* setInterval(() => console.log(player.getCoordinats(mouse))) */


const game = new Game()

function clearCanvas() {
    canvas.width |= 0;
}


function drawGrid() { // Эта функция должна пройтись по параметрам ширины и высоты canvas 
    context.strokeStyle = 'blue'; // делаем линии голубым цветом
    context.lineWidth = 0.5; // задаем размер линиям половина пикселя
    for (let i = 0; i < canvas.width / CELL_SIZE; i++) {
        context.beginPath();
        context.moveTo(i * CELL_SIZE, 0); // с чего начать отрисовку линии по 'y'
        context.lineTo(i * CELL_SIZE, canvas.height); // куда будет вести линия
        context.stroke();
    }

    for (let i = 0; i < canvas.height / CELL_SIZE; i++) {
        context.beginPath();
        context.moveTo(0, i * CELL_SIZE); // с чего начать отрисовку линии по 'x'
        context.lineTo(canvas.width, i * CELL_SIZE); // куда будет вести линия
        context.stroke()
    }
    // отрисовка красной линии в виде полей страницы
    context.lineWidth = 2;
    context.strokeStyle = 'red'

    context.beginPath();
    context.moveTo(0, 75);
    context.lineTo(canvas.width, 75);
    context.stroke()
}