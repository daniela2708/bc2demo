import {useState,type FormEvent,type ReactNode} from 'react';

const SESSION_KEY='bc2-report-access';
const DEFAULT_DEMO_PASSWORD='BC2demo';

function hasSessionAccess(){
  try{return sessionStorage.getItem(SESSION_KEY)==='granted'}catch{return false}
}

export function PasswordGate({children}:{children:ReactNode}){
  const [authorized,setAuthorized]=useState(hasSessionAccess);
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const configuredPassword=(import.meta.env.VITE_ACCESS_PASSWORD as string|undefined)||DEFAULT_DEMO_PASSWORD;

  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(password!==configuredPassword){setError('Incorrect password. Please try again.');setPassword('');return}
    try{sessionStorage.setItem(SESSION_KEY,'granted')}catch{ /* Access still works when storage is unavailable. */ }
    setAuthorized(true);setError('');
  };
  const lock=()=>{try{sessionStorage.removeItem(SESSION_KEY)}catch{ /* No stored session to clear. */ }setAuthorized(false);setPassword('')};

  if(authorized)return <><button className="lock-report" onClick={lock} title="Lock report" aria-label="Lock report">⌑ <span>Lock</span></button>{children}</>;
  return <main className="access-page"><section className="access-panel" aria-labelledby="access-title"><div className="access-brand"><img src="/weis-1-logo-svg-vector.svg" alt="Weis Markets"/><span/><img src="/wizelinered.svg" alt="Wizeline"/></div><p className="access-eyebrow">BC2 ANALYTICS · RESTRICTED DEMO</p><h1 id="access-title">Enter the report</h1><p className="access-copy">Use the access password provided by the project owner.</p><form onSubmit={submit}><label htmlFor="report-password">Password</label><input id="report-password" type="password" value={password} onChange={event=>{setPassword(event.target.value);setError('')}} autoComplete="current-password" autoFocus required aria-describedby={error?'password-error':undefined}/>{error?<p className="access-error" id="password-error" role="alert">{error}</p>:null}<button type="submit">Continue</button></form><p className="access-footnote">Authorized viewers only. Access lasts until this browser tab or session is closed.</p></section></main>;
}
