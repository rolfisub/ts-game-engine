# Typescript Based Game Engine #
This project is a basic game engine written in typescript, it uses canvas for rendering images and it has very basic functionality.

The engine code is designed so that we can expand on the built in functionality, but provides the basics for rendering and 
managing a small size game.

## API Docs: ##


### game.ts class ###
This class is the main instance that attaches to a canvas element,
you will need to specify the canvas element id or class. (It uses Jquery selector format to attach it self).

By default the game class will try to cover all of the available screen.

```typescript
import { Game } from "../engine/game";

//attach the game instance to a canvas element id = "canvas"
const game = new Game("#canvas");

//initialize the game instance
game.init();

//start game loop
requestAnimationFrame(game.gameLoop);
```

At this point you will need to start adding game objects so that you can start rendering something.

### game-object.ts class ###

This class is the base class for any object that will run code in the game, it can be an invisible or a visible object in the screen.

There are 2 very important methods that will get run on every frame:

update();

and

render();

You can override both if you want to, but they already come with a prebuilt functionality.

Example:

```typescript
import { GameObject } from "../../engine/gameObject";

class Player extends GameObject {
    //list of images to be loaded
    //by default index 0 will be loaded
    public imgsrc = [
        "assets/img/image1.png"
    ];
} 

const player = new Player();

//override defaults:
player.id = "player";
player.speed = 5;
player.pos = {
    x: 50,
    y: 50
};
player.width = 100;
player.height = 100;

//then on game.ts:
game.addObject(player);
```

At this point, you will have a player that is rendered on the screen and that if you press any arrow key it will move.

Please look at the game-object.ts class for more information on all the properties that can be changed.

### animated.ts class ###

This class was created to render animated objects it is an extension of the GameObject class so everything that is available there will be avialable here.

An example to create an animated object and to start an animation will be:


```typescript
import { Animated, Animation } from "../../engine/animatedObject";

class Dog extends Animated {
    public id: string = "dog";
    public width: number = 100;
    public height: number = 100;
    
    public runAnimation: Animation = {
        //animation frames
        images: [
          "assets/img/dog_run_1.png",
          "assets/img/dog_run_2.png",
          "assets/img/dog_run_3.png",
          "assets/img/dog_run_4.png",
          "assets/img/dog_run_5.png"
        ],
        //wait time between frames
        speed: 200,
        //repeat animation?
        repeat: false,
        //is animation running?
        running: false,
        //script to run before animation starts (Optional)
        start: () => {
          //change something before running
          //make dog 2 times bigger
          this.height *= 2;
          this.width *= 2;
          this.speed = 50;
        },
        //script to run when animation ends (Optional)
        //only runs if repeat = false
        done: () => {
          //revert changes?
          //make dog previus size
          this.height /= 2;
          this.width /= 2;
          this.speed = 25;
        }
    };
    
}

const dog = new Dog();

dog.addAnimation("run", dog.runAnimation);

//you can also declare animations outside of the class
const barkAnimation: Animation = {
    images: [
      "assets/img/dog_bark_1.png",
      "assets/img/dog_bark_2.png"
    ],
    speed: 200,   
    repeat: true,    
    running: false
    
};

dog.addAnimation("bark", barkAnimation);

//to start an animation you could trigger it manually here also
dog.startAnimation("bark");

//to stop an animation it stops the current animation
dog.stopAnimation();
```


These are the basics for the game engine. I will provide more documentation in the near future but I suggest that you explore the engine classes and its method implementations as they are self descriptive.

## Example Game: ##

To run the example ski game do:

```bash
#step 1
yarn install 
  #OR
npm install

#step 2
yarn dev ski-game
  #OR
npm run dev ski-game
```

## TODO: ##

1. Add sound management.
2. Create or integrate physics engine.
3. Add support for WebGL.
4. Unit tests.
5. Better Documentation. 
6. Any Suggestions?

If you would like to contact me: rolfisub@gmail.com you can also create a pull request if you like to contribute.

Thanks!
