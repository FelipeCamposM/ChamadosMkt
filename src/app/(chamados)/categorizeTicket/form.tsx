'use client';

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";
// import router from "next/router";

const formSchema = z.object({
    execTime: z.enum(["1", "2", "3", "4", "5"], {
        required_error: "Você precisa selecionar um tempo de execução.",
    }),
    complexity: z.enum(["1", "2", "3", "4", "5"], {
        required_error: "Você precisa selecionar uma complexidade.",
    }),
    envolvedAreas: z.enum(["1", "2", "3", "4", "5"], {
        required_error: "Você precisa selecionar uma quantidade de envolvidos.",
    }),
    financeReturn: z.enum(["1", "2", "3", "4", "5"], {
        required_error: "Você precisa selecionar um retorno financeiro imediato.",
    }),
    dataStudy: z.enum(["1", "2", "3", "4", "5"], {
        required_error: "Você precisa selecionar um quantidade de estudos necessários.",
    }),
    scalability: z.enum(["1", "2", "3", "4", "5"], {
        required_error: "Você precisa selecionar uma complexidade.",
    }),
    implatationEquip: z.enum(["1", "2", "3", "4", "5"], {
        required_error: "Você precisa selecionar uma complexidade.",
    }),
    longImportance: z.enum(["1", "2", "3", "4", "5"], {
        required_error: "Você precisa selecionar uma complexidade.",
    }),
    satisfactionClient: z.enum(["1", "2", "3", "4", "5"], {
        required_error: "Você precisa selecionar uma complexidade.",
    }),
    deadline: z.string().refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()); // Verifica se é uma data válida
        }, { message: "Data inválida" }),
    encharged: z.enum(["T", "G", "M"], {
        required_error: "Você quem está encarregado do Chamado.",
    }),
})

export default function FormContent() {
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const { id } = useParams();
    // const router = useRouter();

useEffect(() => {
    // Define a data mínima como hoje no formato "YYYY-MM-DDTHH:MM"
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");

    // Formato esperado por <input type="datetime-local">
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    setMinDate(formattedDate);

    const maxYear = "2050";
    const maxMonth = "12";
    const maxDay = "31";
    const maxFormattedDate = `${maxYear}-${maxMonth}-${maxDay}T23:59`; // Último minuto de 2050
    setMaxDate(maxFormattedDate);
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            deadline: "",
        },
    })

    const router = useRouter();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
        try {
            const formData = new FormData();

            formData.append('execTime', data.execTime);
            formData.append('complexity', data.complexity);
            formData.append('envolvedAreas', data.envolvedAreas);
            formData.append('financeReturn', data.financeReturn);
            formData.append('dataStudy', data.dataStudy);
            formData.append('scalability', data.scalability);
            formData.append('implatationEquip', data.implatationEquip);
            formData.append('longImportance', data.longImportance);
            formData.append('satisfactionClient', data.satisfactionClient);
            formData.append('deadline', data.deadline);
            formData.append('encharged', data.encharged);

            const totalScore = Number(data.execTime) + Number(data.complexity) + Number(data.envolvedAreas) + Number(data.financeReturn) + Number(data.dataStudy) + Number(data.scalability) + Number(data.implatationEquip) + Number(data.longImportance) + Number(data.satisfactionClient);
            formData.append('totalScore', totalScore.toString());

            const response = await fetch('/api/chamados/categorize/' + id + '', {
                method: 'POST',
                body: formData, // Enviando os dados via FormData
            });

            if (!response.ok) {
                throw new Error('Erro ao criar o chamado.');
            }

            const result = await response.json();
            console.log('Chamado criado com sucesso:', result);

            // Redireciona após sucesso
            router.push('/listCategorizedTickets');
        } catch (error) {
            console.error('Erro ao criar o chamado:', error);
        }
    }
 
    return (
        <div>
            <Form {...form}>
                <div className="flex items-center justify-center">
                <Card className="w-[600px] flex justify-center items-center flex-col">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Categorizar Chamado</CardTitle>
                    </CardHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2
                flex flex-col gap-4 mb-4">
                    <FormField
                        control={form.control}
                        name="execTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Tempo de Execução</FormLabel>
                                <FormDescription>
                                Baixo: +3 meses ~ Normal: menos de 3 meses ~ Alto: menos de 1 semana.
                                </FormDescription>
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Pouco Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="3" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Normal</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="4" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Pouco Alta</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="5" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Alta</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="complexity"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Nível de Complexidade</FormLabel>
                                <FormDescription>
                                Baixo: Simples e direto ~ Alto: Muito complexo.
                                </FormDescription>
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Pouco Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="3" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Normal</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="4" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Pouco Alta</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="5" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Alta</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="envolvedAreas"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Quantidade de Áreas Envolvidas</FormLabel>
                                <FormDescription>
                                Baixo: Apenas uma área ou equipe ~ Alto: Muitas áreas (3+ áreas).
                                </FormDescription>
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Pouco Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="3" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Normal</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="4" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Pouco Alta</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="5" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Alta</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="financeReturn"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Resultado Financeiro Imediato</FormLabel>
                                <FormDescription>
                                Baixo: Sem impacto imediato ~ Alto: Aumento direto na receita.
                                </FormDescription>
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Pouco Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="3" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Normal</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="4" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Pouco Alta</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="5" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Alta</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dataStudy"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Necessidade de Dados e Estudos</FormLabel>
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Pouco Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="3" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Normal</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="4" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Pouco Alta</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="5" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Alta</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="scalability"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Nível de Escalabilidade</FormLabel>
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Pouco Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="3" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Normal</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="4" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Pouco Alta</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="5" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Alta</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="implatationEquip"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Tempo de implantação Junto à Equipe</FormLabel>
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Pouco Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="3" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Normal</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="4" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Pouco Alta</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="5" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Alta</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="longImportance"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Nível de Importância no Longo Prazo</FormLabel>
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Pouco Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="3" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Normal</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="4" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Pouco Alta</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="5" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Alta</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="satisfactionClient"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Impacto na Satisfação do Cliente</FormLabel>
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Pouco Baixa
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="3" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Normal</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="4" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Pouco Alta</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="5" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Alta</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                            <FormItem>
                                <FormLabel className="text-xl font-semibold pr-4">Data Limite:</FormLabel>
                                <FormControl>
                                <input
                                    type="date"
                                    {...form.register("deadline")}
                                    className="border rounded-md p-2"
                                    min={minDate}
                                    max={maxDate}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                            <FormField
                        control={form.control}
                        name="encharged"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Quem será encarregado do Chamado:</FormLabel>
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="T" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Tainá
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="G" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Gabriela
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="M" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Marketing</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Enviar</Button>
                </form>
                </Card>
                </div>
            </Form>
        </div>
    )
}