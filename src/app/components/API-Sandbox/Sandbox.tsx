"use client"
import { useAuth } from "@/context/authContext";
import { Session } from "next-auth";
import React, { useState, useEffect } from "react";
import { CollData, FormData, User, ReqData } from "@/type";
import Sidebar from "./Sidebar";
import CreateColModal from "./CreateColModal";
import Playground from "./Playground";
import Wellcome from "./Wellcome";
import CreateReqModal from "./CreateReqModal";

interface SandBoxProps {
    session?: Partial<Session> | null,
}

export default function Sandbox({ session }: SandBoxProps) {

    const { getData, loading } = useAuth();
    const [openCollections, setOpenCollections] = useState<Record<string, boolean>>({});
    const [userData, setUserData] = useState<User>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("headers");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [openReqModal, setOpenReqModal] = useState<boolean>(false);
    const [collData, setCollData] = useState<CollData>({ name: '', email: session?.user?.email });
    const [reqData, setReqData] = useState<ReqData>({ name: '', collectionName: '', email: session?.user?.email });
    const [formData, setFormData] = useState<FormData>({ type: 'http', method: 'GET', URL: '', header: {}, body: '' });

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

    const CreateRequest = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/request/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqData),
            });
            setRefresh(prev => !prev);
            setOpenReqModal(false);
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

    const handleReqChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string, value: string | object | undefined }): void => {
        if ("target" in e) {
            const { name, value } = e.target;
            setReqData({
                ...reqData,
                [name]: value,
            });
        } else {
            setReqData((prev) => ({
                ...prev,
                [e.name]: e.value,
            }))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { name: string, value: string | object | undefined }): void => {
        if ("target" in e) {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: name === "body" ? JSON.stringify(value) : value,
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
            <CreateReqModal CreateRequest={CreateRequest} reqData={reqData} handleReqChange={handleReqChange} userData={userData} openReqModal={openReqModal} setOpenReqModal={setOpenReqModal} />
            <CreateColModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} handleCollData={handleCollData} collData={collData} CreateCollection={CreateCollection} />
            <Sidebar setOpenReqModal={setOpenReqModal} setDialogOpen={setDialogOpen} loading={loading} userData={userData} toggleCollection={toggleCollection} openCollections={openCollections} setIsOpen={setIsOpen} />
            <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-hidden">
                    {isOpen ? (<Playground formData={formData} handleChange={handleChange} handleSend={handleSend} activeTab={activeTab} setActiveTab={setActiveTab} />) : (<Wellcome setDialogOpen={setDialogOpen} />)}
                </div>
            </div>
        </>
    )
}