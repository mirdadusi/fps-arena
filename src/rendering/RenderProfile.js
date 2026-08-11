/** Detect an iPad even when Safari requests its desktop (Macintosh) site. */
export function isAppleTouchDevice({ userAgent = '', platform = '', maxTouchPoints = 0 } = {}) {
  return /iPad|iPhone|iPod/i.test(userAgent) ||
    (platform === 'MacIntel' && maxTouchPoints > 1);
}

/**
 * Choose conservative defaults before WebGL allocates its first framebuffer.
 * Adaptive quality may reduce the ratio later, but starting small avoids the
 * large allocation spike that can lose Safari's WebGL context on an iPad.
 */
export function createRenderProfile({
  userAgent = globalThis.navigator?.userAgent || '',
  platform = globalThis.navigator?.platform || '',
  maxTouchPoints = globalThis.navigator?.maxTouchPoints || 0,
  hardwareConcurrency = globalThis.navigator?.hardwareConcurrency || 8,
  deviceMemory = globalThis.navigator?.deviceMemory || 8,
  devicePixelRatio = globalThis.window?.devicePixelRatio || 1,
  coarsePointer = globalThis.window?.matchMedia?.('(pointer: coarse)').matches || false,
} = {}) {
  const appleTouch = isAppleTouchDevice({ userAgent, platform, maxTouchPoints });
  const constrained = appleTouch || coarsePointer || hardwareConcurrency <= 4 || deviceMemory <= 4;
  const ratioCap = constrained ? (appleTouch ? 0.85 : 1) : 1.5;

  return Object.freeze({
    appleTouch,
    constrained,
    antialias: !constrained,
    precision: constrained ? 'mediump' : 'highp',
    shadows: !constrained,
    pixelRatio: Math.min(devicePixelRatio, ratioCap),
    maxPixelRatio: Math.min(devicePixelRatio, ratioCap),
    minPixelRatio: appleTouch ? 0.58 : constrained ? 0.65 : 0.72,
    allowQualityIncrease: !constrained,
    aiInterval: constrained ? 1 / 30 : 0,
  });
}
