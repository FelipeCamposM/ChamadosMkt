'use client'

import * as React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Home, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
    children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Recupera o usuário do localStorage
        }
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
    );
}
