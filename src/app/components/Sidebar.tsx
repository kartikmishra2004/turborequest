"use client"
import React, { useState } from "react";
import { /* ChevronRight, ChevronDown, FileJson, Folder, */ FolderPlus } from "lucide-react";
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

export default function Sidebar() {

    const { user } = useAuth();
    const [collData, setCollData] = useState({
        name: '',
        type: 'folder',
        children: [],
    });
    // const [isOpen, setIsOpen] = useState(true);

    const handleCreateCollection = () => {

    }

    const handleCollData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCollData({
            ...collData,
            [name]: value,
        })
    }
    return (
        <aside className="w-64 border-r max-h-[calc(100vh-3.5rem)] overflow-y-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                                        <Button disabled={!collData.name} onClick={handleCreateCollection} type="submit">Create</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                {user?.collections.map((item) => (
                    <div key={item._id} className="">{item.name}</div>
                ))}
            </div>
        </aside>
    );
};