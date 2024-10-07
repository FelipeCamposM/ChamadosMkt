'use server';

import { signIn } from '../../../../../auth';
import { AuthError } from 'next-auth';

export default async function login(formData: FormData): Promise<boolean> {
  const entries = Array.from(formData.entries());
  const { email, senha } = Object.fromEntries(entries) as {
    email: string;
    senha: string;
  };
  
  try {
    await signIn('credentials', {
      email,
      senha,
      redirect: false,  // Evita o redirecionamento automático
    });

    return true;  // Login bem-sucedido

  } catch (e) {
    if (e instanceof AuthError && e.type === 'CredentialsSignin') {
      throw new Error('Credenciais inválidas');
    } else {
      console.error('Erro durante o login:', e);
      throw new Error('Erro ao tentar realizar login no servidor');
    }
  }
}
