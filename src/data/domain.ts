export type SubcategoryRow={sub:string;purchPcs:number;purchCost:number;soldPcs:number;soldRetail:number;retailGp:number};
export type DerivedRow=SubcategoryRow&{sellThru:number;gpPct:number;avgRetail:number;unitCost:number;remaining:number};
export type PriceRangeRow={range:string;soldRetail:number;margin:number|null;profit:number;sellThru:number|null;share:number;portfolioSellThru:number};
export type ItemRow={itemNo:string;description:string;cases:number;pcs:number;cost:number;soldPcs:number;retailProfit:number;gpPct:number;soldRetail:number;avgRetail:number};
