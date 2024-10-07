'use client'

import * as React from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Home, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import auth from "../../../../auth";


interface HeaderProps {
    children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/chamado", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: '1' }) // Substitua pelo ID correto do usuário
                });

                console.log('Resposta da API:', response); // Log da resposta da API

                if (!response.ok) {
                    throw new Error("Erro ao buscar o usuário.");
                }

                const data = await response.json();
                console.log('Dados do usuário:', data); // Log dos dados retornados
                setUser(data.user); // Atualiza o estado com os dados do usuário
            } catch (error) {
                console.error("Erro ao buscar o usuário:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="bg-blue-800">
            <div className="flex h-24 justify-between items-center w-full px-10">
                <div>
                    <Button variant="outline" className="custom-class text-white text-xl bg-blue-800 hover:bg-blue-700 hover:text-white border-none">
                        <Link href="/listopenTickets">Chamados em Aberto</Link>
                    </Button>
                    <Button variant="outline" className="custom-class text-white text-xl bg-blue-800 hover:bg-blue-700 hover:text-white border-none">
                        <Link href="/listCategorizedTickets">Chamados Classificados</Link>
                    </Button>
                    <Button variant="outline" className="custom-class text-white text-xl bg-blue-800 hover:bg-blue-700 hover:text-white border-none">
                        <Link href="/finishedTickets">Chamados Concluídos</Link>
                    </Button>
                </div>
                <div className="flex items-center gap-12">
                    <Link href="/">
                        <Image src="/logor3.png" alt="Logo" width={70} height={70} />
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="custom-class text-white text-xl bg-blue-800 hover:bg-blue-700 hover:text-white border-none" asChild>
                            <Button variant="outline">Perfil</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>
                                <p>Minha Conta: {user ? user.name : "Carregando..."}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Home className="mr-2 h-4 w-4" />
                                    <span>Início</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Configurações</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {children}
        </div>
    )
}
