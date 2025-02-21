import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Save, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import Editor from "@monaco-editor/react";
import { METHODS, PROTOCOLS, sampleResponse } from "@/constants";
import { Button } from '@/components/ui/button';
import { FormData } from '@/type';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Props = {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { name: string, value: string | object | undefined }) => void;
    handleSend: () => void;
    activeTab: string;
    setActiveTab: (params: string) => void;
}

const Playground: React.FC<Props> = ({ formData, handleChange, handleSend, activeTab, setActiveTab }) => {
    return (
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
                        <Send className="h-4 w-4" />
                        Send
                    </Button>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='secondary'>
                                <Save className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Save request</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-2 divide-x overflow-hidden">
                <div className="p-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                            <TabsTrigger value="headers">Headers</TabsTrigger>
                            <TabsTrigger value="body">Body</TabsTrigger>
                        </TabsList>
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
    )
}

export default Playground