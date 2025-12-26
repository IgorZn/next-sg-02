import React from 'react';
import {createSnippet, getSnippetByID} from "@actions/snippet";
import SnippetForm from "@/components/snippet-form";
import {notFound} from "next/navigation";

async function EditSnippet(props: { params: { id: string } }) {
    const {id} = await props.params
    const snippet = await getSnippetByID(id)
    if (!snippet) return notFound()
    return (
        <div>
            <div>Edit Snippet</div>
            <div className={'flex flex-col items-center justify-center mt-2 max-w-2/4 mx-auto'}>
                <div className={'w-full'}>
                    <SnippetForm createSnippet={createSnippet} snippet={snippet} isEditMode={true}/>
                </div>
            </div>
        </div>
    );
}

export default EditSnippet;