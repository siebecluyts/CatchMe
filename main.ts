input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.X, -1)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    player.change(LedSpriteProperty.X, 1)
})
input.onButtonPressed(Button.B, function () {
    player.change(LedSpriteProperty.X, 1)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    player.change(LedSpriteProperty.X, -1)
})
function start () {
    basic.clearScreen()
    speed = 250
    joystickbit.initJoystickBit()
    keer_geloopt = 0
    player = game.createSprite(2, 4)
    game.setScore(0)
    enimy = game.createSprite(randint(0, 4), 0)
    last_x_enemy = enimy.get(LedSpriteProperty.X)
}
let last_x_enemy = 0
let enimy: game.LedSprite = null
let keer_geloopt = 0
let speed = 0
let player: game.LedSprite = null
start()
basic.forever(function () {
    if (joystickbit.getRockerValue(joystickbit.rockerType.X) <= 200) {
        player.change(LedSpriteProperty.X, 1)
    }
    if (joystickbit.getRockerValue(joystickbit.rockerType.X) >= 800) {
        player.change(LedSpriteProperty.X, -1)
    }
})
basic.forever(function () {
    if (speed >= 200) {
        speed = speed - 1.8 * keer_geloopt
    } else {
        speed = speed - keer_geloopt
    }
    basic.pause(500)
    enimy.set(LedSpriteProperty.Y, 0)
    enimy.set(LedSpriteProperty.X, randint(0, 4))
    while (last_x_enemy == enimy.get(LedSpriteProperty.X)) {
        enimy.set(LedSpriteProperty.X, randint(0, 4))
    }
    last_x_enemy = enimy.get(LedSpriteProperty.X)
    for (let index = 0; index < 5; index++) {
        basic.pause(speed)
        enimy.change(LedSpriteProperty.Y, 1)
    }
    if (enimy.isTouching(player)) {
        basic.pause(50)
        game.addScore(1)
        keer_geloopt += 1
    } else {
        basic.clearScreen()
        basic.showIcon(IconNames.Sad)
        basic.pause(250)
        basic.showNumber(game.score())
        keer_geloopt = 0
        speed = 250
        game.setScore(0)
    }
})
