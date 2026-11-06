'use client';
export default function Error({reset}:{error:Error&{digest?:string};reset:()=>void}){return <main className="container page-section"><div className="empty-state"><h1>Something went <em>off course.</em></h1><p>We couldn’t load this part of the store. Please try again.</p><button className="btn btn-primary" onClick={reset}>Try again</button></div></main>}
