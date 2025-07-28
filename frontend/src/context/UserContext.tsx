"use client";
import { api } from "@/lib/api";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
    user_id: string;
    user_name: string;
    email: string;
    roles: string[];
};

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            api.get("/user/user-role")
                .then((data: any) => {
                    setUser(data);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchUser();
    }, []);

    if (loading) return null; // or show a loading spinner

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within a UserProvider");
    return ctx;
};
