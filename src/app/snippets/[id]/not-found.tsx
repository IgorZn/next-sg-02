import React from 'react';

function SnippetNotFound() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-6xl font-medium bg-orange-600/50 p-4 rounded mx-4">404</div>
            <div className="text-2xl font-bold bg-slate-300 p-4 rounded w-1/2 text-center">Snippet not found</div>
        </div>
    );
}

export default SnippetNotFound;