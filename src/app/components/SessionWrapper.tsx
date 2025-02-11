"use client"
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface SessionWrapperProps {
    children: ReactNode;
}

function SessionWrapper({ children }: SessionWrapperProps) {
    return (<SessionProvider>{children}</SessionProvider>)
}
export default SessionWrapper