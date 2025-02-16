import React, { useState } from "react";
import { ChevronRight, ChevronDown, FileJson, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileNode {
    id: string;
    name: string;
    type: "file" | "folder";
    children?: FileNode[];
}

const demoFiles: FileNode[] = [
    {
        id: "1",
        name: "My Collection",
        type: "folder",
        children: [
            {
                id: "2",
                name: "Authentication",
                type: "folder",
                children: [
                    { id: "3", name: "Login.json", type: "file" },
                    { id: "4", name: "Register.json", type: "file" },
                ],
            },
            { id: "5", name: "Users.json", type: "file" },
            { id: "6", name: "Products.json", type: "file" },
        ],
    },
];

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
                    {node.children.map((child) => (
                        <FileItem key={child.id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Sidebar() {
    return (
        <aside className="w-64 border-r h-[calc(100vh-3.5rem)] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="p-4">
                <div className="font-medium mb-2">Collections</div>
                {demoFiles.map((file) => (
                    <FileItem key={file.id} node={file} />
                ))}
            </div>
        </aside>
    );
};