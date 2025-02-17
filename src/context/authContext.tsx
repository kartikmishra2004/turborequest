"use client"
import { createContext, useContext, useState, useEffect } from "react";

type User = {
    id: string;
    fullName: string;
    email: string;
    photoURL?: string;
    collections: string[];
} | null;

type AuthContextType = {
    user: User;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        setLoading(true);
        try {
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-user`);
            const jsonData = await data.json();
            setUser(jsonData.user);
            setLoading(false);
        } catch (error) {
            console.log("Failed to get user data!!");
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};