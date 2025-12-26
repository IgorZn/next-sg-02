'use client'
import React, {useEffect, useState, useTransition} from 'react';

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useRouter} from 'next/navigation';
import {Snippet} from "../../generated/prisma/client";
import {updateSnippet} from "@actions/snippet";

interface SnippetFormProps {
    createSnippet: (values: { title: string; code: string }) => Promise<{
        success: boolean;
        message: string,
        redirectTo: string,
        data?: Snippet
    }>;
    snippet?: Snippet | null;
    isEditMode?: boolean;
}

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    code: z.string().min(2, {
        message: "Code must be at least 2 characters.",
    }),
})

function SnippetForm({createSnippet, snippet = null, isEditMode = false}: SnippetFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<{ success: boolean; message: string; redirectTo: string } | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            code: "",
        },
    })

    useEffect(() => {
        if (snippet) {
            form.reset({
                title: snippet.title,
                code: snippet.code,
            });
        }
    }, [snippet, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            // Обрабатываем создание
            if (!isEditMode) {
                const result = await createSnippet(values);
                if (result) {
                    setResult(result);
                    form.reset();
                    router.push(result.redirectTo)
                }
                return;
            }

            // Обрабатываем редактирование
            if (!snippet) {
                setResult({
                    success: false,
                    message: "Cannot edit: snippet not found",
                    redirectTo: "/snippets"
                });
                return;
            }

            const result = await updateSnippet(snippet.id, values);
            if (result) {
                setResult(result);
                form.reset();
                router.push(result.redirectTo)
            }
        })
    }

    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-2'}>
                    <div className={'space-y-2'}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem className={'flex flex-row items-center justify-center'}>
                                    <FormLabel className={'basis-1/3'}>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter title" {...field} disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="code"
                            render={({field}) => (
                                <FormItem className={'flex flex-row items-center justify-center'}>
                                    <FormLabel className={'basis-1/3'}>Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter code" {...field} disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={isPending} className={'w-full'}>Save</Button>
                </form>
            </Form>
        </>
    );
}

export default SnippetForm;