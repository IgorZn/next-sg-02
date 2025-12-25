import React from 'react';
import {getSnippets} from "@actions/snippet";
import SnippetCard from "@/components/snippet-card";

async function SnippetsPage() {
    const snippets = await getSnippets();
    return (
        <div>
            <div className={'flex flex-col gap-2 items-center justify-center mt-2'}>
                {snippets.map((snippet) => (
                    <SnippetCard key={snippet.id} snippet={snippet}/>
                ))}

            </div>
        </div>
    )
        ;
}

export default SnippetsPage;