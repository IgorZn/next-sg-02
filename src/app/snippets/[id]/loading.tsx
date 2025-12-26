'use client'
import React from 'react';
import * as Spinners from "react-spinners";

function SnippetLoading() {
    return (
        <div className={'flex flx-col items-center justify-center h-screen'}>
            <Spinners.PacmanLoader
                color="#36d7b7"
                aria-label="Loading Spinner"
                data-testid="loader"
                size={50}
            />
        </div>
    );
}

export default SnippetLoading;