'use client';

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import CustomRadioGroup from "@/app/(chamados)/_components/radioGroup"; // Importando o componente reutilizável
import { useParams, useRouter } from "next/navigation";

// Schema de validação atualizado com os novos campos
const FormSchema = z.object({
  type: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Você precisa selecionar alguma opção.",
  }),
  complexidade: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Você precisa selecionar uma complexidade.",
  }),
  areasEnvolvidas: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Você precisa selecionar a quantidade de áreas envolvidas.",
  }),
  financeiroImediato: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Você precisa selecionar o impacto financeiro imediato.",
  }),
  dadosEstudos: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Você precisa selecionar a necessidade de dados e estudos.",
  }),
  escalabilidade: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Você precisa selecionar o nível de escalabilidade.",
  }),
  implantacaoEquipe: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Você precisa selecionar o tempo de implantação.",
  }),
  importanciaLongoPrazo: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Você precisa selecionar o nível de importância no longo prazo.",
  }),
  satisfacaoCliente: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Você precisa selecionar o impacto na satisfação do cliente.",
  }),
  deadline: z.string().refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()); // Verifica se é uma data válida
  }, { message: "Data inválida" }),
});


export default function RadioGroupForm() {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const { id } = useParams();
  const router = useRouter();

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

  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
  });

  function calculateTotalScore(data: Record<string, string>) {
    const scores: { [key: string]: number } = { 
      "1": 1, 
      "2": 2, 
      "3": 3, 
      "4": 4, 
      "5": 5 
    };
  
    // Itera sobre os dados do formulário e soma os pontos das escolhas
    const totalScore = Object.keys(data).reduce((acc, key) => {
      if (key !== "deadline" && scores[data[key]]) { // Ignora o campo deadline e checa se a chave existe em scores
        acc += scores[data[key]];
      }
      return acc;
    }, 0);
  
    return totalScore;
  }
  

    
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const totalScore = calculateTotalScore(data);

    try {
      const response = await fetch(`/api/chamados/categorize/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          totalScore, // Inclui a pontuação total
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao categorizar o chamado.');
      }

      toast({
        title: "Chamado categorizado com sucesso!",
        description: `A soma total é ${totalScore}`,
      });

      // Redireciona para a página de lista após o sucesso
      router.push("/listopenTickets");
    } catch (error) {
      console.error('Erro ao categorizar o chamado:', error);
      toast({
        title: "Erro",
        description: "Erro ao categorizar o chamado.",
      });
    }
  }

  const radioOptions = [
    { value: "1", label: "Baixa" },
    { value: "2", label: "Pouco Baixa" },
    { value: "3", label: "Normal" },
    { value: "4", label: "Pouco Alta" },
    { value: "5", label: "Alta" },
  ];

  return (
    <Form {...form}>
      <div className="flex items-center justify-center">
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle>Classifique seu Chamado</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <Controller
                name="type"
                control={form.control}
                render={({ field }) => (
                <CustomRadioGroup
                  options={radioOptions}
                  field={field}
                  label="Tempo de Execução"
                  text="Baixo: +3 meses ~ Normal: menos de 3 meses ~ Alto: menos de 1 semana."
                />
                )}
              />
              <CustomRadioGroup
                options={radioOptions}
                field={form.register("complexidade")}
                label="Nível de Complexidade"
                text="Baixo: Simples e direto ~ Alto: Muito complexo."
              />
              <CustomRadioGroup
                options={radioOptions}
                field={form.register("areasEnvolvidas")}
                label="Quantidade de Áreas Envolvidas"
                text="Baixo: Apenas uma área ou equipe ~ Alto: Muitas áreas (3+ áreas)."
              />
              <CustomRadioGroup
                options={radioOptions}
                field={form.register("financeiroImediato")}
                label="Resultado Financeiro Imediato"
                text="Baixo: Sem impacto imediato ~ Alto: Aumento direto na receita."
              />
              <CustomRadioGroup
                options={radioOptions}
                field={form.register("dadosEstudos")}
                label="Necessidade de Dados e Estudos"
                text="Baixo: Requer pesquisa profunda ~ Alto: Não requer dados adicionais."
              />
              <CustomRadioGroup
                options={radioOptions}
                field={form.register("escalabilidade")}
                label="Nível de Escalabilidade"
                text="Baixo: Difícil de escalar ~ Alto: Altamente escalável."
              />
              <CustomRadioGroup
                options={radioOptions}
                field={form.register("implantacaoEquipe")}
                label="Tempo de Implantação Junto à Equipe"
                text="Baixo: Treinamento extenso ~ Alto: Implantação rápida."
              />
              <CustomRadioGroup
                options={radioOptions}
                field={form.register("importanciaLongoPrazo")}
                label="Nível de Importância no Longo Prazo"
                text="Baixo: Impacto de curto prazo ~ Alto: Impacto estratégico longo."
              />
              <CustomRadioGroup
                options={radioOptions}
                field={form.register("satisfacaoCliente")}
                label="Impacto na Satisfação do Cliente"
                text="Baixo: Sem impacto significativo ~ Alto: Melhora significativa."
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
              <div className="flex justify-center pt-4">
                <Button type="submit">Enviar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
}