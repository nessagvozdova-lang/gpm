import test from 'node:test';
import assert from 'node:assert/strict';
import { discountFor, shippingFor, formatMoney, SHIPPING_THRESHOLD, SHIPPING_FEE } from '../lib/format';
test('shipping threshold is applied to merchandise total',()=>{
  assert.equal(shippingFor(SHIPPING_THRESHOLD-1), SHIPPING_FEE);
  assert.equal(shippingFor(SHIPPING_THRESHOLD), 0);
});
test('percent discounts stay in integer minor units',()=>{
  assert.equal(discountFor(19999, 10), 1999);
  assert.equal(discountFor(250000, 100), 250000);
  assert.throws(()=>discountFor(100, -1));
  assert.throws(()=>discountFor(100, 101));
});
test('money display is MDL by default',()=>assert.match(formatMoney(189000),/1,890/));
