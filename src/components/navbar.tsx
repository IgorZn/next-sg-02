import React from 'react';
import Link from "next/link";

function Navbar() {
    return (
        <div className={'flex flex-row bg-slate-200 p-2'}>
            <div className={'basis-1/3 mx-2'}><Link href={'/'}>Home</Link></div>
            <div className={'basis-2/2'}>
                <div className={'flex flex-row mx-2 space-x-2'}>
                    <div><Link href={'/snippets'}>Snippets</Link></div>
                    <div><Link href={'/snippets/new'}>New Snippet</Link></div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;