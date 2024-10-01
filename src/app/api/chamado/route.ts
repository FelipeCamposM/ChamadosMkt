// src/app/api/chamado/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Supondo que você tenha parâmetros diretamente na requisição (substitua pelos valores corretos)
    const body = await request.formData();
    const name = body.get('name');
    const subtitle = body.get('subtitle');
    const description = body.get('description');

    // Usando o prisma.$executeRaw para executar um comando SQL INSERT diretamente
    await prisma.$executeRaw`
      INSERT INTO "Chamado" (name, subtitle, description)
      VALUES (${name}, ${subtitle}, ${description});
    `;

    return NextResponse.json({ message: 'Chamado criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar o chamado:', error);
    return NextResponse.json({ error: 'Erro ao criar o chamado' }, { status: 500 });
  }
}
