interface IShip {}

class Ship {
    private canvas: HTMLCanvasElement;

    private x: number = 0.0;
    private y: number = 0.0;
    private direction: number = 0.0;

    private xVelocity: number = 0.0;
    private yVelocity: number = 0.0;

    private goForce: number = 0.0;
    private stopForce: number = 0.0;
    private handling: number = 0.0;
    private mass: number = 0.0;

    private points: any[] = [];
    private color: string = '#f14668';

    public constructor(x: number, y: number, canvas: HTMLCanvasElement) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
    }

    public init() {
        this.xVelocity = 0;
        this.yVelocity = 0;

        this.goForce = 1.0;
        this.stopForce = 1.2;
        this.handling = 0.04;
        this.mass = 3000;

        this.color = '#f14668';
        this.loadBasicShip();
    }

    public loadBasicShip() {
        this.points = [
            { x: -0.5, y: 0 },
            { x: -0.5, y: -4 },
            { x: -1.5, y: -4 },
            { x: -2.5, y: 0 },
            { x: -1.5, y: 2 },
            { x: 1.5, y: 2 },
            { x: 2.5, y: 0 },
            { x: 1.5, y: -4 },
            { x: 0.5, y: -4 },
            { x: 0.5, y: 0 },
            { x: -0.5, y: 0 },
        ];
    }

    public drawShip() {
        let context = this.canvas.getContext('2d');
        let scale = 8;
        if (context) {

            context.fillStyle = this.color;
            context.lineWidth = 3;
            context.strokeStyle = this.color;
            context.beginPath();

            console.log(this.points);

            for (const point of this.points) {
                let rotatedPoint = this.rotatePointAboutOrigin(
                    point.x,
                    point.y,
                    this.direction,
                );
                context.lineTo(
                    rotatedPoint.x * scale + this.x,
                    rotatedPoint.y * scale + this.y,
                );
            }
            context.fill();
            context.closePath();
            context.stroke();
        }
    }
    public goRight() {
        this.direction += this.handling;
    }
    public goLeft() {
        this.direction -= this.handling;
    }

    public getDirection() {
        return this.direction;
    }

    private rotatePointAboutOrigin(x: number, y: number, theta: number) {

        let s = Math.sin(theta);
        let c = Math.cos(theta);

        let newX = x * c - y * s;
        let newY = x * s + y * c;

        return { x: newX, y: newY };

    }
}

export { Ship, IShip };
