"use client"
import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, FileJson, Folder, FolderPlus } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialogSn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { Session } from "next-auth";

interface SideBarProps {
    session?: Partial<Session> | null,
}

interface Request {
    name: string;
    _id: string;
    type: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    URL: string;
    headers?: Record<string, string>;
    body?: unknown;
}

interface Collection {
    _id: string;
    name: string;
    requests: Request[];
}

type User = {
    id: string;
    fullName: string;
    email: string;
    photoURL?: string;
    collections: Collection[];
} | null;

export default function Sidebar({ session }: SideBarProps) {

    const { getData, loading } = useAuth();
    const [openCollections, setOpenCollections] = useState<Record<string, boolean>>({});
    const [collData, setCollData] = useState({
        name: '',
        email: session?.user?.email,
    });
    const [userData, setUserData] = useState<User>(null);
    const [refresh, setRefresh] = useState<boolean>(false);


    useEffect(() => {
        async function fetchUser() {
            const data = await getData();
            setUserData(data as User);
        }
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    const toggleCollection = (id: string) => {
        setOpenCollections((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    console.log(userData?.collections);

    const CreateCollection = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/collection/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(collData),
            });
            setRefresh(prev => !prev);
        } catch {
            console.log("Failed to create collection!!");
        }
    }

    const handleCollData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCollData({
            ...collData,
            [name]: value,
        })
    }
    return (
        <aside className="min-w-56 max-w-96 border-r h-[calc(100vh-3.5rem)] overflow-y-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 resize-x">
            <div className="p-5">
                <div className="font-medium mb-2 flex justify-between items-center">
                    Collections
                    <div className="flex space-x-3">
                        <Dialog>
                            <DialogTrigger>
                                <span>
                                    <FolderPlus className="h-4 w-4" />
                                </span>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create collection</DialogTitle>
                                    <DialogDescription>
                                        Enter a name for your collection to organize your API requests.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <label htmlFor="name" className="text-right">
                                            Name
                                        </label>
                                        <Input autoComplete="off" placeholder="Collection name" name="name" id="name" onChange={handleCollData} value={collData.name} className="col-span-3 placeholder:text-muted-foreground" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button disabled={!collData.name} onClick={CreateCollection} type="submit">Create</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                {loading ? ((<div className="min-h-[calc(100vh-10rem)] text-muted-foreground flex justify-center items-center"><span className="w-10 h-10 border-t-2 animate-spin border-primary rounded-full "></span></div>)) :
                    (userData?.collections?.length ?? 0) > 0 ?
                        (userData?.collections.map((item) => (
                            <div key={item._id} className="">
                                <div onClick={() => toggleCollection(item._id)} className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 rounded-sm cursor-pointer text-sm transition-colors duration-200">
                                    <>
                                        {openCollections[item._id] ? (
                                            <ChevronDown className="h-4 w-4 shrink-0" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4 shrink-0" />
                                        )}
                                        <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
                                    </>
                                    <span>{item.name}</span>
                                </div>
                                {(openCollections[item._id]) && (item.requests.length > 0) &&
                                    (item.requests.map((request) => (
                                        <div key={request._id} className="pl-10 flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 rounded-sm cursor-pointer text-sm transition-colors duration-200">
                                            <FileJson className="h-4 w-4 shrink-0 text-muted-foreground" /> {request.name}
                                        </div>
                                    )))
                                }
                            </div>
                        ))) :
                        (<div className="min-h-[calc(100vh-10rem)] text-muted-foreground flex justify-center items-center">No collections</div>)
                }
            </div>
        </aside>
    );
};