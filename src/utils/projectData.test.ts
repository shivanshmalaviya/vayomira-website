import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_PROJECTS,
  validateAdminPin,
  resetProjects,
  loadProjects
} from './projectData.ts';

test('initial projects contains high quality studio data', () => {
  assert.equal(INITIAL_PROJECTS.length, 5);
  const aethel = INITIAL_PROJECTS[0];
  assert.equal(aethel.title, 'CHRONICLES OF AETHEL');
  assert.ok(aethel.tools.includes('Veo 2'));
  assert.ok(aethel.tools.includes('Unreal Engine 5.5'));
});

test('validateAdminPin verifies PIN 2026', () => {
  assert.equal(validateAdminPin('2026'), true);
  assert.equal(validateAdminPin('  2026 '), true);
  assert.equal(validateAdminPin('0000'), false);
  assert.equal(validateAdminPin('1234'), false);
  assert.equal(validateAdminPin(''), false);
});

test('loadProjects returns INITIAL_PROJECTS when no storage', () => {
  const projects = loadProjects();
  assert.equal(projects.length, 5);
});
