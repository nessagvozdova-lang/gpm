import Link from 'next/link';
export default function NotFound(){return <main className="container page-section"><div className="empty-state"><span className="eyebrow">404 / THE PATH NOT TAKEN</span><h1>Not all roads <em>lead here.</em></h1><p>This page seems to have taken a different journey.</p><Link href="/" className="btn btn-primary">Return home</Link></div></main>}
