'use client'
import React, {useState, useTransition} from 'react';

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import { useRouter } from 'next/navigation';

interface SnippetFormProps {
    createSnippet: (values: { title: string; code: string }) => Promise<{ success: boolean; message: string, redirectTo: string }>;
}

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    code: z.string().min(2, {
        message: "Code must be at least 2 characters.",
    }),
})

function SnippetForm({createSnippet}: SnippetFormProps) {
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const result = await createSnippet(values);
            setResult(result);
            if (result.success) {
                form.reset();
                router.push(result.redirectTo)
            }
        })

    }

    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Button type="submit" disabled={isPending}>Save</Button>
                </form>
            </Form>
        </>
    );
}

export default SnippetForm;