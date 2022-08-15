import {addRect} from "./resourses.js";
import {config} from "./config.js";

export default class Grid extends PIXI.Container {
    _row = 8;
    _col = 8;
    _offset = 5;
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

        this.fillGrid();

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
    }

    addGrid(){
        const grid = [],
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
                    alpha: 0.1
                })

                cell.x = x * ((w - offset) / row);
                cell.y = y * ((h - offset) / col);

                grid.push(cell);
            }
        }

        this._screen.x -= this._screen.width / 2;
        this._screen.y -= this._screen.height / 2;

        return grid;
    }

    fillGrid(){
        for (const i in this._grid) {
            const cell = this._grid[i];
            const col = Math.floor(Number(i) % this._col) + 1;
            const row = Math.floor(Number(i) / this._row) + 1;
            const text = new PIXI.Text(col.toString() + " " + row);
            text.anchor.set(0.5);
            text.x = cell.width / 2;
            text.y = cell.height / 2;
            text.style.fill = "white";
            cell.addChild(text);
        }
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}