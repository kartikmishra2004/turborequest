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
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

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

export default function MainContent() {
    const [protocol, setProtocol] = useState("http");
    const [method, setMethod] = useState("get");
    const [url, setUrl] = useState("");
    const [activeTab, setActiveTab] = useState("params");
    const [editCode, setEditCode] = useState("// Write your JavaScript code");

    const code = `{
   "expand" : "attributes",
   "link" : {
      "rel" : "self",
      "href" : "http://localhost:8095/crowd/rest/usermanagement/1/user?username=my_username"
   },
   "name" : "my_username",
   "first-name" : "My",
   "last-name" : "Username",
   "display-name" : "My Username",
   "email" : "user@example.test",
   "password" : {
      "link" : {
         "rel" : "edit",
         "href" : "http://localhost:8095/crowd/rest/usermanagement/1/user/password?username=my_username"
      }
   },
   "active" : true,
   "attributes" : {
      "link" : {
         "rel" : "self",
         "href" : "http://localhost:8095/crowd/rest/usermanagement/1/user/attribute?username=my_username"
      },
      "attributes" : []
   }
}`
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
                                    <CodeMirror
                                        value={editCode}
                                        height='60vh'
                                        extensions={[javascript()]}
                                        onChange={(value) => setEditCode(value)}
                                        theme='dark'
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium mb-3">Response</h3>
                            <CodeBlock language="jsx" filename="Login.json" highlightLines={[11]} code={code} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};