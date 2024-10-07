import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import db from '@/lib/db';
import { compareSync } from 'bcrypt-ts';

interface JWT {
    productToken?: string;
}

declare module 'next-auth' {
    interface Session {
        productToken?: string;
    }

    interface User {
        productToken?: string;
    }
}

// Definição da função NextAuth
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "E-mail", type: "email" },
                senha: { label: "Senha", type: "password" }
            },
            async authorize(credentials): Promise<User | null> {
                // Validar credenciais
                const email = credentials?.email as string;
                const senha = credentials?.senha as string;

                if (!email || !senha) {
                    throw new Error('E-mail e senha são obrigatórios');
                }

                // Buscar usuário no banco de dados
                const user = await db.user.findUnique({
                    where: { email: email }
                });

                console.log('Usuário encontrado:', user);

                if (!user) {
                    throw new Error('E-mail ou senha inválidos');
                }

                // Conferir a senha
                const checkPassword = compareSync(senha, user.senha);
                console.log('Senha conferida:', checkPassword);

                if (checkPassword) {
                    // Retornar o usuário se a senha for válida
                    return { id: user.id.toString(), name: user.name, email: user.email };
                } 

                throw new Error('senha inválidos');
            }
        })
    ],
    pages: {
        signIn: '/login', // A página de login personalizada
        error: '/auth/error', // Página de erro personalizada
        
    },
    callbacks: {
        // Redireciona após login
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async session({ session, user }) {
            // Adiciona informações do usuário à sessão
            session.user = user;
            return session;
        },
        async jwt({ token, user }) {
            // Armazena o usuário no token JWT
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        }
    }
});

// Exportando as funções GET e POST
// export { GET, POST };
