// src/app/api/chamados/categorize/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Definir o tipo esperado para o retorno do chamado
interface Chamado {
  name: string;
  subtitle: string;
  description: string;
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { deadline, priority } = body; // Recebe o 'deadline' e a 'priority' do corpo da requisição
    const { id } = params; // ID do chamado

    // Buscar o chamado original pelo ID
    const chamado: Chamado[] = await prisma.$queryRaw<Chamado[]>`
      SELECT name, subtitle, description FROM "Chamado" WHERE id = ${id};
    `;

    // Verificar se o chamado foi encontrado
    if (chamado.length === 0) {
      return NextResponse.json({ error: 'Chamado não encontrado' }, { status: 404 });
    }

    const chamadoData = chamado[0]; // Acessar o primeiro resultado da array
    const { name, subtitle, description } = chamadoData; // Extrair os campos

    // Inserir o chamado na tabela 'chamado_caracterizado'
    await prisma.$executeRaw`
      INSERT INTO "chamado_caracterizado" (name, subtitle, description, deadline, priority)
      VALUES (${name}, ${subtitle}, ${description}, ${deadline}, ${priority});
    `;

    // Remover o chamado da tabela original 'Chamado'
    await prisma.$executeRaw`
      DELETE FROM "Chamado" WHERE id = ${id};
    `;

    return NextResponse.json({ message: 'Chamado categorizado e movido com sucesso' });
  } catch (error) {
    console.error('Erro ao categorizar o chamado:', error);
    return NextResponse.json({ error: 'Erro ao categorizar o chamado' }, { status: 500 });
  }
}
