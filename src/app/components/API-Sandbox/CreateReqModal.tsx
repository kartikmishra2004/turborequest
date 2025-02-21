import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialogSn";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReqData, User } from "@/type";

type Props = {
    openReqModal: boolean;
    setOpenReqModal: (params: boolean) => void;
    userData: User;
    handleReqChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string, value: string | object | undefined }) => void;
    reqData: ReqData;
    CreateRequest: () => void;
    reqLoading: boolean;
}

const CreateReqModal: React.FC<Props> = ({ reqLoading, CreateRequest, reqData, openReqModal, setOpenReqModal, userData, handleReqChange }) => {
    return (
        <Dialog open={openReqModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex justify-between">
                        <DialogTitle>Create request</DialogTitle>
                        <span onClick={() => setOpenReqModal(!openReqModal)} className=" cursor-pointer"><X className="h-4 w-4" /></span>
                    </div>
                    <DialogDescription>
                        Enter a name for your request to continue.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">
                            Name
                        </label>
                        <Input onChange={handleReqChange} value={reqData.name} autoComplete="off" placeholder="Request name" name="name" id="name" className="col-span-3" />
                        <label htmlFor="collectionName">
                            Collection
                        </label>
                        <Select value={reqData.collectionName} onValueChange={(value) => handleReqChange({ name: "collectionName", value })}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a collection" />
                            </SelectTrigger>
                            <SelectContent className="max-h-48 overflow-y-auto">
                                {userData?.collections?.map((collection) => (
                                    <SelectItem key={collection._id} value={collection.name} >
                                        <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 rounded-sm cursor-pointer text-sm transition-colors duration-200">{collection.name.length > 26 ? collection.name.slice(0, 26) + "..." : collection.name}</div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={!reqData.collectionName || !reqData.name} onClick={CreateRequest}>{reqLoading ? (<div className="px-[0.7rem]"><div className="loader"></div></div>) : "Create"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateReqModal