import {useState} from 'react';
import {current,previous} from '../data/season';
import {VisualCard} from '../components/VisualCard';
import {Legend} from '../components/Legend';
import {MatrixTable,metricOptions} from '../visuals/MatrixTable';

type DateWindow={start:string;end:string};
const currentBounds={min:'2025-06-30',max:'2025-10-19'};
const previousBounds={min:'2024-07-01',max:'2024-10-20'};

export function MatrixPage({onDrill}:{onDrill:()=>void}){
  const [visible,setVisible]=useState(metricOptions.map(x=>x.k));
  const [compare,setCompare]=useState(false);
  const [included,setIncluded]=useState(true);
  const [currentRange,setCurrentRange]=useState<DateWindow>({start:currentBounds.min,end:currentBounds.max});
  const [previousRange,setPreviousRange]=useState<DateWindow>({start:previousBounds.min,end:previousBounds.max});
  const currentRows=included?current:[];
  const previousRows=included?previous:[];

  return <div className="page-grid matrix-page"><aside className="slicers"><CategorySlicer included={included} setIncluded={setIncluded}/><DateRangeSlicer title="Current Date Range" bounds={currentBounds} value={currentRange} onChange={setCurrentRange}/><DateRangeSlicer title="Previous Date Range" bounds={previousBounds} value={previousRange} onChange={setPreviousRange}/><div className="slicer"><strong>Visible metrics</strong>{metricOptions.map(m=><label key={m.k}><input type="checkbox" checked={visible.includes(m.k)} onChange={()=>setVisible(v=>v.includes(m.k)?v.filter(x=>x!==m.k):[...v,m.k])}/>{m.l}</label>)}</div></aside><main><div className="page-heading"><div><span className="eyebrow">HALLOWEEN · SELL-THROUGH</span><h1>Scan Data Matrix</h1></div><button className={`compare ${compare?'active':''}`} onClick={()=>setCompare(x=>!x)}>Compared</button></div><Legend/><p className="date-disclosure">Date controls update the displayed analysis window. Values remain season aggregates because the supplied source does not contain daily facts.</p>{compare?<VisualCard title={`Current ${displayDateRange(currentRange)} vs Previous ${displayDateRange(previousRange)} · Δ Sell Through`}><MatrixTable rows={currentRows} visible={visible}/><p className="note">Compared view active: Current 46.4 % vs Previous 54.3 % · Δ −7.9 pp</p></VisualCard>:<><VisualCard title={`Current · ${displayDateRange(currentRange)}`}><MatrixTable rows={currentRows} visible={visible} onDecor={onDrill}/></VisualCard><VisualCard title={`Previous · ${displayDateRange(previousRange)}`}><MatrixTable rows={previousRows} visible={visible}/></VisualCard></>}</main></div>;
}

function CategorySlicer({included,setIncluded}:{included:boolean;setIncluded:(value:boolean)=>void}){return <div className="slicer"><strong>Category</strong><label><input type="checkbox" checked={included} onChange={event=>setIncluded(event.target.checked)}/> Select all</label><label><input type="checkbox" checked={included} onChange={event=>setIncluded(event.target.checked)}/> ⊟ Seasonal</label><label className="indent"><input type="checkbox" checked={included} onChange={event=>setIncluded(event.target.checked)}/> Halloween</label></div>}

function DateRangeSlicer({title,bounds,value,onChange}:{title:string;bounds:{min:string;max:string};value:DateWindow;onChange:(value:DateWindow)=>void}){
  const min=toDay(bounds.min),max=toDay(bounds.max),start=toDay(value.start),end=toDay(value.end),span=max-min;
  const track={background:`linear-gradient(to right,#d8d8d8 0%,#d8d8d8 ${((start-min)/span)*100}%,#118DFF ${((start-min)/span)*100}%,#118DFF ${((end-min)/span)*100}%,#d8d8d8 ${((end-min)/span)*100}%,#d8d8d8 100%)`};
  const setStart=(day:number)=>onChange({start:fromDay(Math.min(day,end)),end:value.end});
  const setEnd=(day:number)=>onChange({start:value.start,end:fromDay(Math.max(day,start))});
  return <fieldset className="slicer date-slicer"><legend>{title}</legend><div className="date-fields"><label>From<input type="date" min={bounds.min} max={value.end} value={value.start} onChange={event=>setStart(toDay(event.target.value))}/></label><label>To<input type="date" min={value.start} max={bounds.max} value={value.end} onChange={event=>setEnd(toDay(event.target.value))}/></label></div><div className="dual-range" style={track}><input aria-label={`${title} start`} type="range" min={min} max={max} value={start} onChange={event=>setStart(Number(event.target.value))}/><input aria-label={`${title} end`} type="range" min={min} max={max} value={end} onChange={event=>setEnd(Number(event.target.value))}/></div><output>{displayDateRange(value)}</output></fieldset>;
}

const toDay=(date:string)=>Math.floor(new Date(`${date}T00:00:00Z`).getTime()/86400000);
const fromDay=(day:number)=>new Date(day*86400000).toISOString().slice(0,10);
const displayDateRange=({start,end}:DateWindow)=>`${formatDate(start)}–${formatDate(end)}`;
const formatDate=(date:string)=>{const [year,month,day]=date.split('-');return `${month}/${day}/${year}`};
