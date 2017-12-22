Competitive hot-seat platform game by mcalus3. Play now! https://mcalus3.github.io/color-wars-web

**ColorWars** is my first attempt to fulfill my dreams about being a game developer. I have made my [first prototype in C#][cw], but soon after i have rewritten it in typescript for the web. The idea was to make graphically simple, but competitive browser game that anyone and anywhere would be able to play with friends.

The game rules are simple - try to paint as much territory as possible until timer ends, but watch out, because enemies can cut off your tail while you are painting!

## Gameplay

**ColorWars** can be played by up to 8 players. To enable more players, switch off "AI controlled" button in given player settings. The game has dynamic settings, so you can change every aspect of the game during the match. The aim of the game is to have more territory than other players when game ends. You can die by hitting edge of the screen, or when someone cuts your tail. When the death penalty is set to infinite or you don't have any territory left, you are eliminated from the game.
Simple touchscreen support has been added, so you can try it on your mobile device.

![gameplay](https://github.com/mcalus3/color-wars-web/blob/master/resources/gameplay.gif)

## Libriaries and dependencies

**ColorWars** is based on [Model-View-Update pattern][elm], it uses [Redux] library for state management and [React] + [Konva] libraries for view (and [react-bootstrap] for ui controls). The project is written in typescript and bootstrapped by [Typescript-React-Starter][trs].
Thanks to all authors of these libraries for making Color Wars possible!

## Contributing

**ColorWars** was created for entertainment and it's still under developement. If you would like to contribute, feel free to open issue, fork, submit pull request, or contact me for backlog with nearest planned features. You can also follow my dev blog if you would like to see comments made during development of this game: https://mcalusblog.wordpress.com/ 

   [cw]: <https://github.com/mcalus3/ColorWars>
   [trs]: <https://github.com/Microsoft/TypeScript-React-Starter>
   [trs]: <https://github.com/Microsoft/TypeScript-React-Starter>
   [elm]: <https://guide.elm-lang.org/architecture/>
   [Redux]: <https://github.com/reactjs/redux>
   [React]: <https://github.com/facebook/react>
   [Konva]: <https://github.com/konvajs/konva>
   [react-bootstrap]: <https://github.com/react-bootstrap/react-bootstrap>