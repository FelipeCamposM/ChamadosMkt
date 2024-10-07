import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Função para deletar o chamado
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID do chamado não fornecido.' }, { status: 400 });
  }

  try {
    const chamado = await prisma.chamado_Caracterizado.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(chamado, { status: 200 });
  } catch (error) {
    console.error('Erro ao deletar o chamado:', error);
    return NextResponse.json({ error: 'Erro ao deletar o chamado.' }, { status: 500 });
  }
}
