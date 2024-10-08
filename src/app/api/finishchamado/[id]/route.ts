import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface Chamado_Caracterizado {
  name: string;
  subtitle: string;
  description: string;
  createAt: Date;
  encharged: string;
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json({ error: 'ID do chamado não fornecido.' }, { status: 400 });
  }

  try {
    // Buscar o chamado da tabela "Chamado_Caracterizado"
    const chamado: Chamado_Caracterizado[] = await prisma.$queryRaw<Chamado_Caracterizado[]>`
      SELECT name, subtitle, description, "createAt", encharged FROM "Chamado_Caracterizado" WHERE id = ${id};
    `;

    if (chamado.length === 0) {
      return NextResponse.json({ error: 'Chamado não encontrado' }, { status: 404 });
    }

    const chamadoData = chamado[0]; // Pegar o primeiro resultado da array
    const { name, subtitle, description, createAt, encharged } = chamadoData; // Extrair os campos

    // Inserir o chamado na tabela 'Chamado_Concluido'
    await prisma.$executeRaw`
      INSERT INTO "Chamado_Concluido" (name, subtitle, description, "createAt", encharged)
      VALUES (${name}, ${subtitle}, ${description}, ${createAt}, ${encharged});
    `;

    // Remover o chamado da tabela original 'Chamado_Caracterizado'
    await prisma.$executeRaw`
      DELETE FROM "Chamado_Caracterizado" WHERE id = ${id};
    `;
    
    return NextResponse.json({ message: 'Chamado concluído e movido com sucesso' });
  } catch (error) {
    console.error('Erro ao concluir o chamado:', error);
    return NextResponse.json({ error: 'Erro ao concluir o chamado' }, { status: 500 });
  }
}
