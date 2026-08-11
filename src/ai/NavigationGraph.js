import * as THREE from 'three';

/**
 * Small waypoint graph used for interiors and cave routes. A* runs only when
 * a bot needs a new route; per-frame steering remains allocation-free.
 */
export class NavigationGraph {
  #nodes = [];
  #byId = new Map();
  #fromEye = new THREE.Vector3();
  #toEye = new THREE.Vector3();

  constructor(nodeDefinitions = [], physics) {
    this.physics = physics;
    this.#nodes = nodeDefinitions.map(def => ({
      ...def,
      position: new THREE.Vector3(def.x, physics.groundHeightAt(def.x, def.z), def.z),
      neighbors: [],
    }));
    for (const node of this.#nodes) this.#byId.set(node.id, node);
    for (const node of this.#nodes) {
      for (const id of node.links ?? []) {
        const neighbor = this.#byId.get(id);
        if (neighbor && !node.neighbors.includes(neighbor)) node.neighbors.push(neighbor);
      }
    }
  }

  get empty() { return this.#nodes.length === 0; }

  /** Writes the next route waypoint into `out`, returning false if direct. */
  findNextWaypoint(from, target, out) {
    if (this.empty || this.#directPath(from, target)) return false;
    const start = this.#nearestVisibleNode(from);
    const goal = this.#nearestVisibleNode(target);
    if (!start || !goal) return false;
    if (start === goal) { out.copy(goal.position); return true; }

    const open = [start];
    const cameFrom = new Map();
    const gScore = new Map([[start, 0]]);
    const fScore = new Map([[start, start.position.distanceTo(goal.position)]]);

    while (open.length) {
      let bestIndex = 0;
      for (let i = 1; i < open.length; i++) {
        if ((fScore.get(open[i]) ?? Infinity) < (fScore.get(open[bestIndex]) ?? Infinity)) bestIndex = i;
      }
      const current = open.splice(bestIndex, 1)[0];
      if (current === goal) {
        let step = goal;
        while (cameFrom.get(step) && cameFrom.get(step) !== start) step = cameFrom.get(step);
        out.copy(step.position);
        return true;
      }
      for (const neighbor of current.neighbors) {
        const tentative = (gScore.get(current) ?? Infinity) + current.position.distanceTo(neighbor.position);
        if (tentative >= (gScore.get(neighbor) ?? Infinity)) continue;
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentative);
        fScore.set(neighbor, tentative + neighbor.position.distanceTo(goal.position));
        if (!open.includes(neighbor)) open.push(neighbor);
      }
    }
    return false;
  }

  getTaggedPosition(tag, from, out) {
    const candidates = this.#nodes.filter(node => node.tags?.includes(tag));
    if (!candidates.length) return false;
    let best = candidates[0];
    let bestDistance = best.position.distanceToSquared(from);
    for (let i = 1; i < candidates.length; i++) {
      const distance = candidates[i].position.distanceToSquared(from);
      if (distance < bestDistance) { best = candidates[i]; bestDistance = distance; }
    }
    out.copy(best.position);
    return true;
  }

  getRandomPosition(out) {
    if (this.empty) return false;
    out.copy(this.#nodes[Math.floor(Math.random() * this.#nodes.length)].position);
    return true;
  }

  #nearestVisibleNode(position) {
    let best = null;
    let bestDistance = Infinity;
    for (const node of this.#nodes) {
      const distance = node.position.distanceToSquared(position);
      if (distance >= bestDistance || !this.#directPath(position, node.position)) continue;
      best = node;
      bestDistance = distance;
    }
    return best;
  }

  #directPath(from, to) {
    this.#fromEye.set(from.x, this.physics.groundHeightAt(from.x, from.z) + 0.9, from.z);
    this.#toEye.set(to.x, this.physics.groundHeightAt(to.x, to.z) + 0.9, to.z);
    return this.physics.hasLineOfSight(this.#fromEye, this.#toEye);
  }
}
