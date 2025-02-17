"use client"
import React, { useState } from "react";
import { ChevronRight, ChevronDown, FileJson, Folder, FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialogSn"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FileNode {
    name: string;
    type: string;
    children?: FileNode[];
}

const FileItem = ({ node, level = 0 }: { node: FileNode; level?: number }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            <div
                className={cn(
                    "flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 rounded-sm cursor-pointer text-sm",
                    "transition-colors duration-200"
                )}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
                onClick={() => node.type === "folder" && setIsOpen(!isOpen)}
            >
                {node.type === "folder" ? (
                    <>
                        {isOpen ? (
                            <ChevronDown className="h-4 w-4 shrink-0" />
                        ) : (
                            <ChevronRight className="h-4 w-4 shrink-0" />
                        )}
                        <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </>
                ) : (
                    <FileJson className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <span>{node.name}</span>
            </div>
            {node.type === "folder" && isOpen && node.children && (
                <div className="animate-slideIn">
                    {node.children.map((child, id) => (
                        <FileItem key={id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Sidebar() {

    const [demoFiles, setDemoFiles] = useState<FileNode[]>([]);
    const [collData, setCollData] = useState({
        name: '',
        type: 'folder',
        children: [],
    });

    const handleCreateCollection = () => {
        const collection = {
            name: collData.name,
            type: "folder",
        };
        setDemoFiles((prev) => [...prev, collection]);
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
                {demoFiles.length > 0 ?
                    (demoFiles.map((file, id) => (
                        <FileItem key={id} node={file} />
                    ))) : <div className="min-h-[calc(100vh-10rem)] text-muted-foreground flex justify-center items-center">No collections</div>}
            </div>
        </aside>
    );
};