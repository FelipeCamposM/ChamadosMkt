// src/app/api/chamados/[id]/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Buscar o chamado pelo ID
    const chamado = await prisma.chamado.findUnique({
      where: { id: Number(id) },
    });

    // Verificar se o chamado foi encontrado
    if (!chamado) {
      return NextResponse.json({ error: 'Chamado não encontrado' }, { status: 404 });
    }

    // Retornar o chamado encontrado
    return NextResponse.json(chamado);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar o chamado' }, { status: 500 });
  }
}
