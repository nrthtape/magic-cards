export function addRect(config){

    config = Object.assign({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        color: 0xff0000,
        visible: true,
        alpha: 1
    }, config);

    const rect = new PIXI.Graphics();
    rect.beginFill(config.color);
    rect.drawRect(config.x, config.y, config.width, config.height);
    rect.endFill();
    rect.parentGroup = config.group;
    rect.visible = config.visible;
    rect.alpha = config.alpha;

    config.parent.addChild(rect);

    return rect;
}

export function addText(config){

}