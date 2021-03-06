import { BulletType, ModifierStatus, PlayerType, Shape } from "../../types";
import { clamp, closestPlayer, collision, deg2rad } from "../../utils";
import Bullet from "./bullet";
import Engine from "../engine";
import Transport from "../transport";

export default class Player {
  id: number = -1;
  name: string = "";
  shape: Shape = Shape.triangle;
  color: string = "#ff0000";
  hp: number = 1;
  armor: number = 0;
  x: number = 0;
  y: number = 0;
  r: number = 0;
  bullets: Bullet[] = [];
  moveX: -1 | 0 | 1 = 0;
  moveY: -1 | 0 | 1 = 0;
  lastFireTime: number = 0;
  fireRate: number = 150;
  firing: boolean = false;
  velocity: number = 0.003;
  now: number = 0;
  steps: number = 1;
  engine: Engine;
  type: PlayerType;
  kills: number = 0;
  private lastMoveTime: number = 0;
  private moveDelay: number = 350;

  constructor(engine: Engine) {
    this.engine = engine;
    this.type = PlayerType.human;
  }

  encode(): object {
    return {
      id: this.id,
      kills: this.kills,
      name: this.name,
      shape: this.shape,
      type: this.type,
      color: this.color,
      hp: this.hp,
      armor: this.armor,
      x: this.x,
      y: this.y,
      r: this.r,
      bullets: this.bullets.map((bullet) => bullet.encode()),
    };
  }

  private updateBot() {
    // Move bot towards closest player
    const closest = closestPlayer(this, this.engine.players);
    if (closest.player === null) {
      this.firing = false;
    }
    if (closest.player !== null) {
      let x: -1 | 0 | 1 = this.moveX;
      let y: -1 | 0 | 1 = this.moveY;

      // Move towards closest player
      if (closest.distance >= 0.3) {
        if (this.x - closest.player.x < 0) x = 1;
        if (this.x - closest.player.x > 0) x = -1;
        if (this.y - closest.player.y < 0) y = -1;
        if (this.y - closest.player.y > 0) y = 1;
      }

      // Move away from closest player when their HP is higher or this bot is too close
      if (
        closest.player.hp + closest.player.armor > this.hp + this.armor ||
        closest.distance < 0.2
      ) {
        if (this.x - closest.player.x < 0) x = -1;
        if (this.x - closest.player.x > 0) x = 1;
        if (this.y - closest.player.y < 0) y = 1;
        if (this.y - closest.player.y > 0) y = -1;
      }

      if (this.now - this.lastMoveTime >= this.moveDelay) {
        this.lastMoveTime = this.now;
        this.moveX = x;
        this.moveY = y;
      }
      this.r =
        Math.atan2(closest.player.y - this.y, closest.player.x - this.x) -
        deg2rad(90);
      this.firing = closest.distance < 0.325;
    }
  }

  update() {
    if (this.type === PlayerType.bot) {
      this.updateBot();
    }

    let velocity = this.velocity;
    if (this.moveX !== 0 && this.moveY !== 0) {
      // Move slower if moving diagonally
      velocity *= 0.75;
    }
    this.x += velocity * this.moveX * this.steps;
    this.y -= velocity * this.moveY * this.steps;
    this.x = clamp(
      this.x,
      this.engine.mapBounds.x.min,
      this.engine.mapBounds.x.max
    );
    this.y = clamp(
      this.y,
      this.engine.mapBounds.y.min,
      this.engine.mapBounds.y.max
    );

    if (this.firing && this.now - this.lastFireTime >= this.fireRate) {
      this.lastFireTime = this.now;
      const bullet = new Bullet();
      bullet.sX = this.x;
      bullet.sY = this.y;
      bullet.x = this.x;
      bullet.y = this.y;
      bullet.r = this.r;
      bullet.type = BulletType.ring;
      this.bullets.push(bullet);
    }

    let modifierCollision = false;
    for (let i = this.engine.modifiers.length - 1; i >= 0; i--) {
      const { x: x1, y: y1 } = this;
      const { x: x2, y: y2 } = this.engine.modifiers[i];
      if (collision(x1, y1, x2, y2)) {
        switch (this.engine.modifiers[i].status) {
          case ModifierStatus.heal:
            this.hp = Math.min(1, this.hp + this.engine.modifiers[i].value);
            break;
          case ModifierStatus.armor:
            this.armor = Math.min(
              1,
              this.armor + this.engine.modifiers[i].value
            );
            break;
        }
        modifierCollision = true;
        this.engine.modifiers.splice(i, 1);
      }
    }

    if (modifierCollision) {
      this.engine.socket.emit(
        "game.modifiers",
        Transport.encode(
          this.engine.modifiers.map((modifier) => modifier.encode())
        )
      );
    }

    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].now = this.now;
      this.bullets[i].steps = this.steps;
      this.bullets[i].update();

      let remove = false;
      for (let j = this.engine.players.length - 1; j >= 0; j--) {
        if (this.engine.players[j].id === this.id) continue;
        const { x: x1, y: y1 } = this.engine.players[j];
        const { x: x2, y: y2 } = this.bullets[i];
        if (collision(x1, y1, x2, y2)) {
          remove = true;
          if (this.engine.players[j].armor > 0) {
            // Damage armor first
            this.engine.players[j].armor = Math.max(
              0,
              this.engine.players[j].armor - this.bullets[i].damage
            );
          } else {
            // Then reduce hp
            this.engine.players[j].hp = Math.max(
              0,
              this.engine.players[j].hp - this.bullets[i].damage
            );
          }
          if (this.engine.players[j].hp === 0) {
            this.kills = this.kills + 1;
            this.engine.socket.emit(
              "game.player.kill",
              Transport.encode({ playerId: this.id, kills: this.kills })
            );
          }
          break;
        }
      }

      if (this.bullets[i].distance >= this.bullets[i].maxDistance) {
        remove = true;
      }

      if (remove) {
        this.bullets.splice(i, 1);
      }
    }
  }
}
