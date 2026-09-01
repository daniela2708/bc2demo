export const sellThruBand=(v:number)=>v<.35?'late':v<.5?'watch':v<.7?'pace':'risk';
export const sellThruLabel={late:'Behind',watch:'Watch',pace:'On pace',risk:'Inventory risk'} as const;
