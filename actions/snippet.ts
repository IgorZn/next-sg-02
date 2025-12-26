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
            redirectTo: '/snippets'
        };
    } catch (error) {
        console.error('Error creating snippet:', error);
        return {success: false, message: 'Failed to create snippet', redirectTo: ''};
    }
}

export async function getSnippets() {
    try {
        return await prisma.snippet.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    } catch (error) {
        console.error('Error fetching snippets:', error)
        return []
    }

}

export async function getSnippetByID(id: string) {
    try {
        return await prisma.snippet.findUnique({
            where: {
                id
            }
        })
    } catch (error) {
        console.error('Error fetching snippet by ID:', error)
        return null
    }
}

export async function updateSnippet(id: string, values: ValuesType) {
    try {
        const result = await prisma.snippet.update({
            where: {
                id
            },
            data: {
                ...values
            }
        })
        return {
            success: true,
            message: 'Snippet created successfully',
            redirectTo: '/snippets',
            data: result
        };


    } catch (error) {
        console.error('Error updating snippet:', error)
        return null
    }

}