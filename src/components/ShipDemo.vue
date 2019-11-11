<template>
    <div>
        <div class="box is-shadowless is-marginless">
            <div class="content is-medium">
                <h1 class="has-text-danger">Space Race</h1>
                <p class="has-text-dark">
                    It's all about that sweet <b>victory</b> and the
                    <b>cash</b> that comes with it. After all, <b>cash</b> is
                    best for an ever growing <b>Ship</b>.
                </p>
            </div>
        </div>
        <div id="shipCanvasHolder" class="box is-shadowless is-marginless">
            <canvas id="shipCanvas"></canvas>
        </div>
        <div class="buttons has-addons is-centered is-hidden-widescreen">
            <button
                class="button is-light is-danger is-large"
                @click="goLeft()"
            >
                LEFT
            </button>
            <button
                class="button is-light is-danger is-large"
                @click="goRight()"
            >
                RIGHT
            </button>
        </div>
        <div class="box is-shadowless is-marginless">
            <div class="content is-small">
                <h1 class="has-text-danger">About</h1>
                <p>
                    You are just another space wanderer, trying to make a
                    living. It would only make sense that you use your awesome
                    <b>Space Racing skills</b>, and your <b>Dad's ol' Ship</b>,
                    to make an honest living, right?
                </p>
            </div>
        </div>
        <div class="box is-shadowless is-marginless">
            <div class="content is-small">
                <h1 class="has-text-danger">Collect and Trade</h1>
                <p>
                    Everything in the game of <b>Space Race</b> is represented
                    by a card. All cards in the game can be traded and collected
                    by anyone. The only thing you have, is a collection of
                    cards.
                </p>
            </div>
        </div>
        <div class="box is-shadowless is-marginless">
            <div class="content is-small">
                <h1 class="has-text-danger">Race</h1>
                <p>
                    Use all of your card-built ships to race for
                    <b>Lap Times that bring Glory</b> and
                    <b>Coins that bring Wealth</b>. You can race against a
                    clock, strangers, ghosts or bots.
                </p>
            </div>
        </div>
        <div class="box is-shadowless is-marginless">
            <div class="content is-small">
                <h1 class="has-text-danger">Requirements</h1>
                <p>Any browser</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Ship } from '@/models/Ship';

    export default Vue.extend({
        name: 'ShipDemo',
        props: {
            msg: String,
        },
        methods: {
            setupCanvas() {
                let shipCanvasHolder: HTMLDivElement = <HTMLDivElement>(
                    document.getElementById('shipCanvasHolder')
                );
                let shipCanvas: HTMLCanvasElement = <HTMLCanvasElement>(
                    document.getElementById('shipCanvas')
                );

                let shipCanvasHolderStyle = window.getComputedStyle(
                    shipCanvasHolder,
                );
                let totalPadding =
                    parseInt(shipCanvasHolderStyle.paddingLeft) +
                    parseInt(shipCanvasHolderStyle.paddingRight);
                this.canvas.ration = 3.0 / 4.0;
                this.canvas.width =
                    parseInt(shipCanvasHolderStyle.width) - totalPadding;
                this.canvas.height = this.canvas.width / this.canvas.ration;
                shipCanvas.width = this.canvas.width;
                shipCanvas.height = this.canvas.height;
            },
            setupParticles() {
                for (let index = 0; index < 300; index++) {
                    let newParticle = {
                        x: Math.floor(Math.random() * Math.floor(this.canvas.width)),
                        y: Math.floor(Math.random() * Math.floor(this.canvas.height)),
                        color: '#ffffff',
                        size: 1 + Math.random(),
                        speed: 0.5 +Math.random(),
                    };
                    this.particles.push(newParticle);
                }
            },
            goLeft() {
                this.ship.goLeft();
                // this.updateCanvas();
                // this.ship.drawShip();
                this.render();
            },
            goRight() {
                this.ship.goRight();
                // this.updateCanvas();
                // this.ship.drawShip();
                this.render();
            },
            updateCanvas() {
                let shipCanvas: HTMLCanvasElement = <HTMLCanvasElement>(
                    document.getElementById('shipCanvas')
                );
                if (shipCanvas) {
                    let context = shipCanvas.getContext('2d');
                    if (context) {
                        context.fillStyle = '#373737';
                        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

                    }
                }
                // this.ship.drawShip();
            },
            drawParticles() {
                let shipCanvas: HTMLCanvasElement = <HTMLCanvasElement>(
                    document.getElementById('shipCanvas')
                );
                if (shipCanvas) {
                    let context = shipCanvas.getContext('2d');
                    if (context) {
                        for (const particle of this.particles) {
                            context.fillStyle = particle.color;
                            context.lineWidth = 3;
                            context.beginPath();
                            context.arc(
                                particle.x,
                                particle.y,
                                particle.size,
                                0,
                                2 * Math.PI,
                            );
                            context.closePath();
                            context.fill();
                        }
                    }
                }
            },
            render() {
                this.updateCanvas();
                this.ship.drawShip();
                this.drawParticles();
                let xIncrease = Math.cos(this.ship.direction + Math.PI/2);
                let yIncrease = Math.sin(this.ship.direction + Math.PI/2);
                for (let particle of this.particles) {
                    particle.x += xIncrease * particle.speed;
                    particle.y += yIncrease * particle.speed;
                    if (particle.x >= this.canvas.width) {
                        particle.x = 0;
                    }
                    else if (particle.x <= 0) {
                        particle.x = this.canvas.width;
                    }
                    if (particle.y >= this.canvas.height) {
                        particle.y = 0;
                    }
                    else if (particle.y <= 0) {
                        particle.y = this.canvas.height;
                    }
                }
            }
        },
        mounted(): void {
            this.setupCanvas();
            this.setupParticles();
            this.updateCanvas();

            document.onkeydown = (event) => {
                console.log("KEY", event.code);
                switch(event.code) {
                    case "ArrowUp":
                        break;
                    case "ArrowDown":
                        break;
                    case "ArrowLeft":
                        this.goLeft();
                        break;
                    case "ArrowRight":
                        this.goRight();
                        break;
                }
            };

            let shipCanvas: HTMLCanvasElement = <HTMLCanvasElement>(
                document.getElementById('shipCanvas')
            );
            if (shipCanvas) {
                this.ship = new Ship(
                    this.canvas.width / 2,
                    this.canvas.height / 2,
                    shipCanvas,
                );
                this.ship.init();
                this.ship.drawShip();
            }

            setInterval(this.render, 1000 / 60)

        },
        data() {
            return {
                canvas: {
                    width: 0.0,
                    height: 0.0,
                    ration: 0.0,
                },
                ship: {},
                particles: []
            };
        },
    });
</script>

<style scoped>
    #shipCanvas {
        border-radius: 10px;
    }
</style>
