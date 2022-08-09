const loader = PIXI.Loader.shared;
app.loader = loader;

loader.baseUrl = "fonts/";

loader
    .add("myFont", "PressStart2P-Regular.ttf")

loader.load(() => {
    app.stage.emit("loaded");
});