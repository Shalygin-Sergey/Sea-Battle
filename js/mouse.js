function getMouse(element) {
    const mouse = {
        x: 0,
        y: 0,
        s: false,
        left: false,
        pleft: false
    }

    // слежка за мышкой у элемента на нашем поле
    element.addEventListener('mousemove', function (event) {
        const rect = element.getBoundingClientRect() // возвращает нам объект в котором хранится абсолютное положение элемента относительно крайнего левого угла нашей страницы
        mouse.x = event.clientX - rect.left // где координаты Х
        mouse.y = event.clientY - rect.top // где координаты Y
    })

    // событие прокрутки колесиком
    element.addEventListener('wheel', function (event) {
        mouse.s = !mouse.s
    })
    // прослушка событий нажатия нк кнопку мыши и отпускание
    element.addEventListener("mousedown", function (event) {
        if (event.buttons == 1) {
            mouse.left = true
        }
    })
    element.addEventListener("mouseup", function (event) {
        if (event.buttons !== 1) {
            mouse.left = false
        }
    })

    return mouse
}