import React from 'react';
import SnippetForm from "@/components/snippet-form";
import { createSnippet } from '@/../actions/snippet'

function SnippetNew() {
    return (
        <div>
            <h1>New Snippet</h1>
            <SnippetForm createSnippet={createSnippet}/>
        </div>
    );
}

export default SnippetNew;