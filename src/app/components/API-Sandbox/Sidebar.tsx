import { ChevronDown, ChevronRight, FileJson, Folder, FolderPlus } from 'lucide-react'
import React from 'react';
import { User } from "@/type";

type Props = {
    setDialogOpen: (param: boolean) => void;
    toggleCollection: (params: string) => void;
    setIsOpen: (params: boolean) => void;
    loading: boolean;
    userData: User;
    openCollections: Record<string, boolean>;
}

const Sidebar: React.FC<Props> = ({ setDialogOpen, loading, userData, toggleCollection, openCollections, setIsOpen }) => {
    return (
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
                                    <span>{item.name}</span>
                                </div>
                                {(openCollections[item._id]) && (item.requests.length > 0) &&
                                    (item.requests.map((request) => (
                                        <div  onClick={() => setIsOpen(true)} key={request._id} className="pl-10 flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 rounded-sm cursor-pointer text-sm transition-colors duration-200">
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
    )
}

export default Sidebar