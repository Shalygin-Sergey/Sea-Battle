function getMouse(element) {
    const mouse = {
        x: 0,
        y: 0
    }

    // слежка за мышкой у элемента на нашем поле
    element.addEventListener('mousemove', function (event) {
        const rect = element.getBoundingClientRect() // возвращает нам объект в котором хранится абсолютное положение элемента относительно крайнего левого угла нашей страницы
        mouse.x = event.clientX - rect.left // где координаты Х
        mouse.y = event.clientY - rect.top // где координаты Y
    })

    return mouse
}