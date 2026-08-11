import * as THREE from 'three';
import { Config } from '../Config.js';
import { disposeObject3D } from '../rendering/disposeObject3D.js';

const PLAYER_COLORS = [0x4488ff, 0xff8844, 0x44ff88, 0xff44ff, 0xffff44, 0x44ffff, 0xff4444, 0x88ff44];
export { PLAYER_COLORS };

/**
 * RemotePlayer — visual representation of another player in multiplayer.
 * Handles interpolation, name label, HP bar, and walk animation.
 */
export class RemotePlayer {
  group = new THREE.Group();
  hp = Config.player.maxHP;
  alive = true;
  id;
  name;
  color;

  #targetPos = new THREE.Vector3();
  #targetRotY = 0;
  #body; #head; #leftArm; #rightArm; #leftLeg; #rightLeg;
  #nameSprite; #hpBarBg; #hpBar;

  constructor(scene, id, name, colorIndex = 0) {
    this.id = id;
    this.name = name;
    this.color = PLAYER_COLORS[colorIndex % PLAYER_COLORS.length];
    this.scene = scene;
    this.#build();
    this.#buildNameLabel();
    this.#buildHealthBar();
    scene.add(this.group);
  }

  get position() { return this.group.position; }

  #build() {
    const mainMat = new THREE.MeshStandardMaterial({ color: this.color, roughness: 0.4, metalness: 0.6 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3, metalness: 0.8 });

    this.#body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.45), mainMat);
    this.#body.position.y = 1.1;
    this.#body.castShadow = true;
    this.group.add(this.#body);

    this.#head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.4), darkMat);
    this.#head.position.y = 1.8;
    this.#head.castShadow = true;
    this.group.add(this.#head);

    const visor = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.08, 0.05),
      new THREE.MeshBasicMaterial({ color: this.color }),
    );
    visor.position.set(0, 1.82, -0.22);
    this.group.add(visor);

    this.#leftArm = new THREE.Group();
    this.#rightArm = new THREE.Group();
    [-1, 1].forEach(side => {
      const arm = side === -1 ? this.#leftArm : this.#rightArm;
      arm.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.4, 6), darkMat), { position: new THREE.Vector3(0, -0.2, 0) }));
      arm.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.35, 6), mainMat), { position: new THREE.Vector3(0, -0.55, 0) }));
      arm.position.set(side * 0.45, 1.35, 0);
      this.group.add(arm);
    });

    const gun = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.4), darkMat);
    gun.position.set(0, -0.6, -0.2);
    this.#rightArm.add(gun);

    this.#leftLeg = new THREE.Group();
    this.#rightLeg = new THREE.Group();
    [-1, 1].forEach(side => {
      const leg = side === -1 ? this.#leftLeg : this.#rightLeg;
      leg.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.4, 6), darkMat), { position: new THREE.Vector3(0, -0.2, 0) }));
      leg.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.35, 6), mainMat), { position: new THREE.Vector3(0, -0.55, 0) }));
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.22), darkMat);
      foot.position.set(0, -0.76, -0.03);
      leg.add(foot);
      leg.position.set(side * 0.18, 0.55, 0);
      this.group.add(leg);
    });
  }

  #buildNameLabel() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#' + this.color.toString(16).padStart(6, '0');
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(this.name, 128, 40);
    const texture = new THREE.CanvasTexture(canvas);
    this.#nameSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
    this.#nameSprite.position.y = 2.4;
    this.#nameSprite.scale.set(2, 0.5, 1);
    this.group.add(this.#nameSprite);
  }

  #buildHealthBar() {
    this.#hpBarBg = new THREE.Sprite(
      new THREE.SpriteMaterial({ color: 0x333333, transparent: true, opacity: 0.6 }),
    );
    this.#hpBarBg.position.y = 2.15;
    this.#hpBarBg.scale.set(1, 0.06, 1);
    this.group.add(this.#hpBarBg);

    this.#hpBar = new THREE.Sprite(
      new THREE.SpriteMaterial({ color: 0x44ff44 }),
    );
    this.#hpBar.position.y = 2.15;
    this.#hpBar.scale.set(1, 0.05, 1);
    this.group.add(this.#hpBar);
  }

  setTarget(pos, rotY) {
    this.#targetPos.set(pos.x, 0, pos.z);
    this.#targetRotY = rotY;
  }

  update(dt) {
    this.group.position.lerp(this.#targetPos, Math.min(1, dt * 12));

    let dRot = this.#targetRotY - this.group.rotation.y;
    while (dRot > Math.PI) dRot -= Math.PI * 2;
    while (dRot < -Math.PI) dRot += Math.PI * 2;
    this.group.rotation.y += dRot * Math.min(1, dt * 12);

    const t = performance.now() * 0.005;
    const swing = Math.sin(t * 2) * 0.25;
    this.#leftArm.rotation.x = swing;
    this.#rightArm.rotation.x = -swing;
    this.#leftLeg.rotation.x = -swing * 0.5;
    this.#rightLeg.rotation.x = swing * 0.5;

    const pct = Math.max(0, this.hp / Config.player.maxHP);
    this.#hpBar.scale.x = Math.max(0.01, pct);
    this.#hpBar.position.x = -(1 - pct) * 0.5;
    this.#hpBar.material.color.setHex(pct > 0.5 ? 0x44ff44 : pct > 0.25 ? 0xffcc00 : 0xff4444);
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp <= 0) { this.hp = 0; this.kill(); return true; }
    return false;
  }

  kill()  { this.alive = false; this.group.visible = false; }

  respawn(pos) {
    this.hp = Config.player.maxHP;
    this.alive = true;
    this.group.visible = true;
    this.#targetPos.set(pos.x, 0, pos.z);
    this.group.position.copy(this.#targetPos);
  }

  destroy() {
    this.scene.remove(this.group);
    disposeObject3D(this.group);
    this.group.clear();
  }
}
