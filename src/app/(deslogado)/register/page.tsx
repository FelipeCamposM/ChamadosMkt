'use client'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import React from "react";

const formSchema = z.object({
    nome: z.string().min(1, { message: "Nome obrigatório" }),
    email: z.string().min(1, { message: "Email obrigatório" }),
    senha: z.string().min(1, { message: "Senha obrigatória" }),
})



export default function Register(){
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            senha: "",
        },
    })

    const router = useRouter();
    
    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const formData = new FormData();
            formData.append('name', data.nome);
            formData.append('email', data.email);
            formData.append('senha', data.senha);

            const response = await fetch('/api/register', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erro ao criar registro.');
            }

            const result = await response.json();
            console.log('Registro realizado com sucesso:', result);

            // Redireciona após sucesso
            router.push('/login');
        } catch (error) {
            console.error('Erro ao criar registro:', error);
        }
    }

    return (
        <>
        <div className="flex items-center justify-center mt-[7%]">
            <Card className="w-[600px] flex flex-col items-center">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Registrar</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2
                        flex flex-col items-center">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem className="w-full p-2">
                                        <FormLabel>Nome:</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field}
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full p-2">
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field}
                                                className="w-full"
                                            />
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
                                            <Input type="password" {...field}
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <div className="flex space-x-4">
                                <Button type="submit" className="bg-blue-800 hover:bg-blue-700">Registrar</Button>
                                <Link href={"/login"}>                                
                                    <Button type="button" className="bg-blue-800 hover:bg-blue-700">Voltar</Button>
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
        </>
    )
} 