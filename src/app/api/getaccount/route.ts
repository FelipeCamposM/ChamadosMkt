import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = body.id;

    console.log('ID recebido:', id); // Log do ID recebido

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { name: true }
    });

    if (!user) {
      console.log('Usuário não encontrado'); // Log caso o usuário não seja encontrado
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    console.log('Usuário encontrado:', user); // Log do usuário encontrado
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
    return NextResponse.json({ error: 'Erro ao buscar o usuário' }, { status: 500 });
  }
}
