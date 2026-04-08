import * as THREE from 'three';
import { Config } from '../Config.js';

/**
 * Enemy — visual mech-soldier model, health, and animation state.
 * AI decision-making is delegated to EnemyAI (Strategy pattern).
 */
export class Enemy {
  group = new THREE.Group();
  hp;
  alive = true;

  // Animatable sub-parts (exposed so EnemyAI animation can reference them)
  body;
  head;
  leftArm;
  rightArm;
  leftLeg;
  rightLeg;
  #chestGlow;
  #eyeGlow;
  #auraLight;

  constructor(scene) {
    this.scene = scene;
    this.hp = Config.enemy.maxHP;
    this.#build();
    this.group.position.set(20, 0, -20);
    scene.add(this.group);
  }

  get position() { return this.group.position; }

  // ── Public API ────────────────────────────────────────────

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp < 0) this.hp = 0;
    return this.hp <= 0;
  }

  kill() {
    this.alive = false;
    this.group.visible = false;
  }

  spawn(pos, maxHP) {
    this.hp = maxHP;
    this.alive = true;
    this.group.visible = true;
    this.position.copy(pos);
  }

  updateAnimation(now) {
    const t = now * 0.005;
    const bob = Math.sin(t) * 0.05;
    this.body.position.y = 1.05 + bob;
    this.head.position.y = 1.85 + bob;

    const swing = Math.sin(t * 2) * 0.3;
    this.leftArm.rotation.x  =  swing;
    this.rightArm.rotation.x = -swing;
    this.leftLeg.rotation.x  = -swing * 0.6;
    this.rightLeg.rotation.x =  swing * 0.6;

    this.#chestGlow.intensity = 2 + Math.sin(t * 3) * 1.5;
    this.#eyeGlow.intensity   = 2 + Math.sin(t * 4) * 2;
    this.#auraLight.intensity = 1.5 + Math.sin(t * 2) * 0.8;
  }

  // ── Model construction ────────────────────────────────────

  #build() {
    const darkMetal   = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.3, metalness: 0.9 });
    const armorMat    = new THREE.MeshStandardMaterial({ color: 0x2a0808, roughness: 0.4, metalness: 0.7 });
    const glowRed     = new THREE.MeshBasicMaterial({ color: 0xff2200 });
    const glowOrange  = new THREE.MeshBasicMaterial({ color: 0xff6600 });

    this.#buildTorso(armorMat, darkMetal, glowRed);
    this.#buildHead(darkMetal, armorMat, glowRed);
    this.#buildShoulders(armorMat, darkMetal);
    this.#buildArms(darkMetal, armorMat, glowOrange);
    this.#buildLegs(darkMetal, armorMat);
    this.#buildBack(darkMetal, armorMat, glowOrange);

    this.#auraLight = new THREE.PointLight(0xff3300, 2, 8);
    this.#auraLight.position.set(0, 1.2, 0);
    this.group.add(this.#auraLight);
  }

  #buildTorso(armorMat, darkMetal, glowRed) {
    this.body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.1, 0.6), armorMat);
    this.body.position.y = 1.05;
    this.body.castShadow = true;
    this.group.add(this.body);

    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.12), darkMetal);
    chest.position.set(0, 1.15, -0.32);
    this.group.add(chest);

    const core = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), glowRed);
    core.position.set(0, 1.1, -0.38);
    this.group.add(core);

    this.#chestGlow = new THREE.PointLight(0xff2200, 3, 4);
    this.#chestGlow.position.copy(core.position);
    this.group.add(this.#chestGlow);

    const waist = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.42, 0.25, 8), darkMetal);
    waist.position.y = 0.52;
    waist.castShadow = true;
    this.group.add(waist);
  }

  #buildHead(darkMetal, armorMat, glowRed) {
    this.head = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.42, 0.5), darkMetal);
    this.head.position.y = 1.85;
    this.head.castShadow = true;
    this.group.add(this.head);

    const crest = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.5), armorMat);
    crest.position.set(0, 2.1, 0);
    this.group.add(crest);

    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.06), glowRed);
    visor.position.set(0, 1.88, -0.26);
    this.group.add(visor);

    this.#eyeGlow = new THREE.PointLight(0xff2200, 4, 5);
    this.#eyeGlow.position.set(0, 1.88, -0.3);
    this.group.add(this.#eyeGlow);

    [-0.1, 0.1].forEach(x => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff4400 }));
      eye.position.set(x, 1.88, -0.28);
      this.group.add(eye);
    });

    const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.12, 0.15), armorMat);
    jaw.position.set(0, 1.68, -0.18);
    this.group.add(jaw);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.2, 6), darkMetal);
    neck.position.y = 1.6;
    this.group.add(neck);
  }

  #buildShoulders(armorMat, darkMetal) {
    [-1, 1].forEach(side => {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.2, 0.4), armorMat);
      pad.position.set(side * 0.6, 1.5, 0);
      pad.castShadow = true;
      this.group.add(pad);

      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.25, 5), darkMetal);
      spike.position.set(side * 0.65, 1.65, 0);
      this.group.add(spike);
    });
  }

  #buildArms(darkMetal, armorMat, glowOrange) {
    this.leftArm  = new THREE.Group();
    this.rightArm = new THREE.Group();

    [-1, 1].forEach(side => {
      const arm = side === -1 ? this.leftArm : this.rightArm;
      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.5, 6), darkMetal);
      upper.position.set(0, -0.25, 0); upper.castShadow = true;
      arm.add(upper);

      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), armorMat);
      elbow.position.set(0, -0.5, 0);
      arm.add(elbow);

      const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.45, 6), darkMetal);
      fore.position.set(0, -0.75, 0); fore.castShadow = true;
      arm.add(fore);

      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.1, 0.12), armorMat);
      hand.position.set(0, -1.0, 0);
      arm.add(hand);

      for (let f = -1; f <= 1; f++) {
        const claw = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.15, 4), glowOrange);
        claw.position.set(f * 0.05, -1.12, -0.04);
        claw.rotation.x = 0.3;
        arm.add(claw);
      }

      arm.position.set(side * 0.6, 1.35, 0);
      this.group.add(arm);
    });

    // Gun on right arm
    const gun = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.5), darkMetal);
    gun.position.set(0, -0.85, -0.28);
    this.rightArm.add(gun);

    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.04, 0.3, 6),
      new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.95, roughness: 0.1 }),
    );
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, -0.85, -0.58);
    this.rightArm.add(barrel);

    const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), glowOrange);
    muzzle.position.set(0, -0.85, -0.72);
    this.rightArm.add(muzzle);
  }

  #buildLegs(darkMetal, armorMat) {
    this.leftLeg  = new THREE.Group();
    this.rightLeg = new THREE.Group();

    [-1, 1].forEach(side => {
      const leg = side === -1 ? this.leftLeg : this.rightLeg;

      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.45, 6), darkMetal);
      upper.position.y = -0.22; upper.castShadow = true;
      leg.add(upper);

      const knee = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), armorMat);
      knee.position.y = -0.45;
      leg.add(knee);

      const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.4, 6), darkMetal);
      lower.position.y = -0.68; lower.castShadow = true;
      leg.add(lower);

      const shin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.3, 0.15), armorMat);
      shin.position.set(0, -0.65, -0.1);
      leg.add(shin);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.28), darkMetal);
      foot.position.set(0, -0.92, -0.04); foot.castShadow = true;
      leg.add(foot);

      leg.position.set(side * 0.22, 0.52, 0);
      this.group.add(leg);
    });
  }

  #buildBack(darkMetal, armorMat, glowOrange) {
    [-0.2, 0.2].forEach(x => {
      const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.3, 6), darkMetal);
      exhaust.position.set(x, 1.25, 0.32);
      this.group.add(exhaust);

      const glow = new THREE.Mesh(new THREE.CircleGeometry(0.07, 6), glowOrange);
      glow.position.set(x, 1.25, 0.47);
      this.group.add(glow);
    });

    for (let i = 0; i < 4; i++) {
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.1), armorMat);
      spine.position.set(0, 0.7 + i * 0.28, 0.3);
      this.group.add(spine);
    }
  }
}
