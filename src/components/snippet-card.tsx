'use client'
import {
    Card,
    CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import React, {startTransition} from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Snippet} from "../../generated/prisma/client";
import {notFound} from "next/navigation";
import {usePathname} from 'next/navigation';
import {updateSnippet} from "@actions/snippet";

interface SnippetCardProps {
    snippet: Snippet | null;
}

function SnippetCard({snippet}: SnippetCardProps) {
    const pathname = usePathname();
    let basePath = 'snippets'

    if (snippet === null) {
        return notFound()
    }

    const onEdit = () => {
        try {
            startTransition(async () => {
                await updateSnippet(snippet.id, {
                    title: snippet.title,
                    code: snippet.code
                })
            })

        } catch (error) {
            console.error('Error updating snippet:', error)
        }
    }

    // Определяем базовый путь динамически
    const isViewSection = pathname?.includes('/view')
    const isEditSection = pathname?.includes('/edit')


    isViewSection
        ? basePath = 'snippets'
        : isEditSection
            ? basePath = 'snippets'
            : (isViewSection || isEditSection) ? '' : basePath = 'snippets'

    return (
        <Card className="w-full max-w-sm" key={snippet.id}>
            < CardHeader>
                < CardTitle> Snippet </CardTitle>
                <CardDescription>
                    ID: {snippet.id}
                </CardDescription>
            </CardHeader>
            <CardContent className={'flex flex-col gap-2'}>
                <div className={'flex flex-row gap-2'}>
                    <div className={'font-bold'}>Title:</div>
                    <div>{snippet.title}</div>
                </div>
                <div className={'flex flex-row gap-2 font-mono items-center'}>
                    <div className={'font-bold'}>Code:</div>
                    <div className={'font-light text-xs'}>{snippet.code}</div>
                </div>
            </CardContent>
            <CardFooter className={'flex flex-row gap-2'}>
                {!isViewSection && (
                    <Link href={`/${basePath}/${snippet.id}/view`}>
                        <Button variant={'outline'} className={'bg-blue-500/50'}>
                            View
                        </Button>
                    </Link>
                )}
                {isEditSection ? (
                    <Button variant={'outline'} className={'bg-green-500/50'}>
                        Update
                    </Button>
                ) : (
                    <Link href={`/${basePath}/${snippet.id}/edit`}>
                        <Button variant={'outline'} className={'bg-green-500/50'}>
                            Edit
                        </Button>
                    </Link>
                )}

                <Button variant={'destructive'}>Delete</Button>
            </CardFooter>
        </Card>
    );
}

export default SnippetCard;