import React from 'react'
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
import { CollData } from '@/type';

type Props = {
    dialogOpen: boolean;
    setDialogOpen: (params: boolean) => void;
    handleCollData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    collData: CollData;
    CreateCollection: () => void;
    colLoading: boolean;
}

const CreateColModal: React.FC<Props> = ({ colLoading, dialogOpen, setDialogOpen, handleCollData, collData, CreateCollection }) => {
    return (
        <Dialog open={dialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex justify-between">
                        <DialogTitle>Create collection</DialogTitle>
                        <span onClick={() => setDialogOpen(false)} className=" cursor-pointer"><X className="h-4 w-4" /></span>
                    </div>
                    <DialogDescription>
                        Enter a name for your collection to continue.
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
                    <Button disabled={!collData.name} onClick={CreateCollection} type="submit">{colLoading ? (<div className="px-[0.7rem]"><div className="loader"></div></div>) : "Create"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateColModal