class Game {
    constructor() {
        this.stage = 'preparation';
        this.playerOrder = true;

        this.player = new Topology({
            offsetX: 60, // при отрисовке, смещаем на 60px от верхнего левого края
            offsetY: 90
        });

        this.computer = new Topology({
            offsetX: 600, // при отрисовке, смещаем на 500px от верхнего левого края
            offsetY: 100,
            secret: true
        });

        // отрисовываем рандомно корабли на поле компьютера
        this.computer.randoming()


        /*  this.player
             .addSheeps({
                 x: 0,
                 y: 0,
                 direct: 0,
                 size: 3
             }, {
                 x: 0,
                 y: 2,
                 direct: 1,
                 size: 4
             }, )
             .addChecks({
                 x: 5,
                 y: 5,
             }, {
                 x: 5,
                 y: 4,
             }); */

        this.player.randoming();
        this.stage = "play";

        requestAnimationFrame(x => this.tick(x)) // регистрирует вывод функции перед обновлением экрана
    };

    // timestamp хранит кол-во милисекунд жизни нашей страницы

    tick(timestamp) {
        requestAnimationFrame(x => this.tick(x))

        clearCanvas();
        drawGrid();

        this.player.draw(context)
        this.computer.draw(context)

        if (this.stage === 'preparation') {
            this.tickPreparation(timestamp)
        } else if (this.stage === "play") {
            this.tickPlay(timestamp)
        }

        mouse.pleft = mouse.left; // отследим нажатие левой клавиши мыши
    }
    // На этом этапе расставляем корабли
    tickPreparation(timestamp) {

        // если мышка не над полем, ничего не делаем
        if (!this.player.isPointUnder(mouse)) {
            return
        }

        // если мышка над полем, то происходит вся логика
        const sheepSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1] // какие корабли будут появляться
        const sheepSize = sheepSizes[this.player.sheeps.length] // у игрока 0 кораблей, тогда берем первый элемет из массива
        const coordinats = this.player.getCoordinats(mouse)

        const sheep = {
            x: coordinats.x,
            y: coordinats.y,
            direct: mouse.s ? 0 : 1,
            size: sheepSize
        }
        // не может быть расположен на игровом поле
        if (!this.player.canStay(sheep)) {
            return
        }
        // иначе мы его отрисовываем в рамках поля
        this.player.drawSheep(context, sheep)

        if (mouse.left && !mouse.pleft) {
            this.player.addSheeps(sheep)

            if (this.player.sheeps.length == 10) {
                this.stage = "play"
            }
        }
    }

    tickPlay(timestamp) {
        if (this.playerOrder) {
            if (this.computer.isPointUnder(mouse)) {
                return
            }

            const point = this.computer.getCoordinats(mouse);

            if (mouse.left && !mouse.pleft) {
                this.computer.addChecks(point)
                this.computer.update()
            }
        } else {

        }
    }
};