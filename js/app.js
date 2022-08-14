import {config} from "./config.js";

class Application {
    constructor({width, height}) {
        this.renderer = new PIXI.Renderer({
            width: config.width,
            height: config.height,
            // backgroundColor: 0x001111,
            resolution: 1,
            antialias: true,
            autoResize: true,
        });

        this.renderer.view.id = "pixi-canvas";

        document.body.appendChild(this.renderer.view);

        this.ticker = new PIXI.Ticker();
        this.stage = new PIXI.display.Stage();

        this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW);
        this.ticker.start();

        this.resize();
        window.onresize = this.resize.bind(this);
    }

    get screen() {
        return this.renderer.screen;
    }

    get view() {
        return this.renderer.view;
    }


    resize() {
        let gameW = config.width,
            gameH = config.height

        // if (window.innerWidth < window.innerHeight) {
        //     gameW = game.width;
        //     gameH = game.height;
        // }
        // else{
        //     gameW = game.height;
        //     gameH = game.width;
        // }

        const w = Math.max(window.innerWidth, document.body.clientWidth);
        const h = Math.max(window.innerHeight, document.body.clientHeight);

        const scaleFactor = Math.min(
            w / gameW,
            h / gameH
        );

        const newWidth = Math.ceil(gameW * scaleFactor);
        const newHeight = Math.ceil(gameH * scaleFactor);

        this.renderer.resize(newWidth, newHeight);
        this.stage.scale.set(scaleFactor);
    }

    render() {
        this.renderer.render(this.stage);
    }
}

window.app = new Application(config);