import assert from 'node:assert/strict';
import test from 'node:test';
import { formatConversion } from '../entry/src/main/ets/feature/ConversionFormatter.ts';

test('preserves precision for tiny nonzero conversions', () => {
  const inchToKilometer = 0.0002 / 39.3700787402 / 1000;
  assert.equal(formatConversion(inchToKilometer), '5.08e-9');
  assert.equal(formatConversion(1.23456789e-5), '1.23456789e-5');
  assert.equal(formatConversion(1e-9), '1e-9');
  assert.equal(formatConversion(-1e-100), '-1e-100');
});

test('formats representative large values', () => {
  assert.equal(formatConversion(1e14), '1e+14');
  assert.equal(formatConversion(-1e13), '-1e+13');
  assert.equal(formatConversion(12345678901234), '12345678901234');
});

test('keeps representative normal and zero results readable', () => {
  assert.equal(formatConversion(0), '0');
  assert.equal(formatConversion(12.3456789), '12.3456789');
  assert.equal(formatConversion(1 / 3), '0.33333333');
  assert.equal(formatConversion(0.000123456789), '0.00012346');
});

test('limits finite output width', () => {
  for (const value of [5.08e-9, 12345678901234, -12345678901234, 1e-100, -1e308]) {
    assert.ok(formatConversion(value).length <= 14);
  }
});
