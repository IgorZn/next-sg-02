'use server'

import {prisma} from "../lib/prisma";

type ValuesType = {
    title: string;
    code: string;
}


export async function createSnippet(values: ValuesType) {
    try {
        console.log('Creating snippet:', values);
        const newSnippet = await prisma.snippet.create({
            data: {
                ...values
            }
        })

        console.log('newSnippet>>>', newSnippet)
        return {
            success: true,
            message: 'Snippet created successfully',
            redirectTo: '/'
        };
    } catch (error) {
        console.error('Error creating snippet:', error);
        return {success: false, message: 'Failed to create snippet', redirectTo: ''};
    }
}