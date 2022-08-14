import {addRect} from "./resourses.js";
import {config} from "./config.js";

export default class Grid extends PIXI.Container {
    _row = 8;
    _col = 8;
    _offset = 30;
    _size = config.width / this._row - this._offset;

    constructor({parent, cards})
    {
        super();

        this._cards = cards;

        this.bg = addRect({
            parent: this,
            width: config.width,
            height: config.height,
            color: 0x5000f0,
            alpha: 0
        });

        this._screen = new PIXI.Container();
        this._screen.x = this.width / 2;
        this._screen.y = this.height / 2;
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
            // new PIXI.filters.BulgePinchFilter({
            //     radius: 300,
            //     strength: 0.1,
            // })
        ];

        app.ticker.add(()=>{

            if (this._screen.alpha !== 1){
                this._screen.alpha = 1;
            }

            if (Math.random() < 0.75){
                this._screen.alpha = 0.9;
            }
        })
    }

    addGrid(){
        const grid = [],
              card = [],
            size = this._size,
              offset = this._offset,
              row = this._row,
              col = this._col,
              w = this.width,
              h = this.height

        for (let y = 0; y < col; y++){
            for (let x = 0; x < row; x++){
                const cell = new PIXI.Container();
                this._screen.addChild(cell)

                const rect = addRect({
                    parent: cell,
                    width: (w - offset) / row - offset,
                    height: (w - offset) / col - offset,
                    color: 0xffffff,
                    alpha: 0
                })

                const text = new PIXI.Text("",
                    new PIXI.TextStyle({fontFamily: "myFont"})
                );
                text.scale.set(1 / 60 * size)
                text.anchor.set(0.5);
                text.x = rect.width / 2;
                text.y = rect.height / 2;
                text.style.fill = "white";
                cell.addChild(text);

                cell.x = x * ((w - offset) / row);
                cell.y = y * ((h - offset) / col);

                if (
                    y > (col - 4) / 2 - 1 &&
                    y < col - (col - 4) / 2 &&
                    x > (row - 4) / 2 - 1 &&
                    x < row - (row - 4) / 2
                ){
                    card.push(cell);
                }

                // card.push(cell);

                grid.push(cell);
            }
        }

        this._screen.x -= this._screen.width / 2;
        this._screen.y -= this._screen.height / 2;

        return {grid: grid, card: card};
    }

    showCard(num){
        return this._cards[num - 1].body;
    }

    renderCard(num){
        const card = this.showCard(num);
        const {card: grid} = this._grid;
        shuffle(card);

        for (const i in grid) {
            if (i){
                if (grid[i]){
                    grid[i].children[0].alpha = 1;
                    grid[i].children[1].alpha = 0;
                    gsap.fromTo(grid[i].children[0],
                        {
                            x: this._size / 4,
                            y: this._size / 2,
                            width: this._size / 2,
                            height: this._size / 2,
                        },
                        {
                            x: this._size / 4,
                            y: this._size / 4,
                            width: this._size / 2,
                            height: this._size / 2,
                            repeat: 2,
                            yoyo: true,
                            duration: 0.2,
                            ease: "steps(2)",
                            delay: 0.2 * (Math.random() - 0.5),
                            onComplete: ()=>{
                                grid[i].children[0].alpha = 0;
                                grid[i].children[0].x = 0;
                                grid[i].children[0].y = 0;
                                grid[i].children[0].width = this._size;
                                grid[i].children[0].height = this._size;

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