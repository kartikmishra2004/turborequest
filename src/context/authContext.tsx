"use client"
import { createContext, useContext, useState } from "react";

type AuthContextType = {
    getData: () => Promise<any>
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [loading, setLoading] = useState(true);

    const getData = async () => {
        setLoading(true);
        try {
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-user`);
            const jsonData = await data.json();
            setLoading(false);
            return jsonData.user;
        } catch (error) {
            setLoading(false);
            console.log("Failed to get user data!!", error);
        }
    }

    return (
        <AuthContext.Provider value={{ getData, loading }}>
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