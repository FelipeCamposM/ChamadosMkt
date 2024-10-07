// src/app/api/chamado/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { compareSync } from 'bcrypt-ts';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Extrair dados do corpo da requisição
    const body = await request.formData();
    const email = body.get('email') as string;
    const senhaDigitada = body.get('senha') as string;

    // Encontrar o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Verificar se o usuário existe
    if (!user) {
      return NextResponse.json({ error: 'E-mail ou senha inválidos' }, { status: 401 });
    }

    // Comparar a senha digitada com a senha armazenada
    const senhaCorreta = compareSync(senhaDigitada, user.senha);

    if (!senhaCorreta) {
      return NextResponse.json({ error: 'E-mail ou senha inválidos' }, { status: 401 });
    }

    // Login bem-sucedido
    return NextResponse.json({ message: 'Login realizado com sucesso', user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return NextResponse.json({ error: 'Erro ao realizar login' }, { status: 500 });
  }
}
