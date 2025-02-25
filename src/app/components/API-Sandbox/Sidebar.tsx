import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, FileJson, Folder, FolderPlus, Plus } from "lucide-react";
import { FormData, User } from "@/type";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
    setDialogOpen: (param: boolean) => void;
    loading: boolean;
    userData: User;
    setOpenReqModal: (params: boolean) => void;
    openRequest: (param1: FormData, param2: string) => void;
    setResponse: (params: string) => void;
    formData: FormData;
    setIsOpen: (params: boolean) => void;
};

const Sidebar: React.FC<Props> = ({
    formData,
    setResponse,
    openRequest,
    setOpenReqModal,
    setDialogOpen,
    loading,
    userData,
    setIsOpen,
}) => {
    const [openCollections, setOpenCollections] = useState<Record<string, boolean>>(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("openCollections") || "{}");
        }
        return {};
    });

    useEffect(() => {
        localStorage.setItem("openCollections", JSON.stringify(openCollections));
    }, [openCollections]);

    const toggleCollection = (collectionId: string) => {
        setOpenCollections((prev) => {
            const updatedCollections = { ...prev, [collectionId]: !prev[collectionId] };
            localStorage.setItem("openCollections", JSON.stringify(updatedCollections)); // Save to localStorage
            return updatedCollections;
        });
    };

    const handleOpen = (request: FormData, collName: string) => {
        openRequest(request, collName);
        setIsOpen(true);
        if (formData.name !== request.name) {
            setResponse(`{
    "message": "Your response will appear here!!"
}`);
        }
    };

    return (
        <aside className="min-w-56 max-w-96 border-r h-[calc(100vh-3.5rem)] overflow-x-hidden overflow-y-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="p-5">
                <div className="font-medium mb-2 flex justify-between items-center">
                    Collections
                    <div className="flex space-x-3">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span onClick={() => setDialogOpen(true)} className="cursor-pointer">
                                    <FolderPlus className="h-4 w-4" />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Create collection</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span onClick={() => setOpenReqModal(true)} className="cursor-pointer">
                                    <Plus className="h-4 w-4" />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Create request</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                {loading ? (
                    <div className="min-h-[calc(100vh-10rem)] text-muted-foreground flex justify-center items-center">
                        <span className="w-10 h-10 border-t-2 animate-spin border-primary rounded-full"></span>
                    </div>
                ) : userData?.collections && userData?.collections.length > 0 ? (
                    userData?.collections.map((item) => (
                        <div key={item._id}>
                            <div
                                onClick={() => toggleCollection(item._id)}
                                className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 rounded-sm cursor-pointer text-sm transition-colors duration-200"
                            >
                                {openCollections[item._id] ? (
                                    <ChevronDown className="h-4 w-4 shrink-0" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 shrink-0" />
                                )}
                                <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <span>{item.name.length > 16 ? item.name.slice(0, 16) + "..." : item.name}</span>
                            </div>
                            {openCollections[item._id] &&
                                item.requests.length > 0 &&
                                item.requests.map((request) => (
                                    <div
                                        onClick={() => handleOpen(request, item.name)}
                                        key={request._id}
                                        className={`pl-10 flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 ${formData.name === request.name ? "bg-accent/50" : ""
                                            } rounded-sm cursor-pointer text-sm transition-colors duration-200`}
                                    >
                                        <FileJson className="h-4 w-4 shrink-0 text-muted-foreground" />{" "}
                                        {request.name.length > 15 ? request.name.slice(0, 15) + "..." : request.name}
                                    </div>
                                ))}
                        </div>
                    ))
                ) : (
                    <div className="min-h-[calc(100vh-10rem)] text-muted-foreground flex justify-center items-center">
                        No collections
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;