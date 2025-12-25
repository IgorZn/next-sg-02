import React from 'react';
import {getSnippetByID} from "@actions/snippet";
import SnippetCard from "@/components/snippet-card";

async function ViewSnippet(props: { params: { id: string }}) {
    const {id} = await props.params
    const snippet = await getSnippetByID(id)
    console.log(id)
    return (
        <div>
            <h1>View Snippet</h1>
            <div className={'flex flex-col items-center justify-center mt-2'}>
                <SnippetCard snippet={snippet}/>
            </div>
        </div>
    );
}

export default ViewSnippet;