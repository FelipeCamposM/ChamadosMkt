let userEmail: string | null = null;

// Função para definir o e-mail do usuário
export const setUserEmail = (email: string) => {
    userEmail = email;
};

// Função para obter o e-mail do usuário
export const getUserEmail = () => {
    return userEmail;
};
