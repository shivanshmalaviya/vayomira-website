import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp,
  lerp,
  calculateFrameIndex,
  calculateLogoFlyThrough,
  calculatePhilosophyReveal,
  calculateFounderIntroTransform
} from './scrollMath.ts';

test('clamp restricts values to min and max', () => {
  assert.equal(clamp(0.5, 0, 1), 0.5);
  assert.equal(clamp(-0.2, 0, 1), 0);
  assert.equal(clamp(1.5, 0, 1), 1);
});

test('lerp calculates linear interpolation', () => {
  assert.equal(lerp(10, 20, 0), 10);
  assert.equal(lerp(10, 20, 1), 20);
  assert.equal(lerp(10, 20, 0.5), 15);
});

test('calculateFrameIndex maps scroll progress correctly to 1..169', () => {
  assert.equal(calculateFrameIndex(0, 169), 1);
  assert.equal(calculateFrameIndex(1, 169), 169);
  assert.equal(calculateFrameIndex(0.5, 169), 85);
  assert.equal(calculateFrameIndex(-0.1, 169), 1);
  assert.equal(calculateFrameIndex(1.2, 169), 169);
  // Default argument test
  assert.equal(calculateFrameIndex(0), 1);
  assert.equal(calculateFrameIndex(1), 169);
});

test('calculateLogoFlyThrough behaves according to specs', () => {
  // At scroll = 0%: scale = 1, opacity = 1
  const start = calculateLogoFlyThrough(0);
  assert.equal(start.scale, 1);
  assert.equal(start.opacity, 1);
  assert.equal(start.visible, true);

  // At or above 45%: scaled up, invisible
  const end = calculateLogoFlyThrough(0.45);
  assert.equal(end.scale, 3.5);
  assert.equal(end.opacity, 0);
  assert.equal(end.visible, false);

  // At intermediate point: scale > 1 and opacity < 1
  const mid = calculateLogoFlyThrough(0.2);
  assert.ok(mid.scale > 1 && mid.scale < 3.5);
  assert.ok(mid.opacity > 0 && mid.opacity < 1);
  assert.equal(mid.visible, true);
});

test('calculatePhilosophyReveal reveals between 48% and 85%', () => {
  const before = calculatePhilosophyReveal(0.4);
  assert.equal(before.visible, false);
  assert.equal(before.opacity, 0);

  const during = calculatePhilosophyReveal(0.7);
  assert.ok(during.opacity > 0 && during.opacity < 1);
  assert.equal(during.visible, true);

  const atEnd = calculatePhilosophyReveal(0.85);
  assert.equal(atEnd.opacity, 1);
  assert.equal(atEnd.visible, true);
});

test('calculateFounderIntroTransform zooms out and settles into badge', () => {
  const intro = calculateFounderIntroTransform(0);
  assert.equal(intro.scale, 1.8);
  assert.equal(intro.translateX, 0);
  assert.equal(intro.isBadgePosition, false);

  const settled = calculateFounderIntroTransform(1);
  assert.equal(settled.scale, 0.55);
  assert.equal(settled.isBadgePosition, true);
});
