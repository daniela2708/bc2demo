import type {SubcategoryRow} from '../data/domain';
import {current} from '../data/season';
export type ProjectionInput={remainingPctSold:number;markdown1:number;secondRemainingPctSold:number;markdown2:number;included:Set<string>};
export type ProjectionRow={sub:string;p1Pcs:number;p1Revenue:number;p1Gp:number;p2Pcs:number;p2Revenue:number;p2Gp:number};
// Full-price remaining inventory is valued at $4.4881 per piece. Sold units skew cheaper, so this dataset-derived calibration adjusts their remaining-weighted average retail.
const remainingWeightedRetail=current.reduce((s,r)=>s+(r.purchPcs-r.soldPcs)*(r.soldRetail/r.soldPcs),0)/current.reduce((s,r)=>s+r.purchPcs-r.soldPcs,0);
export const CALIBRATION=4.4881/remainingWeightedRetail;
export function project(rows:SubcategoryRow[],i:ProjectionInput){
 const breakdown:ProjectionRow[]=rows.map(r=>{const remaining=r.purchPcs-r.soldPcs,unitCost=r.purchCost/r.purchPcs,unitRetail=(r.soldRetail/r.soldPcs)*CALIBRATION,on=i.included.has(r.sub),p1Pcs=on?remaining*i.remainingPctSold:0,p2Pcs=on?(remaining-p1Pcs)*i.secondRemainingPctSold:0,p1Revenue=p1Pcs*unitRetail*(1-i.markdown1),p2Revenue=p2Pcs*unitRetail*(1-i.markdown2);return{sub:r.sub,p1Pcs,p1Revenue,p1Gp:p1Revenue-p1Pcs*unitCost,p2Pcs,p2Revenue,p2Gp:p2Revenue-p2Pcs*unitCost}});
 const sum=(k:keyof ProjectionRow)=>breakdown.reduce((s,r)=>s+(typeof r[k]==='number'?r[k] as number:0),0),p1Revenue=sum('p1Revenue'),p1Gp=sum('p1Gp'),p2Revenue=sum('p2Revenue'),p2Gp=sum('p2Gp'),soldRetail=rows.reduce((s,r)=>s+r.soldRetail,0),soldGp=rows.reduce((s,r)=>s+r.retailGp,0),purch=rows.reduce((s,r)=>s+r.purchPcs,0),sold=rows.reduce((s,r)=>s+r.soldPcs,0);
 return{breakdown,p1:{pcs:sum('p1Pcs'),revenue:p1Revenue,gp:p1Gp,margin:p1Revenue?p1Gp/p1Revenue:0},p2:{pcs:sum('p2Pcs'),revenue:p2Revenue,gp:p2Gp,margin:p2Revenue?p2Gp/p2Revenue:0},projectedRetail:p1Revenue+p2Revenue,projectedGp:p1Gp+p2Gp,totalRetail:soldRetail+p1Revenue+p2Revenue,totalGp:soldGp+p1Gp+p2Gp,totalMargin:(soldGp+p1Gp+p2Gp)/(soldRetail+p1Revenue+p2Revenue),closingSellThru:(sold+sum('p1Pcs')+sum('p2Pcs'))/purch};
}
