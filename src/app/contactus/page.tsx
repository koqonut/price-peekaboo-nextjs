"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CONTACT_US, CONTACT_US_DESCRIPTION } from '../../utils/Constants';

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TopSection from "@/src/components/TopSection";

const formSchema = z.object({
    Name: z.string().min(2, {
        message: "Name must be at least 2 characters long.",
    }),
    Email: z.string().email({
        message: "Invalid email address.",
    }),
    Subject: z.string().min(1, {
        message: "Subject cannot be empty.",
    }),
    Message: z.string().min(1, {
        message: "Message cannot be empty.",
    }),
});


const ProfileForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Name: "",
            Email: "",
            Subject: "",
            Message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="main-container mx-auto p-0.1 rounded-lg bg-white" >
            <div className="panels-container">
                <div className="right-panel w-full">
                    <div className=" p-4 bg-white">
                        <TopSection headingMessage={CONTACT_US} headingDescription={CONTACT_US_DESCRIPTION} />

                        <div className="p-8">
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="Name"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-lg font-semibold text-orange-700">Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Alias, pseudonym, stage name..."
                                                        {...field}
                                                        className="mt-1 block w-full rounded-md border-orange-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                    />
                                                </FormControl>

                                                <FormMessage className="text-xs text-red-600" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="Email"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-lg font-semibold text-orange-700">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Your carrier pigeon's resting spot"
                                                        {...field}
                                                        className="mt-1 block w-full rounded-md border-orange-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                    />
                                                </FormControl>

                                                <FormMessage className="text-xs text-red-600" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="Subject"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-lg font-semibold text-orange-700">Subject</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Your wish (we'll try our best to grant it)"
                                                        {...field}
                                                        className="mt-1 block w-full rounded-md border-orange-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                    />
                                                </FormControl>

                                                <FormMessage className="text-xs text-red-600" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="Message"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-lg font-semibold text-orange-700">Message</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Go on, we’re all ears (well, eyes)"
                                                        {...field}
                                                        className="mt-1 block w-full rounded-md border-orange-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                    />
                                                </FormControl>

                                                <FormMessage className="text-xs text-red-600" />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full bg-orange-200 hover:bg-orange-300 text-orange-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Submit
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
