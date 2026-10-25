import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { makeRecipe } from './recipe.mjs';

const { versions } = JSON.parse(fs.readFileSync(new URL('./versions.json', import.meta.url), 'utf8'));

test('each locked candidate has five self-contained cases and a real versioned product root', () => {
  for (const version of versions) {
    const recipe = makeRecipe(version.candidate);
    assert.equal(recipe.examples.length, 5);
    assert.deepEqual(recipe.stages.map(({ id }) => id), ['ubuntu', 'sdkman', 'jdk']);
    assert.equal(recipe.productRoots[0], `/root/.sdkman/candidates/java/${version.candidate}`);
    assert.equal(recipe.commandRoots[0], `${recipe.productRoots[0]}/bin`);
    assert.equal(JSON.stringify(recipe).includes('"/work'), false);
    assert.equal(recipe.examples.every((example) => example.steps.every((step) => step.cwd === '/capture/work')), true);
    assert.equal(recipe.prepare.includes('mkdir -p /capture/work'), true);
  }
});

test('Java 8 uses supported version/jar options and does not expect Java 9 modules', () => {
  const recipe = makeRecipe('8.0.492-tem');
  const version = recipe.examples.find(({ id }) => id === 'version');
  assert.deepEqual(version.steps[0].argv, ['java', '-version']);
  assert.equal(version.steps[1].assertions[1].stream, 'stderr');
  assert.equal(version.steps[0].assertions[1].value, '1.8.0_492');
  assert.deepEqual(recipe.examples.find(({ id }) => id === 'jar').steps[1].argv, ['jar', 'tf', '/capture/work/main.jar']);
  assert.equal(recipe.examples.find(({ id }) => id === 'jdeps').steps[1].assertions[1].value, 'java.lang');
});

test('current JDK assertions distinguish stdout and stderr and expect module output', () => {
  const recipe = makeRecipe('25.0.3-tem');
  const [java, javac] = recipe.examples[0].steps;
  assert.equal(java.assertions[1].stream, 'stderr');
  assert.equal(javac.assertions[1].stream, 'stdout');
  assert.equal(recipe.examples.find(({ id }) => id === 'jdeps').steps[1].assertions[1].value, 'java.base');
});

test('floating aliases and unknown candidates fail before a build starts', () => {
  for (const candidate of ['25', '25-tem', 'latest', 'not-a-version']) {
    assert.throws(() => makeRecipe(candidate), /Unknown locked SDKMAN candidate/);
  }
});
