import firebase from 'firebase/compat/app';  // Usar a compatibilidade
import 'firebase/compat/auth';  // Importar o módulo de autenticação

// Configuração do Firebase (substitua pelos seus dados)
const firebaseConfig = {
    apiKey: "AIzaSyBzf0GtKGFG8VkZeGjbvFei56josD2z2uI",
    authDomain: "energi-97c18.firebaseapp.com",
    databaseURL: "https://energi-97c18-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "energi-97c18",
    storageBucket: "energi-97c18.firebasestorage.app",
    messagingSenderId: "1070621061812",
    appId: "1:1070621061812:web:858007afe40f97ddd45de1",
    measurementId: "G-YS8TJY57Z0"
  };

// Inicializa o Firebase se não tiver sido inicializado ainda
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();  // Usar a instância existente
}

const auth = firebase.auth();

// Função para fazer o login
export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('Usuário logado:', user);

        // Após o login, obtenha o token de ID
        const idToken = await user?.getIdToken();
        console.log('Token de ID:', idToken);

        return idToken;  // Retorna o token de ID para ser usado no back-end
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Erro ao logar o usuário:', error.message);
        } else {
            console.error('Erro desconhecido ao logar o usuário');
        }
        throw error;
    }
};

// Função para registrar um novo usuário
export const registerUser = async (email: string, password: string, displayName: string) => {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (user) {
            await user.updateProfile({
                displayName,  // Atualiza o nome de exibição (displayName)
            });
        }

        console.log('Usuário registrado:', user);

        // Após o registro, obtenha o token de ID
        const idToken = await user?.getIdToken();
        console.log('Token de ID após registro:', idToken);

        return idToken;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Erro ao registrar o usuário:', error.message);
        } else {
            console.error('Erro desconhecido ao registrar o usuário');
        }
        throw error;
    }
};

// Função para deslogar o usuário
export const logoutUser = async () => {
    try {
        await auth.signOut();
        console.log('Usuário deslogado');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Erro ao deslogar o usuário:', error.message);
        } else {
            console.error('Erro desconhecido ao deslogar o usuário');
        }
        throw error;
    }
};
