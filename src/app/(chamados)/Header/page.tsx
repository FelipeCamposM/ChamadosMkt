'use client'

import * as React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Home, Settings, LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getSession } from 'next-auth/react';
import logout from '@/app/(auth)/_actions/logout';
// import { User } from "@prisma/client";

interface HeaderProps {
    children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {

    const [user, setUser] = useState< { name: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const session = await getSession(); // Obtém a sessão
            if (session && session.user) {
                setUser(session.user); // Define o usuário no estado
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
                            <Button variant="outline"><Menu className="h-6 w-6" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>
                                <p>Minha Conta: </p>
                                <p>{user ? user.name : "Carregando..."}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Link href="/" className="flex">
                                        <Home className="mr-2 h-4 w-4" />
                                        <span>Abrir Chamado</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Configurações</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <form action={logout} className="w-full">
                                    
                                    <Button className="w-full"><LogOut className="mr-2 h-4 w-4" /> Sair</Button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {children}
        </div>
    );
}