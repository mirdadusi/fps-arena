import * as THREE from 'three';
import { Config } from '../Config.js';
import { EnemyModelAssets } from './EnemyModelAssets.js';

/**
 * Enemy — a shared-resource tactical combat robot. AI decision-making stays in
 * EnemyAI; this class owns only health, scene presence and lightweight motion.
 */
export class Enemy {
  group = new THREE.Group();
  hp;
  alive = true;

  body;
  head;
  leftArm;
  rightArm;
  leftLeg;
  rightLeg;

  #assets;
  #ownsAssets;
  #core;
  #destroyed = false;

  constructor(scene, portraitTexture = null, assets = null) {
    this.scene = scene;
    this.#assets = assets || new EnemyModelAssets(portraitTexture);
    this.#ownsAssets = !assets;
    this.hp = Config.enemy.maxHP;
    this.group.name = 'sentinel-bot';
    this.#build();
    this.group.position.set(20, 0, -20);
    scene.add(this.group);
  }

  get position() { return this.group.position; }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
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
    const bob = Math.sin(t) * 0.035;
    this.body.position.y = 1.15 + bob;
    this.head.position.y = 1.88 + bob * 0.7;

    const swing = Math.sin(t * 2) * 0.27;
    this.leftArm.rotation.x = swing;
    this.rightArm.rotation.x = -swing * 0.45;
    this.leftLeg.rotation.x = -swing * 0.62;
    this.rightLeg.rotation.x = swing * 0.62;
    const pulse = 1 + Math.sin(t * 3) * 0.16;
    this.#core.scale.setScalar(pulse);
  }

  #mesh(geometry, material, parent, position, rotation = null, scale = null, castShadow = false) {
    const mesh = new THREE.Mesh(this.#assets.geometries[geometry], this.#assets.materials[material]);
    mesh.position.set(...position);
    if (rotation) mesh.rotation.set(...rotation);
    if (scale) mesh.scale.set(...scale);
    mesh.castShadow = castShadow;
    mesh.receiveShadow = castShadow;
    parent.add(mesh);
    return mesh;
  }

  #build() {
    const root = this.group;

    // Armoured torso with a strong readable silhouette and layered plating.
    this.body = new THREE.Group();
    this.body.position.y = 1.15;
    root.add(this.body);
    this.#mesh('torso', 'armorDark', this.body, [0, 0, 0], null, null, true);
    this.#mesh('chestPlate', 'armor', this.body, [0, 0.08, -0.32], [-0.1, 0, 0], null, true);
    this.#mesh('abdomen', 'frame', this.body, [0, -0.48, 0], null, null, true);
    this.#mesh('pelvis', 'armorDark', root, [0, 0.55, 0], null, null, true);
    this.#core = this.#mesh('core', 'glow', this.body, [0, 0.04, -0.405]);

    // Helmet keeps the uploaded portrait option, framed as a tactical display.
    this.#mesh('neck', 'frame', root, [0, 1.59, 0]);
    this.head = new THREE.Group();
    this.head.position.y = 1.88;
    root.add(this.head);
    this.#mesh('helmet', 'armorDark', this.head, [0, 0, 0], null, null, true);
    this.#mesh('crest', 'accent', this.head, [0, 0.25, 0.02]);
    this.#mesh('facePlate', 'frame', this.head, [0, -0.03, -0.285], null, [1.06, 1.2, 0.5]);
    if (this.#assets.materials.portrait) {
      this.#mesh('portrait', 'portrait', this.head, [0, -0.03, -0.329], [0, Math.PI, 0]);
    } else {
      this.#mesh('facePlate', 'visor', this.head, [0, -0.03, -0.311], null, [0.88, 0.72, 0.25]);
    }

    // Segmented limbs share the same small geometry set across all bots.
    this.leftArm = new THREE.Group();
    this.rightArm = new THREE.Group();
    for (const side of [-1, 1]) {
      const arm = side < 0 ? this.leftArm : this.rightArm;
      arm.position.set(side * 0.55, 1.43, 0);
      this.#mesh('shoulder', side < 0 ? 'armor' : 'accent', arm, [0, 0, 0], null, [1, 1, 1], true);
      this.#mesh('limb', 'frame', arm, [0, -0.29, 0], [0, 0, side * 0.04], null, true);
      this.#mesh('limb', 'armorDark', arm, [0, -0.73, 0], null, [0.92, 0.92, 0.92], true);
      root.add(arm);
    }

    // A compact, multi-part rifle reads much more clearly than the old stick.
    this.#mesh('rifle', 'weapon', this.rightArm, [0, -0.77, -0.37], [-0.08, 0, 0], null, true);
    this.#mesh('barrel', 'weapon', this.rightArm, [0, -0.73, -0.87], [Math.PI / 2, 0, 0]);
    this.#mesh('optic', 'trim', this.rightArm, [0, -0.63, -0.44]);

    this.leftLeg = new THREE.Group();
    this.rightLeg = new THREE.Group();
    for (const side of [-1, 1]) {
      const leg = side < 0 ? this.leftLeg : this.rightLeg;
      leg.position.set(side * 0.22, 0.55, 0);
      this.#mesh('limb', 'frame', leg, [0, -0.22, 0], null, [1.18, 1.12, 1.18], true);
      this.#mesh('shin', side < 0 ? 'armor' : 'accent', leg, [0, -0.68, -0.055], [-0.05, 0, 0], null, true);
      this.#mesh('boot', 'frame', leg, [0, -0.91, -0.075], null, null, true);
      root.add(leg);
    }

    this.#mesh('backpack', 'frame', root, [0, 1.23, 0.38], null, null, true);
    for (const x of [-0.16, 0.16]) {
      this.#mesh('exhaust', 'weapon', root, [x, 1.18, 0.54], [Math.PI / 2, 0, 0]);
    }
  }

  destroy() {
    if (this.#destroyed) return;
    this.#destroyed = true;
    this.scene.remove(this.group);
    this.group.clear();
    if (this.#ownsAssets) this.#assets.dispose();
  }
}
