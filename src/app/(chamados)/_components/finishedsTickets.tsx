"use client";

import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Chamado_Concluido } from "@prisma/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { formatDate, whoEncharged } from "../_components/categorizedsTickets";
import { getSession } from 'next-auth/react';



export default function FinishedsTickets() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState< { name: string } | null>(null);

  const [chamados, setChamados] = useState<Chamado_Concluido[]>([]);

  // Função para buscar os dados dos chamados
  useEffect(() => {

      const fetchUser = async () => {
        const session = await getSession(); // Obtém a sessão
        if (session && session.user) {
            setUser(session.user); // Define o usuário no estado
        }
    };
    fetchUser();
    const fetchChamados = async () => {
      try {
        const response = await fetch("/api/chamados/finisheds", {
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
          <CardHeader>
            <CardTitle className="text-xl">Chamados Concluídos:</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-8">Nome do Solicitante</TableHead>
                <TableHead>Assunto do Chamado</TableHead>
                <TableHead>Encarregado:</TableHead>
                <TableHead>Finalizado por:</TableHead>
                {/* <TableHead>Criado em:</TableHead> */}
                <TableHead>Encerrado em:</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chamados.length > 0 ? (
                chamados.map((chamado: Chamado_Concluido) => (
                  <Dialog key={chamado.id}>
                    <DialogTrigger className="hover:cursor-pointer" asChild>
                      <TableRow key={chamado.id}>
                        <TableCell className="pl-8">
                          {chamado.name}
                        </TableCell>
                        <TableCell>{chamado.subtitle}</TableCell>
                        <TableCell>{whoEncharged(chamado.encharged)}</TableCell>
                        <TableCell>{formatDate(chamado.createAt)}</TableCell>
                        <TableCell>{formatDate(chamado.finishedAt)}</TableCell>
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
                  <TableCell colSpan={4} className="text-center">
                    Nenhum chamado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
