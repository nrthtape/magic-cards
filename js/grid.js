import {addRect} from "./resourses.js";
import {config} from "./config.js";

export default class Grid extends PIXI.Container {
    _row = 4;
    _col = 4;
    _size = 50;
    _offset = 40;

    constructor({parent, cards})
    {
        super();

        this._cards = cards;

        this.bg = addRect({
            parent: this,
            width: config.width,
            height: config.height,
            color: 0x5000f0,
            alpha: 1
        });

        this._screen = new PIXI.Container();
        this._screen.x = this.width / 2;
        this._screen.y = this.height / 2 - 50;
        this.addChild(this._screen);

        this._grid = this.addGrid();

        parent.addChild(this);

        this._CRTFilter = new PIXI.filters.CRTFilter({
            vignettingAlpha: 0.1
        });

        app.ticker.add((delta)=>{
            this._CRTFilter.time += delta / 4
        })

        this.filters = [
            this._CRTFilter,
            new PIXI.filters.BulgePinchFilter({
                radius: 300,
                strength: 0.1,
                // center: [0.5, 0.4]
            })
        ];

        this._screen.filters = [
            new PIXI.filters.GlowFilter({
                outerStrength: 0.5,
                innerStrength: 0.5,
                color: 0x00ff00
            })
        ]
    }

    addGrid(){
        const grid = [],
              offset = this._offset,
              size = this._size,
              row = this._row,
              col = this._col

        for (let y = 0; y < col; y++){
            for (let x = 0; x < row; x++){
                const cell = new PIXI.Container();
                this._screen.addChild(cell)

                const rect = addRect({
                    parent: cell,
                    width: size,
                    height: size,
                    color: 0xffffff,
                    alpha: 0
                })

                const text = new PIXI.Text("",
                    new PIXI.TextStyle({fontFamily: "pixelFont"})
                );
                text.scale.set(1 / 50 * size)
                text.anchor.set(0.5);
                text.x = rect.width / 2;
                text.y = rect.height / 2;
                text.style.fill = "white";
                cell.addChild(text);

                cell.x = x * (size + offset);
                cell.y = y * (size + offset);

                if (
                    y > (col - this._col) / 2 - 1 &&
                    y < col - (col - this._col) / 2 &&
                    x > (row - this._row) / 2 - 1 &&
                    x < row - (row - this._row) / 2
                ){
                    grid.push(cell);
                }
            }
        }

        this._screen.x -= this._screen.width / 2;
        this._screen.y -= this._screen.height / 2;

        return grid;
    }

    showCard(num){
        return this._cards[num - 1].body;
    }

    renderCard(num){
        const card = this.showCard(num);
        const grid = this._grid;
        shuffle(card);

        for (const i in grid) {
            if (i){
                if (card[i]){
                    grid[i].children[0].alpha = 1;
                    grid[i].children[1].alpha = 0;
                    gsap.fromTo(grid[i].children[0],
                        {
                            x: this._size / 2,
                            y: this._size / 2 + 10,
                            width: this._size / 2,
                            height: this._size / 2,
                        },
                        {
                            x: this._size / 2,
                            y: this._size / 2,
                            width: this._size / 2,
                            height: this._size / 2,
                            text: card[i],
                            repeat: 2,
                            yoyo: true,
                            duration: 0.2,
                            delay: 0.2 * (Math.random() - 0.5),
                            onComplete: ()=>{
                                grid[i].children[0].alpha = 0;
                                grid[i].children[1].alpha = 1;
                                grid[i].children[1].text = card[i];
                            }
                        }
                    );
                }
            }
        }
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}