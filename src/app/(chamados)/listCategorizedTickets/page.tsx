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
import { Trash2 } from 'lucide-react';

const tickets = [
    {
      position: "1º",
      nameTicket: "Montar quadros",
      deadline: "13/09/2024",
      priority: "Alta",
    },
    {
      position: "2º",
      nameTicket: "Criar tabelas",
      deadline: "17/10/2024",
      priority: "Pouco Alta",
    },
    {
      position: "3º",
      nameTicket: "Fazer layout",
      deadline: "20/10/2024",
      priority: "Normal",
    },
    {
        position: "4º",
        nameTicket: "Aumentar o trafego pago",
        deadline: "22/11/2024",
        priority: "Pouco Baixa",
    },
    {
      position: "5º",
      nameTicket: "Criar campanha de marketing",
      deadline: "11/11/2024",
      priority: "Baixa",
    },
    
  ]

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

export default function OpenTickets(){


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
                            {tickets.map((ticket) => (
                            <TableRow key={ticket.nameTicket}>
                                <TableCell className="font-medium text-center">{ticket.position = (tickets.indexOf(ticket) + 1 + "º").toString()}</TableCell>
                                <TableCell>{ticket.nameTicket}</TableCell>
                                <TableCell>{ticket.deadline}</TableCell>
                                <TableCell className={`text-center ${getPriorityColor(ticket.priority)} rounded-lg`}>{ticket.priority}</TableCell>
                                <TableCell><Button className="bg-red-500 ml-5"><Trash2 className="h-4 w-4"/></Button></TableCell>
                                
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    )
}