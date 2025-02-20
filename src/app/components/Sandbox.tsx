"use client"
import { ChevronRight, ChevronDown, FileJson, Folder, FolderPlus, Plus, X } from "lucide-react";
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
import { useAuth } from "@/context/authContext";
import { Session } from "next-auth";
import React, { useState, useEffect } from "react";
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

export default function Sandbox({ session }: SideBarProps) {

    const { getData, loading } = useAuth();
    const [openCollections, setOpenCollections] = useState<Record<string, boolean>>({});
    const [collData, setCollData] = useState({
        name: '',
        email: session?.user?.email,
    });
    const [userData, setUserData] = useState<User>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState("params");
    const [formData, setFormData] = useState({
        type: 'http',
        method: 'GET',
        URL: '',
        params: '',
        header: '',
        body: '',
    });
    const [isOpen, setIsOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false)


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
            setDialogOpen(false);
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
        const data = formData;
        console.log(data);
    }

    return (
        <>
            <Dialog open={dialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <div className="flex justify-between">
                            <DialogTitle>Create collection</DialogTitle>
                            <span onClick={() => setDialogOpen(false)} className=" cursor-pointer"><X className="h-4 w-4" /></span>
                        </div>
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
                        <Button disabled={!collData.name} onClick={CreateCollection} type="submit">Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <aside className="min-w-56 max-w-96 border-r h-[calc(100vh-3.5rem)] overflow-y-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 resize-x">
                <div className="p-5">
                    <div className="font-medium mb-2 flex justify-between items-center">
                        Collections
                        <div className="flex space-x-3">
                            <span onClick={() => setDialogOpen(true)} className="cursor-pointer">
                                <FolderPlus className="h-4 w-4" />
                            </span>
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
                                        <span onClick={() => setIsOpen(true)}>{item.name}</span>
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
            {/* Main content start */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-hidden">
                    {isOpen ?
                        (<div className="h-full flex flex-col">
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
                        </div>) :
                        (
                            <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-background to-zinc-900" />

                                <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                                    <div className="space-y-6">
                                        <h1 className="text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                                            Start organizing your requests
                                        </h1>

                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            Create a new collection to group your API requests, examples, and documentation in one place.
                                        </p>

                                        <div className="pt-4 space-x-5">
                                            <Button
                                                onClick={() => setDialogOpen(true)}
                                                size="lg"
                                                className=""
                                            >
                                                <span className="flex items-center gap-2">
                                                    <Plus className="w-5 h-5" />
                                                    <span>Create Collection</span>
                                                </span>
                                                <div className="absolute inset-0 pointer-events-none glass-morphism opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </Button>
                                            <Button
                                                size="lg"
                                                variant='outline'
                                                className=""
                                                onClick={() => console.log("Create collection clicked")}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span>New request</span>
                                                </span>
                                                <div className="absolute inset-0 pointer-events-none glass-morphism opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-zinc-800/20 to-transparent rounded-full blur-3xl" />
                                    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-zinc-800/20 to-transparent rounded-full blur-3xl" />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}