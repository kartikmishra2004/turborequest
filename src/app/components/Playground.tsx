"use client"
import React, { useState } from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const METHODS = [
    { value: "get", label: "GET" },
    { value: "post", label: "POST" },
    { value: "put", label: "PUT" },
    { value: "delete", label: "DELETE" },
];

const PROTOCOLS = [
    { value: "http", label: "HTTP" },
    { value: "ws", label: "WebSocket" },
    { value: "graphql", label: "GraphQL" },
];

interface OpenFile {
    id: string;
    name: string;
}

export default function MainContent() {
    const [protocol, setProtocol] = useState("http");
    const [method, setMethod] = useState("get");
    const [url, setUrl] = useState("");
    const [activeTab, setActiveTab] = useState("params");
    const [openFiles, setOpenFiles] = useState<OpenFile[]>([
        { id: "1", name: "Login Request" },
        { id: "2", name: "Get Users" },
    ]);
    const [activeFile, setActiveFile] = useState("1");

    const closeFile = (id: string) => {
        setOpenFiles(files => files.filter(f => f.id !== id));
        if (activeFile === id && openFiles.length > 1) {
            setActiveFile(openFiles[0].id === id ? openFiles[1].id : openFiles[0].id);
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col">
                    {/* Request Controls */}
                    <div className="p-5 border-b">
                        <div className="flex gap-4 mb-4">
                            <Select value={protocol} onValueChange={setProtocol}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select protocol" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PROTOCOLS.map((p) => (
                                        <SelectItem key={p.value} value={p.value}>
                                            {p.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {protocol === "http" && (
                                <Select value={method} onValueChange={setMethod}>
                                    <SelectTrigger
                                        className={cn(
                                            "w-[120px] font-semibold",
                                            method === "get" && "text-api-get",
                                            method === "post" && "text-api-post",
                                            method === "put" && "text-api-put",
                                            method === "delete" && "text-api-delete"
                                        )}
                                    >
                                        <SelectValue placeholder="Method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {METHODS.map((m) => (
                                            <SelectItem
                                                key={m.value}
                                                value={m.value}
                                                className={cn(
                                                    "font-semibold",
                                                    m.value === "get" && "text-api-get",
                                                    m.value === "post" && "text-api-post",
                                                    m.value === "put" && "text-api-put",
                                                    m.value === "delete" && "text-api-delete"
                                                )}
                                            >
                                                {m.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                            <input
                                type="text"
                                placeholder="Enter request URL"
                                className="flex-1 px-3 py-2 rounded-md border bg-background"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />

                            <Button>
                                <Send className="mr-2 h-4 w-4" />
                                Send
                            </Button>
                        </div>

                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList>
                                <TabsTrigger value="params">Params</TabsTrigger>
                                <TabsTrigger value="headers">Headers</TabsTrigger>
                                <TabsTrigger value="body">Body</TabsTrigger>
                            </TabsList>
                            <TabsContent value="params" className="p-4">
                                <div className="grid grid-cols-[1fr,1fr,auto] gap-2">
                                    <input
                                        type="text"
                                        placeholder="Key"
                                        className="px-3 py-1 rounded-md border bg-background text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        className="px-3 py-1 rounded-md border bg-background text-sm"
                                    />
                                    <Button variant="ghost" size="sm">Add</Button>
                                </div>
                            </TabsContent>
                            <TabsContent value="headers" className="p-4">
                                <div className="grid grid-cols-[1fr,1fr,auto] gap-2">
                                    <input
                                        type="text"
                                        placeholder="Key"
                                        className="px-3 py-1 rounded-md border bg-background text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        className="px-3 py-1 rounded-md border bg-background text-sm"
                                    />
                                    <Button variant="ghost" size="sm">Add</Button>
                                </div>
                            </TabsContent>
                            <TabsContent value="body" className="p-4">
                                <textarea
                                    placeholder="Request body (JSON)"
                                    className="w-full h-32 px-3 py-2 rounded-md border bg-background text-sm font-mono"
                                />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Request/Response Area */}
                    <div className="flex-1 grid grid-cols-2 divide-x overflow-hidden">
                        <div className="p-4">
                            <h3 className="font-medium mb-3">Request</h3>
                            <div className="bg-muted/50 rounded-md p-4 h-[50vh]">
                                {/* Request preview will go here */}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium mb-3">Response</h3>
                            <div className="bg-muted/50 rounded-md p-4 h-[50vh]">
                                {/* Response content will go here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};