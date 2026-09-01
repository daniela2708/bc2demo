import {describe,expect,it} from 'vitest';import {reconstructWeekly,weeklySpecs} from './weekly';
describe('weekly reconstruction',()=>{it('starts at zero and ends at observed values',()=>{const x=reconstructWeekly();for(const s of weeklySpecs){expect(x[0][s.sub]).toBeCloseTo(0,8);expect(x[15][s.sub]).toBeCloseTo(s.final,8)}})});
