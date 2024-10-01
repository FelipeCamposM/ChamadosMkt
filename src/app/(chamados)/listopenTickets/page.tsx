'use client'

import * as React from "react"
import Link from "next/link"
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react';
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"




export default function OpenTickets(){

    const handleButtonClick = (event: { stopPropagation: () => void }) => {
        event.stopPropagation();
      };

    const [chamados, setChamados] = useState([]);

    // Função para buscar os dados dos chamados
    useEffect(() => {
        const fetchChamados = async () => {
            try {
                const response = await fetch('/api/chamados', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar os chamados.');
                }
                const data = await response.json();
                setChamados(data); // Atualiza o estado com os chamados
            } catch (error) {
                console.error('Erro ao buscar os chamados:', error);
            }
        };

        fetchChamados();
    }, []);

    return (
        <div>
            
            <div className="flex items-center justify-center pt-10 bg-white">
                <Card className="w-2/3">
                    <CardHeader>
                        <CardTitle className="text-xl">Chamados Não Classificados</CardTitle>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="pl-8">Nome do Solicitante</TableHead>
                                <TableHead>Assunto</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {chamados.length > 0 ? (
                                chamados.map((chamado) => (
                                    <Dialog key={chamado.id}>
                                          <DialogTrigger className="hover:cursor-pointer" asChild>
                                            <TableRow key={chamado.id}>
                                                <TableCell className="pl-8">{chamado.name}</TableCell>
                                                <TableCell>{chamado.subtitle}</TableCell>
                                                <TableCell>
                                                    <Link href={`/categorizeTicket/${chamado.id}`} legacyBehavior passHref>
                                                        <Button className="bg-blue-800 ml-5" onClick={handleButtonClick}><Pencil className="h-4 w-4" /></Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>{chamado.name}</DialogTitle>
                                                    <DialogDescription>
                                                        {chamado.subtitle}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Separator />
                                                <p>{chamado.description}</p>
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