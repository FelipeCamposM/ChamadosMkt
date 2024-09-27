'use client';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast";
 
 
const FormSchema = z.object({
    type: z.enum(["low", "md-low", "normal", "md-high", "high"], {
      required_error: "Você precisa selecionar alguma opção.",
    }),
  })
   
  export default function RadioGroupForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    })
   
    function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
        title: "Você enviou os seguintes valores:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }
   
    return (
        <Form {...form}>
          <div className="flex items-center justify-center">
            <Card className="w-2/3">
                <CardHeader>
                <CardTitle>Classifique seu Chamado</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Tempo de Execução</FormLabel>
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="low" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Baixa
                                    </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="md-low" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Pouco Baixa
                                    </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="normal" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Normal</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="md-high" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Pouco Alta</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="high" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Alta</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit">Enviar</Button>
                    </form>
                </CardContent>
            </Card>
          </div>
      </Form>
    )
  }