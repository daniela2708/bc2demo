import type {ItemRow,PriceRangeRow,SubcategoryRow} from './domain';
// Scan residual reconciled to FY25: Textiles $5,099 + Melamine $5,100; the scan total includes reconciliation rounding.
export const current:SubcategoryRow[]=[
['Decor',15344,74686,8389,60598,26955],['Serveware',17142,30290,7605,28540,14959],['Novelties',19213,24226,9387,26146,13241],['Drinkware',9840,12314,6035,15891,8469],['Apparel',2376,15420,1328,15258,6639],['Pumpkin carving',12456,24912,3250,14816,8619],['Lighting/pumpkins',3057,11287,1641,11082,5204],['Trick or treat',4359,5351,2080,5643,3128],['Textiles and melamine',5424,10201,1653,6740,3570]
].map(([sub,purchPcs,purchCost,soldPcs,soldRetail,retailGp])=>({sub:String(sub),purchPcs:Number(purchPcs),purchCost:Number(purchCost),soldPcs:Number(soldPcs),soldRetail:Number(soldRetail),retailGp:Number(retailGp)}));
export const previous:SubcategoryRow[]=[
['Decor',10870,56843,6324,51308,22649],['Serveware',9840,15630,4895,14100,7413],['Novelties',16811,21030,9405,29097,15891],['Drinkware',7200,5182,4162,6803,3765],['Apparel',1392,8282,1086,12202,5741],['Pumpkin carving',4608,5321,1938,4919,2683],['Lighting/pumpkins',2982,9080,1828,10384,4851],['Trick or treat',6319,8517,2862,8387,4581],['Textiles and melamine',1584,1283,1225,2264,1271],['Animation',624,3900,88,975,425]
].map(([sub,purchPcs,purchCost,soldPcs,soldRetail,retailGp])=>({sub:String(sub),purchPcs:Number(purchPcs),purchCost:Number(purchCost),soldPcs:Number(soldPcs),soldRetail:Number(soldRetail),retailGp:Number(retailGp)}));
export const priceRanges:PriceRangeRow[]=[['$1',0,null,0,null,0,38.3],['$1–2',30073,53.3,16020,46.3,16.28,42.8],['$2–5',61118,52.3,31952,45,33.09,37.5],['$5–8',29536,47.9,14134,48.6,15.99,38.2],['$8–10',19506,47.9,9338,57.7,10.56,45],['$10–15',32749,45.1,14783,54,17.73,50.1],['$15–20',4477,44,1970,20.6,2.42,40.9],['$20–30',5974,36.5,2179,30.6,3.23,36.1],['>$50',1281,31.8,408,41.2,.69,31.7]].map(([range,soldRetail,margin,profit,sellThru,share,portfolioSellThru])=>({range:String(range),soldRetail:Number(soldRetail),margin:margin===null?null:Number(margin),profit:Number(profit),sellThru:sellThru===null?null:Number(sellThru),share:Number(share),portfolioSellThru:Number(portfolioSellThru)}));
const rawItems=(String.raw`84481|Cute skeleton snake|95|570|1767|512|1710|51.9|3297|6.44
100384|8" black cat on magic books decor|64|512|2417|452|2001|48.4|4134|9.15
100718|Mini bones lizard/bat/spider 3-asst PDQ|95|1710|2377|1447|1571|43.9|3583|2.48
82521|Skeleton hand decor|95|1140|1585|917|983|43.6|2258|2.46
100650|7.5" disco ghosts 2-asst|64|384|1582|306|1216|49.1|2477|8.09
100645|7.5" glass potion bottles 4-asst|64|512|1116|394|869|50.3|1728|4.39
84475|Economy spider|95|380|1649|285|954|43.5|2191|7.69
100386|9.5" skeleton couple in moon decor|64|512|3712|329|1942|44.9|4327|13.15
100443|12.2" witches broom decor 2-asst|64|384|1793|244|942|45.2|2081|8.53
100393|5.25" skeleton on phone decor|64|512|1347|295|675|46.5|1451|4.92
67387|Skeleton skull decor|95|570|2343|308|996|44|2262|7.35
100730|Steer skull|95|285|3634|153|1129|36.7|3080|20.13
101318|8.25" till death do us part decor 2-asst|64|512|2145|268|1040|48.1|2163|8.07
100388|6.5" flocked skull 4-asst|64|512|3139|258|1391|46.8|2972|11.52
100395|7.75" b/o light-up raven|64|512|2550|257|882|40.8|2162|8.41
100755|NBC jack candy bowl|72|864|5072|412|2560|51.4|4979|12.08
100446|7.9" haunted/broom fty decor 2-asst|64|512|1623|225|585|45.1|1298|5.77
100396|7.75" skull w/ spell books decor|64|512|3410|218|1005|40.9|2457|11.27
82513|Life size posable skeleton|51|51|2121|21|408|31.8|1281|61.01
95253|Wreath hanger skeleton hand|95|1140|3010|369|751|43.5|1725|4.67
100405|9" flocked black cat on pumpkin 2-asst|64|512|3983|154|834|41.1|2033|13.2
100449|Colorful sequin pumpkins 3-asst|64|640|2317|169|494|44.7|1106|6.55
100644|8" MDF haunted home/hey ghouls 2-asst|64|384|1133|92|172|38.8|444|4.82`).split('\n').map(x=>x.split('|'));
export const items:ItemRow[]=rawItems.map(([itemNo,description,...n])=>({itemNo,description,cases:+n[0],pcs:+n[1],cost:+n[2],soldPcs:+n[3],retailProfit:+n[4],gpPct:+n[5],soldRetail:+n[6],avgRetail:+n[7]}));
export type Rank={itemNo:string;name:string;value:number|null};
export const customerRank:Rank[]=[['84481','Cute skeleton snake',90],['100384','Black cat on magic books',88],['100718','Mini bones 3-asst',85],['82521','Skeleton hand decor',80],['100650','Disco ghosts',80],['100645','Glass potion bottles',77],['84475','Economy spider',75],['100386','Skeleton couple in moon',64],['100443','Witches broom decor',64],['100393','Skeleton on phone',58]].map(([itemNo,name,value])=>({itemNo:String(itemNo),name:String(name),value:Number(value)}));
export const portfolioRank:Rank[]=[['95255','Mini skeleton butterfly/hummingbird',null],['90899','13.5" donkey skeleton',null],['100718','Mini bones 3-asst',85],['100729','11.5" sitting dog',null],['100723','11" sitting dog',null],['84480','Cute skeleton cat',null],['100384','Black cat on magic books',88],['84481','Cute skeleton snake',90],['90897','14" turtle skeleton',null],['100389','6.25" halloween gnomes',null]].map(([itemNo,name,value])=>({itemNo:String(itemNo),name:String(name),value:value===null?null:Number(value)}));
