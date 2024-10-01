'use client'
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const formSchema = z.object({
    nome: z.string().min(1, { message: "Nome obrigatório" }),
    email: z.string().min(1, { message: "Email obrigatório" }),
    senha: z.string().min(1, { message: "Senha obrigatória" }),
})


export default function Login(){

    const [token, setToken] = useState('');
 
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch('http://192.168.7.114/glpi/apirest.php/initSession/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'App-Token': 'mU597Gm8DDr3FskLzvMeZ5oLb7BnNVefIe2F9dXz',
                        'Authorization': `user_token yJwbpLv5GpGrvMoz0KYbOKgjc4pUlBhNrXFUrCiQ`
                        // 'Authorization': `Basic Smhpb25hdGhhbjpKaGlvbjgxMjQ=`,
                    }
                });
 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
 
                const dataToken = await response.json();
                console.log(dataToken);
                const sessionToken = dataToken.session_token;
                setToken(sessionToken);
            } catch (error) {
                console.error(error);
            }
        };
 
        fetchToken();
    }, []);
 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            senha: "",
        },
    })
 
    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
        const response = await fetch('http://192.168.7.114/glpi/apirest.php/Ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'App-Token': 'mU597Gm8DDr3FskLzvMeZ5oLb7BnNVefIe2F9dXz',
                'Session-Token': token
            },
            body: JSON.stringify({
                input: {
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha,
                }
            })
        });
 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    }

    return (
        <>
        <div className="flex items-center justify-center mt-16">
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
                                <Button type="submit">Registrar</Button>
                                <Link href={"/login"}>                                
                                    <Button type="button">Voltar</Button>
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