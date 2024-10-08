'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";



export default function Success(){

    return (
        
        <div className="flex items-center justify-center mt-[7%]">
            <Card className="w-[600px] flex flex-col items-center">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Chamado Registrado!</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                    <div className="flex flex-col items-center">
                        <span>Parabéns, seu chamado foi criado com sucesso!</span>
                    </div>
                    <Link href={"/"} className="flex items-center justify-center mt-8">
                        <Button className="bg-blue-800 hover:bg-blue-700">Abrir outro chamado</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
        
    )
} 