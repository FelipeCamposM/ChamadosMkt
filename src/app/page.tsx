"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import "../app/globals.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';  // Para redirecionamento após sucesso
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  nome: z.string().min(1, { message: "Nome obrigatório" }),
  assunto: z.string().min(1, { message: "Assunto obrigatório" }),
  descricao: z.string().min(1, { message: "Descrição obrigatória" }),
});

export default function Home() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        nome: "",
        assunto: "",
        descricao: "",
    },
});

const router = useRouter();

async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
        const formData = new FormData();
        formData.append('name', data.nome);
        formData.append('subtitle', data.assunto);
        formData.append('description', data.descricao);

        const response = await fetch('/api/chamado', {
            method: 'POST',
            body: formData, // Enviando os dados via FormData
        });

        if (!response.ok) {
            throw new Error('Erro ao criar o chamado.');
        }

        const result = await response.json();
        console.log('Chamado criado com sucesso:', result);

        // Redireciona após sucesso
        router.push('/success');
    } catch (error) {
        console.error('Erro ao criar o chamado:', error);
    }
}

  return (
    
    <div>
      <div className="bg-blue-800 flex justify-between items-center h-24 relative">
          
          <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/">
                <Image
                  src="/logor3.png"
                  alt="Logo"
                  width={70}
                  height={70}
                />
              </Link>
          </div>

          <div className="ml-auto mr-4">
            <div className="list-none gap-2 flex">
              <div>
                <Link
                  href="/login"
                  className="custom-class text-white text-xl bg-blue-800 hover:bg-blue-700 hover:text-white"
                >
                  <User className="inline-block h-6 w-6 mr-2" />
                  Login para Administrador
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-[7%]">
            <Card className="w-[600px] flex flex-col items-center">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Abrir um novo chamado</CardTitle>
                </CardHeader>
                <CardContent className="w-full px-10">
                    <Form {...form}>
                        <div className="flex items-center justify-center w-full">
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center w-full ">
                                <FormField
                                    control={form.control}
                                    name="nome"
                                    render={({ field }) => (
                                        <FormItem className="w-full p-2">
                                            <FormLabel>Nome do Solicitante:</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} className="w-full" />
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
                                                <Input type="text" {...field} className="w-full" />
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
                                                <Textarea {...field} className="w-full text-black h-40" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="bg-blue-800 hover:bg-blue-700">Enviar</Button>
                            </form>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
