const app = new PIXI.Application({ width: 800, height: 600 });

document.body.appendChild(app.view);

const square = new PIXI.Graphics();
square.beginFill(0xFF0000);
square.drawRect(100, 100, 200, 200);
square.endFill();

app.stage.addChild(square);