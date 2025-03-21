import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Check, Save, Send, Trash, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import Editor from "@monaco-editor/react";
import { METHODS, PROTOCOLS } from "@/constants";
import { Button } from '@/components/ui/button';
import { FormData } from '@/type';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Props = {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { name: string, value: string | object | undefined }) => void;
    handleSend: () => void;
    activeTab: string;
    setActiveTab: (params: string) => void;
    updateRequest: () => void;
    saved: boolean;
    setHeaderKey: (params: string) => void;
    setHeaderValue: (params: string) => void;
    headerKey: string;
    headerValue: string;
    handleHeader: () => void;
    handleHeaderDelete: (params: string) => void;
    response: string;
    sendLoading: boolean;
    saveLoading: boolean;
    respStatus: number | null;
    respError: string | unknown;
    handleCloseRequest: () => void;
}

const Playground: React.FC<Props> = ({ handleCloseRequest, respError, respStatus, saveLoading, sendLoading, response, handleHeaderDelete, handleHeader, headerKey, headerValue, setHeaderValue, setHeaderKey, saved, updateRequest, formData, handleChange, handleSend, activeTab, setActiveTab }) => {
    const responseError = respError ? `//Failed to send request!!
${respError}` : null;
    return (
        <div className="h-full flex flex-col">
            <div className="p-5 border-b">
                <div className="flex gap-4">
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
                        {sendLoading ? (<div className="px-[1.15rem]"><div className="loader"></div></div>) : (<><Send className="h-4 w-4" />Send</>)}
                    </Button>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button disabled={saved || saveLoading} onClick={updateRequest} variant='secondary'>
                                {saveLoading ? (<div className="loader invert"></div>) : (saved ? <Check className="h-4 w-4 mx-0.5" /> : <Save className="h-4 w-4 mx-0.5" />)}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Save request</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <X onClick={handleCloseRequest} className="h-5 w-5 mt-2 cursor-pointer text-muted-foreground hover:text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Close request</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-2 divide-x overflow-hidden">
                <div className="pt-4 px-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                            <TabsTrigger value="headers">Headers</TabsTrigger>
                            <TabsTrigger value="body">Body</TabsTrigger>
                        </TabsList>
                        <TabsContent value="headers" className="p-4">
                            <div className="flex xl:flex-row flex-col gap-2">
                                <input value={headerKey} onChange={(e) => setHeaderKey(e.target.value)} type="text" placeholder="Key" className="px-3 py-1 rounded-md border bg-background text-sm" />
                                <input value={headerValue} onChange={(e) => setHeaderValue(e.target.value)} type="text" placeholder="Value" className="px-3 py-1 rounded-md border bg-background text-sm" />
                                <Button disabled={!headerKey || !headerValue} variant="outline" size="sm" onClick={handleHeader}>Add</Button>
                            </div>
                            <div className="pt-5">
                                <div className="max-h-[calc(100vh-18rem)] overflow-y-auto border rounded-lg">
                                    <table className="w-full border-collapse text-sm">
                                        <thead className="text-primary sticky top-0">
                                            <tr>
                                                <th className="p-2 bg-zinc-900 border-b text-left">Key</th>
                                                <th className="p-2 bg-zinc-900 border-b border-l text-left">Value</th>
                                                <th className="p-2 bg-zinc-900 border-b border-l text-left"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(formData.headers).map(([key, value]) => {
                                                const stringValue = String(value);
                                                return (
                                                    <tr key={key}>
                                                        <td className="p-2 border-t border-r bg-zinc-900 text-muted-foreground">{key}</td>
                                                        <td className="p-2 border-t border-r bg-zinc-900 text-muted-foreground">
                                                            {stringValue.length > 45 ? stringValue.slice(0, 45) + "..." : stringValue}
                                                        </td>
                                                        <td className="p-2 w-4 border-t bg-zinc-900 text-muted-foreground">
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <span className='cursor-pointer' onClick={() => handleHeaderDelete(key)}>
                                                                        <Trash className="h-4 w-4" />
                                                                    </span>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Delete field</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="body" className="p-4">
                            {formData.method !== "GET" ? <div className="rounded-md overflow-hidden border">
                                <Editor
                                    height="66.5vh"
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

                            </div> :
                                <div className="h-[60vh] flex justify-center pt-4">
                                    <div className="w-full mb-8">
                                        <div className="flex items-start gap-4">
                                            <AlertCircle className="h-5 w-5 text-foreground mt-0.5" />
                                            <div className="flex-1">
                                                <h3 className="text-foreground text-lg font-semibold mb-2">
                                                    GET Request Warning
                                                </h3>
                                                <p className="text-muted-foreground text-sm leading-relaxed">
                                                    GET requests should not include a request body. While some clients may allow it,
                                                    the HTTP specification does not support request bodies for GET methods.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="p-4">
                    <div className="flex justify-between">
                        <h3 className="font-medium mb-3">Response</h3>
                        <h3 className={`font-medium mb-3 ${respError ? 'text-red-400' : (respStatus! < 300 ? "text-green-400" : respStatus! < 400 ? "text-blue-400" : respStatus! < 500 ? "text-red-400" : "text-yellow-400")}`}>{!respError ? respStatus : "404"}</h3>
                    </div>
                    <CodeBlock language="jsx" filename={`${formData.name}.json`} highlightLines={[]} code={responseError || response} minHeight='100vh' />
                </div>
            </div>
        </div>
    )
}

export default Playground