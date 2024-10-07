'use client'

import * as React from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Trash2 } from 'lucide-react';
import { DialogHeader } from "@/components/ui/dialog"
import { Chamado_Caracterizado } from "@prisma/client"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"


  function getPriorityColor(priority: string) {
    switch (priority) {
        case "Alta":
            return "bg-green-600 text-black"
        case "Pouco Alta":
            return "bg-green-500 text-black"
        case "Normal":
            return "bg-emerald-400 text-black"
        case "Pouco Baixa":
            return "bg-cyan-400 text-black"
        case "Baixa":
            return "bg-cyan-500 text-black"
        default:
            return "bg-gray-200 text-black"
    }
}

function getPriorityIndex(totalScore: number) {
    if (totalScore <= 9) {
        return "Baixa";
    } else if (totalScore <= 18) {
        return "Pouco Baixa";
    } else if (totalScore <= 27) {
        return "Normal";
    } else if (totalScore <= 36) {
        return "Pouco Alta";
    } else if (totalScore <= 45) {
        return "Alta";
    } else {
        return "Baixa"; // Valor padrão
    }
}

async function destroyChamado(id_chamado: number) {
    try {
        const response = await fetch(`/api/deletechamado?id=${id_chamado}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar o chamado.');
        }

        const data = await response.json();
        console.log('Chamado deletado com sucesso:', data);

        window.location.reload();

        // Aqui você pode adicionar lógica adicional, como atualizar a lista de chamados na UI
    } catch (error) {
        console.error('Erro ao deletar o chamado:', error);
    }
}

async function finishChamado(id_chamado: number) {
    try {
        const response = await fetch(`/api/finishchamado/${id_chamado}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Erro ao concluir o chamado.');
        }

        const data = await response.json();
        console.log('Chamado concluído com sucesso:', data);

        window.location.reload(); // Recarrega a página para refletir a conclusão do chamado

    } catch (error) {
        console.error('Erro ao concluir o chamado:', error);
    }
}


export function formatDate(date: string | Date): string {
    // Verifique se a data é uma string, e converta para Date se necessário
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      // Caso a conversão para Date falhe (data inválida), retorne uma string padrão
      return 'Data inválida';
    }
  
    const day = String(dateObj.getDate()).padStart(2, '0'); // Dia com dois dígitos
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Mês com dois dígitos
    const year = dateObj.getFullYear(); // Ano
  
    return `${day}/${month}/${year}`; // Retorna a data formatada como DD/MM/YYYY
  }
  


export default function ListCategorizedTickets(){

    const handleButtonClick = (event: { stopPropagation: () => void }) => {
        event.stopPropagation();
      };

      const [chamados, setChamados] = useState<Chamado_Caracterizado[]>([]);

      // Função para buscar os dados dos chamados
      useEffect(() => {
        const fetchChamados = async () => {
            try {
            const response = await fetch("/api/chamados/categorizeds", {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Erro ao buscar os chamados.");
            }
            const data = await response.json();
            setChamados(data); // Atualiza o estado com os chamados
            } catch (error) {
            console.error("Erro ao buscar os chamados:", error);
            }
        };

        fetchChamados();
        }, []);

    return (
        <div>
            <div className="flex items-center justify-center pt-10 bg-white">
                <Card className="w-2/3 pb-10 px-3">
                    <CardHeader className="bg-">
                        <CardTitle className="text-xl">Chamados à serem Concluídos:</CardTitle>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="text-center">Posição</TableHead>
                            <TableHead>Nome do Chamado</TableHead>
                            <TableHead>Data Limite</TableHead>
                            <TableHead className="text-center">Índice de Prioridade</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {chamados.length > 0 ? (
                                chamados
                                    .sort((a: Chamado_Caracterizado, b: Chamado_Caracterizado) => Number(b.priority) - Number(a.priority))
                                    .map((chamado: Chamado_Caracterizado) => (
                                    <Dialog key={chamado.id}>
                                        <DialogTrigger className="hover:cursor-pointer" asChild>
                                            <TableRow key={chamado.id}>
                                                <TableCell className="font-medium text-center">{(chamados.indexOf(chamado) + 1 + "º").toString()}</TableCell>
                                                <TableCell className="pl-8">{chamado.subtitle}</TableCell>
                                                <TableCell>{formatDate(chamado.deadline)}</TableCell>
                                                <TableCell className={`text-center ${getPriorityColor(getPriorityIndex(Number(chamado.priority)))} rounded-lg`}>{getPriorityIndex(Number(chamado.priority))}</TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Button 
                                                        className="bg-red-500 hover:bg-red-400 ml-5" 
                                                        onClick={(event) => {
                                                        handleButtonClick(event); 
                                                        destroyChamado(chamado.id);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4"/>
                                                    </Button>
                                                    <Button 
                                                        className="bg-green-500 hover:bg-green-400" 
                                                        onClick={(event) => {
                                                        handleButtonClick(event); 
                                                        finishChamado(chamado.id);
                                                        }}
                                                    >
                                                        <Check className="h-4 w-4"/>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="flex">
                                                        <p>Nome do Solicitante:</p>
                                                        {chamado.name}
                                                    </DialogTitle>
                                                    <DialogDescription className="flex">
                                                        <p>Assunto:</p>
                                                        {chamado.subtitle}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Separator />
                                                <p className="text-sm">{chamado.description}</p>
                                            </DialogContent>
                                    </Dialog>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">Nenhum chamado encontrado.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    )
}