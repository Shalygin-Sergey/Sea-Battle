class Topology {
    constructor(param) {
        this.offsetX = param.offsetX; // отступы от верхнего левого края для отрисовки нашей Topology
        this.offsetY = param.offsetY;

        this.sheeps = []; // массив для кораблей
        this.checks = []; // массив для проверки клеточек по которым уже стреляли
    };
    addSheeps(...sheeps) {
        for (const sheep of sheeps) { // пробежимся по короблям которые нужно добавить
            if (!this.sheeps.includes(sheep)) { // если еще не добавили
                this.sheeps.push(sheep) // то добавить
            }
        }
        return this
    };

    addChecks(...checks) {
        for (const check of checks) {
            if (!this.checks.includes(check)) {
                this.checks.push(check)
            }
        }
        return this
    };
    // создаем метод который принимает в себя context и пробегается по всем кораблям

    draw(context) {
        this.drawFields(context) // Передаем контекст, ресуем поле
        for (const sheep of this.sheeps) { // пробежались по кораблям
            this.drawSheep(context, sheep) // нарисовали эти корабли
        }
        for (const check of this.checks) { // пробежались по чекам
            this.drawCheck(context, check) // нарисовали чеки
        }
        return this
    }

    // отрисовывем поле для игры и расстановки кораблей

    drawFields(context) {
        context.strokeStyle = 'blue';
        context.lineWidth = 1.7;
        for (let i = 1; i <= 11; i++) {
            context.beginPath();
            context.moveTo(
                this.offsetX + i * FIELD_SIZE,
                this.offsetY,
            )
            context.lineTo(
                this.offsetX + i * FIELD_SIZE,
                this.offsetY + 11 * FIELD_SIZE
            )
            context.stroke()
        }

        for (let i = 1; i <= 11; i++) {
            context.beginPath();
            context.moveTo(
                this.offsetX,
                this.offsetY + i * FIELD_SIZE
            )
            context.lineTo(
                this.offsetX + 11 * FIELD_SIZE,
                this.offsetY + i * FIELD_SIZE
            )
            context.stroke()
        }

        // создаем буквы в поле для игры
        context.textAlign = 'center'
        context.font = '20px comic sans'

        const alphabet = 'АБВГДЕЖЗИК'
        for (let i = 0; i < 10; i++) {
            const letter = alphabet[i];

            context.fillText(
                letter,
                this.offsetX + i * FIELD_SIZE + FIELD_SIZE * 1.5,
                this.offsetY + FIELD_SIZE * 0.7
            );
        };

        // создаем цифры в поле для игры
        for (let i = 1; i <= 10; i++) {
            context.fillText(
                i,
                this.offsetX + FIELD_SIZE * 0.5,
                this.offsetY + i * FIELD_SIZE + FIELD_SIZE * 0.7
            )
        };
        return this
    };
    // отрисовываем корабли
    drawSheep(context, sheep) {
        context.fillStyle = 'rgba(0, 0, 0, 0.7)'

        context.beginPath()
        context.rect( // rect это прямоугольник
            this.offsetX + sheep.x * FIELD_SIZE + FIELD_SIZE + 2,
            this.offsetY + sheep.y * FIELD_SIZE + FIELD_SIZE + 2,
            (sheep.direct === 0 ? sheep.size : 1) * FIELD_SIZE - 4,
            (sheep.direct === 1 ? sheep.size : 1) * FIELD_SIZE - 4
        )
        context.fill()

        return this
    }
    // отрисовываем точки выстрела
    drawCheck(context, check) {
        context.fillStyle = 'black'

        context.beginPath()
        context.arc( // arc это круг
            this.offsetX + check.x * FIELD_SIZE + FIELD_SIZE * 1.5, // умножение на полтора на пол поля вправо и пол поля вниз
            this.offsetY + check.y * FIELD_SIZE + FIELD_SIZE * 1.5,
            3, //радиус
            0,
            Math.PI * 2 // 0 и 2пи это старт и конец окружности
        )
        context.fill() // закрасить круг

        return this
    }
    // будет возращать true или false в зависимости от того находится ли точка которую мы передали ей в качестве элемента над Topology полем
    isPointUnder(point) {
        if (
            point.x < this.offsetX + FIELD_SIZE ||
            point.x > this.offsetX + 11 * FIELD_SIZE ||
            point.y < this.offsetY + FIELD_SIZE ||
            point.y > this.offsetY + 11 * FIELD_SIZE
        ) {
            return false
        }
        return true
    }
    getCoordinats(point) {
        if (!this.isPointUnder(point)) { // если эта точка не находится над полем
            return false
        }


        return {
            x: parseInt((point.x - this.offsetX - FIELD_SIZE) / FIELD_SIZE),
            y: parseInt((point.y - this.offsetY - FIELD_SIZE) / FIELD_SIZE)
        }
    }

    // Будет принимать корабль в качестве аргумента и возвращать true если можно разместить
    canStay(sheep) {
        // проверка за ранее можно ли размещать корабль, но он больше 10 и не сможет появиться
        if (sheep.direct === 0 && sheep.x + sheep.size > 10) {
            return false
        }

        if (sheep.direct === 1 && sheep.y + sheep.size > 10) {
            return false
        }


        const map = [
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true]
        ]

        // заполнение false там, где корабля не может быть
        for (const sheep of this.sheeps) {
            if (sheep.direct === 0) {
                for (let x = sheep.x - 1; x < sheep.x + sheep.size + 1; x++) {
                    for (let y = sheep.y - 1; y < sheep.y + 2; y++) {
                        if (map[y] && map[y][x]) {
                            map[y][x] = false
                        }
                    }
                }
            } else {
                for (let x = sheep.x - 1; x < sheep.x + 2; x++) {
                    for (let y = sheep.y - 1; y < sheep.y + sheep.size + 1; y++) {
                        if (map[y] && map[y][x]) {
                            map[y][x] = false
                        }
                    }
                }
            }
        }

        // Убеждаемся что на каждой клеточке где хочет расположится корабль - находится true
        if (sheep.direct === 0) {
            for (let i = 0; i < sheep.size; i++) {
                if (!map[sheep.y][sheep.x + i]) {
                    return false
                }
            }
        } else {
            for (let i = 0; i < sheep.size; i++) {
                if (!map[sheep.y + i][sheep.x]) {
                    return false
                }
            }
        }
        return true
    }



    // Случайным образом будет заполнять корабли на нашем поле Topology
    randoming() {
        this.sheeps = [] // очищаем все корабли

        for (let size = 4; size > 0; size--) {
            for (let n = 0; n < 5 - size; n++) {
                let flag = false // опускаем флаг

                while (!flag) { // пока флаг опущен размешаем корабль
                    const sheep = {
                        x: Math.floor(Math.random() * 10),
                        y: Math.floor(Math.random() * 10),
                        direct: Math.random() > Math.random() ? 0 : 1,
                        size
                    }

                    if (this.canStay(sheep)) {
                        this.addSheeps(sheep)
                        flag = true // поднимаем флаг и говорим циклу while что корабль размещен, продолжай логику
                    }
                }
            }
        }
    }
};