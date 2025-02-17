"use client"
import React, { useState } from "react";
import { Send } from "lucide-react";
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
import { CodeBlock } from "@/components/ui/code-block";
import Editor from "@monaco-editor/react";

const METHODS = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
];

const PROTOCOLS = [
    { value: "http", label: "HTTP" },
    { value: "ws", label: "WebSocket" },
    { value: "graphql", label: "GraphQL" },
];

const sampleResponse = `{
    "expand": "attributes",
    "link": {
        "rel": "self",
        "href": "http://localhost:8095/crowd/rest/usermanagement/1/user?username=my_username"
    },
    "name": "my_username",
    "first-name": "My",
    "last-name": "Username",
    "display-name": "My Username",
    "email": "user@example.test",
    "password": {
        "link": {
            "rel": "edit",
            "href": "http://localhost:8095/crowd/rest/usermanagement/1/user/password?username=my_username"
        }
    },
    "active": true,
    "attributes": {
        "link": {
            "rel": "self",
            "href": "http://localhost:8095/crowd/rest/usermanagement/1/user/attribute?username=my_username"
        },
        "attributes": []
    }
}`

export default function MainContent() {
    const [activeTab, setActiveTab] = useState("params");
    const [formData, setFormData] = useState({
        type: 'http',
        method: 'GET',
        URL: '',
        params: '', // Pending
        header: '', // Pending
        body: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { name: string, value: string | object | undefined }): void => {
        if ("target" in e) {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [e.name]: e.value,
            }));
        }
    };

    const handleSend = () => {
        let data = formData;
        data.body = JSON.parse(data.body);
    }
    return (
        <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col">
                    <div className="p-5 border-b">
                        <div className="flex gap-4 mb-4">
                            <Select value={formData.type} onValueChange={(value) => handleChange({ name: "type", value })}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {PROTOCOLS.map((p) => (
                                        <SelectItem key={p.value} value={p.value}>
                                            {p.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {formData.type === "http" && (
                                <Select value={formData.method} onValueChange={(value) => handleChange({ name: "method", value })}>
                                    <SelectTrigger className={cn("w-[120px]", formData.method === "GET" && "text-green-400", formData.method === "POST" && "text-blue-400", formData.method === "PUT" && "text-yellow-400", formData.method === "DELETE" && "text-red-400")}>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {METHODS.map((m) => (
                                            <SelectItem key={m.value} value={m.value} className={cn(m.value === "GET" && "text-green-400", m.value === "POST" && "text-blue-400", m.value === "PUT" && "text-yellow-400", m.value === "DELETE" && "text-red-400")}>
                                                {m.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            <input type="text" autoComplete="off" placeholder="Enter request URL" className="flex-1 px-3 py-2 rounded-md border bg-background" name="URL" value={formData.URL} onChange={handleChange} />
                            <Button onClick={handleSend}>
                                <Send className="mr-2 h-4 w-4" />
                                Send
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 divide-x overflow-hidden">
                        <div className="p-4">
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
                                        <Button variant="outline" size="sm">Add</Button>
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
                                        <Button variant="outline" size="sm">Add</Button>
                                    </div>
                                </TabsContent>
                                <TabsContent value="body" className="p-4">
                                    <div className="rounded-md overflow-hidden border">
                                        <Editor
                                            height="60vh"
                                            defaultLanguage="json"
                                            theme="vs-dark"
                                            value={formData.body}
                                            onChange={(value) => handleChange({ name: "body", value })}
                                            options={{
                                                fontSize: 14,
                                                minimap: { enabled: false },
                                                scrollBeyondLastLine: false,
                                            }}
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium mb-3">Response</h3>
                            <CodeBlock language="jsx" filename="Login.json" highlightLines={[]} code={sampleResponse} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};