// src/app/api/chamado/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashSync } from "bcrypt-ts";


const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Supondo que você tenha parâmetros diretamente na requisição (substitua pelos valores corretos)
    const body = await request.formData();
    const name = body.get('name');
    const email = body.get('email');
    const senha = (body.get('senha')) as string;

    // Usando o bcrypt para criptografar a senha
    const hashedPassword = hashSync(senha.toString(), 10);

    // Usando o prisma.$executeRaw para executar um comando SQL INSERT diretamente
    await prisma.$executeRaw`
      INSERT INTO "User" (name, email, senha)
      VALUES (${name}, ${email}, ${hashedPassword});
    `;

    return NextResponse.json({ message: 'Registro criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar registro:', error);
    return NextResponse.json({ error: 'Erro ao criar registro' }, { status: 500 });
  }
}
