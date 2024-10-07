'use client'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useRouter } from 'next/navigation';
import login from "../../(auth)/login/_actions/login";

const formSchema = z.object({
    email: z.string().min(1, { message: "Email obrigatório" }),
    senha: z.string().min(1, { message: "Senha obrigatória" }),
})


export default function Login() {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            senha: "",
        },
    })
    
    const router = useRouter();
    
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('senha', data.senha);

            const result = await login(formData);  // Supondo que `login` seja uma função que trate o login

            if (result) {
                router.push('/listopenTickets');
            }

        } catch (error) {
            console.error('Erro ao realizar login:', error);
        }
    }

    return (
        <div className="flex items-center justify-center mt-[7%]">
            <Card className="w-[600px] flex flex-col items-center">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col items-center">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full p-2">
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} className="w-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="senha"
                                render={({ field }) => (
                                    <FormItem className="w-full p-2">
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} className="w-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <div className="flex space-x-4">
                                <Button type="submit" className="bg-blue-800 hover:bg-blue-700">Entrar</Button>
                                <Link href={"/register"}>                                
                                    <Button type="button" className="bg-blue-800 hover:bg-blue-700">Registre-se</Button>
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
