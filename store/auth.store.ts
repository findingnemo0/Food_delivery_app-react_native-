import { User } from '@/type';
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    uer:User | null;
    isLoading:boolean;

    setIsAuthenticated:(value:boolean) => void;
    setUser:(user:User | null ) => void;
    setLoading:(loading:boolean) => void;

    fetchAuthenticatedUser: () =>Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated : false,
    user: null,
    isLoading: true,

    setIsAuthenticated:(value0)=> set({isAuthenticated:value}),
    setUser:(user)=> set({user}),
    setLoading:(value) => set({isLoading: value}),

    fetchAuthenticatedUser: async () =>{

    }
}))
