const number=new Intl.NumberFormat('en-US',{maximumFractionDigits:0});
const money=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
const money2=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2});
export const fmt={number:(v:number|null)=>v===null?'–':number.format(v),money:(v:number|null)=>v===null?'–':money.format(v),money2:(v:number)=>money2.format(v),pct:(v:number|null,ratio=true)=>v===null?'–':`${(ratio?v*100:v).toFixed(1)} %`};
