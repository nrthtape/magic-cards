import Grid from "./grid.js";
import {cards} from "./cards.js";

app.stage.on("loaded", ()=>{
    initGame();
})

//This function will run when the image has loaded
export function initGame() {
    let grid = new Grid({
        parent: app.stage,
        cards: cards
    });

    app.stage.interactive = true;

    app.stage.on("pointerdown", ()=>{
        // grid.transformGrid();
    })

    // app.stage.on("pointerup", ()=>{
    //     grid.remove();
    //     // initGame();
    // })

    app.ticker.add(gameLoop);
}

export function gameLoop(delta){
    //
}