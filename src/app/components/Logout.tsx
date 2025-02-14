"use client"
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Power, TriangleAlert } from 'lucide-react';
import { Variants, Transition } from 'motion/react';
import { signOut } from "next-auth/react";

export default function Logout() {
    const customVariants: Variants = {
        initial: {
            scale: 0.9,
            filter: 'blur(10px)',
            y: '100%',
        },
        animate: {
            scale: 1,
            filter: 'blur(0px)',
            y: 0,
        },
    };

    const customTransition: Transition = {
        type: 'spring',
        bounce: 0,
        duration: 0.4,
    };

    return (
        <Dialog variants={customVariants} transition={customTransition}>
            <DialogTrigger>
                <Power width={20} className='text-red-500' />
            </DialogTrigger>
            <DialogContent className='w-full max-w-md bg-white p-6 dark:bg-zinc-900'>
                <DialogHeader>
                    <DialogTitle className='text-zinc-900 dark:text-primary'>
                        <div className='flex'>
                            <TriangleAlert className='text-red-500' width={40} height={40} />
                        </div>
                    </DialogTitle>
                    <DialogDescription className='text-muted-foreground'>
                        Are you sure you would like to logout of your account?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex w-full space-x-3 mt-5">
                    <Button onClick={() => signOut()} variant='destructive'>
                        Logout
                    </Button>
                </div>
                <DialogClose />
            </DialogContent>
        </Dialog>
    );
}