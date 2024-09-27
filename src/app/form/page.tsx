'use client';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
 
 
const formSchema = z.object({
    nome: z.string().min(1, { message: "Nome obrigatório" }),
    assunto: z.string().min(1, { message: "Assunto obrigatório" }),
    descricao: z.string().min(1, { message: "Descrição obrigatória" }),
})
 
export default function FormContent() {
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
            assunto: "",
            descricao: "",
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
                    assunto: data.assunto,
                    descricao: data.descricao,
                }
            })
        });
 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    }
 
    return (
        <div className="flex items-center justify-center mt-16">
            <Card className="w-[600px] flex flex-col items-center">
                <CardHeader className="text-2xl font-bold">Abrir um Chamado</CardHeader>
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
                                            <Input type="Descrição" {...field}
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="assunto"
                                render={({ field }) => (
                                    <FormItem className="w-full p-2">
                                        <FormLabel>Assunto do Chamado:</FormLabel>
                                        <FormControl>
                                            <Input type="Descrição" {...field}
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="descricao"
                                render={({ field }) => (
                                    <FormItem className="w-full p-2">
                                        <FormLabel>Descrição:</FormLabel>
                                        <FormControl>
                                            <Textarea {...field}
                                                className="w-full text-black"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Enviar</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}