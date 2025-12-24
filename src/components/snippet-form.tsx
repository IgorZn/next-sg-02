"use client"
import React from 'react';

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    code: z.string().min(2, {
        message: "Code must be at least 2 characters.",
    }),
})

function SnippetForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            code: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
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
                                    <Input placeholder="title" {...field} />
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
                                    <Input placeholder="code" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Save</Button>
            </form>
        </Form>
    );
}

export default SnippetForm;