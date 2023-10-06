const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

const loader = new PIXI.Loader();

let sprite; // Déclarez une variable pour stocker le sprite

loader.add('python', './python.png').load((loader, resources) => {
  console.log(resources); // Affiche les ressources chargées dans la console

  // Vérifiez que l'image est correctement chargée avant de créer le sprite
  if (resources.python) {
    // Créez le sprite
    sprite = new PIXI.Sprite(resources.python.texture);

    // Ajustez la taille du sprite (réduction à 50%)
    sprite.scale.set(0.05, 0.05);

    sprite.x = 100;
    sprite.y = 100;
    app.stage.addChild(sprite);

    // Ajoutez un gestionnaire d'événement pour les touches de clavier
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  } else {
    console.error("L'image 'python' n'a pas été chargée correctement.");
  }
});

let isLeftKeyDown = false;
let isRightKeyDown = false;

function handleKeyDown(event) {
  if (event.key === 'ArrowLeft') {
    isLeftKeyDown = true;
  } else if (event.key === 'ArrowRight') {
    isRightKeyDown = true;
  }
}

function handleKeyUp(event) {
  if (event.key === 'ArrowLeft') {
    isLeftKeyDown = false;
  } else if (event.key === 'ArrowRight') {
    isRightKeyDown = false;
  }
}

// Fonction pour mettre à jour la position du sprite en fonction des touches enfoncées
function updateSpritePosition() {
  if (isLeftKeyDown) {
    sprite.x -= 5; // Déplace le sprite vers la gauche
  }

  if (isRightKeyDown) {
    sprite.x += 5; // Déplace le sprite vers la droite
  }
}

// Appel de la fonction updateSpritePosition à chaque rafraîchissement de l'écran
app.ticker.add(() => {
  updateSpritePosition();
});
