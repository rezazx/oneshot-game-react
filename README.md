# ONE SHOT GAME
A simple game with JavaScript and React to destroy your enemies.\
This project is developed for fun only.\
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install Projects
- `git clone https://github.com/rezazx/oneshot-game-react`
- `cd oneshot-game`
- `npm install`
- `npm start`

## Game Rules
There are three types of enemies in this game:\
1- Small red creatures that move slowly. Killing each of these creatures has 5 points.\
2- Creatures relatively bigger and faster than the previous one with pink color, killing these creatures has 10 points.\
3- Very fast creatures with blue color, killing this creature has 20 points.\
If one of these enemies hits your tank, the game is over.\

Walls are another component of the game. Destroying them does not score points, but your bullet will not pass through them. The green wall needs three bullets, the red one needs two bullets and the white one one bullet to destroy.\
If your bullet does not hit anything, you will lose 10 points.\
As the level of the game progresses, enemies and walls are built faster and more in number.\

## License

MIT License

Copyright (c) 2024 Reza Zx

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.