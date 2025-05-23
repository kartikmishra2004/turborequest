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
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { loadingStates, sampleResponse } from "@/constants";

export default function Sandbox({ session }: SandBoxProps) {

    const { getData, loading } = useAuth();
    const [userData, setUserData] = useState<User>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("headers");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [openReqModal, setOpenReqModal] = useState<boolean>(false);
    const [collData, setCollData] = useState<CollData>({ name: '', email: session?.user?.email });
    const [reqData, setReqData] = useState<ReqData>({ name: '', collectionName: '', email: session?.user?.email });
    const [formData, setFormData] = useState<FormData>({ name: "", type: 'http', method: 'GET', URL: '', headers: { "Content-Type": "application/json" }, body: '' });
    const [colLoading, setColLoading] = useState<boolean>(false);
    const [reqLoading, setReqLoading] = useState<boolean>(false);
    const [openedCol, setOpenCol] = useState<string>('');
    const [saved, setSaved] = useState<boolean>(false);
    const [headerKey, setHeaderKey] = useState<string>("");
    const [headerValue, setHeaderValue] = useState<string>("");
    const [response, setResponse] = useState<string>(sampleResponse);
    const [sendLoading, setSendLoading] = useState<boolean>(false);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [sandLoading, setSandLoading] = useState<boolean>(true);
    const [respStatus, setRespStatus] = useState<number | null>(null);
    const [respError, setRespError] = useState<string | unknown>('');

    useEffect(() => {
        async function fetchUser() {
            const data = await getData();
            setUserData(data as User);
        }
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    useEffect(() => {
        const form = localStorage.getItem("form-data");
        const parsedData = JSON.parse(form!);
        if (form) {
            setFormData(parsedData);
            setIsOpen(true);
        }
        setTimeout(() => {
            setSandLoading(false);
        }, 3000);
    }, [])

    const openRequest = (request: FormData, collName: string) => {
        localStorage.setItem("form-data", JSON.stringify(request));
        setFormData(request);
        setOpenCol(collName);
    }

    const CreateCollection = async () => {
        setColLoading(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/collection/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(collData),
            });
            setColLoading(false);
            setRefresh(prev => !prev);
            setDialogOpen(false);
        } catch {
            setColLoading(false);
            console.log("Failed to create collection!!");
        }
    }

    const CreateRequest = async () => {
        setReqLoading(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/request/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqData),
            });
            setReqLoading(false);
            setRefresh(prev => !prev);
            setOpenReqModal(false);
        } catch {
            setReqLoading(false);
            console.log("Failed to create request!!");
        }
    }

    const updateRequest = async () => {
        setSaveLoading(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/request/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: session?.user?.email,
                    collectionName: openedCol,
                    requestName: formData.name,
                    type: formData.type,
                    method: formData.method,
                    URL: formData.URL,
                    headers: formData.headers,
                    body: formData.body,
                }),
            });
            setSaveLoading(false);
            localStorage.setItem("form-data", JSON.stringify(formData));
            setSaved(true);
            setRefresh(prev => !prev);
            setTimeout(() => {
                setSaved(false);
            }, 2000);
        } catch {
            setSaveLoading(false);
            console.log("Failed to update request!!");
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

    const handleHeader = () => {
        setFormData((prev) => ({
            ...prev,
            headers: {
                ...prev.headers,
                [headerKey]: headerValue,
            }
        }))
        setHeaderKey("");
        setHeaderValue("");
    };

    const handleHeaderDelete = (key: string) => {
        setFormData((prev) => ({
            ...prev,
            headers: Object.fromEntries(Object.entries(prev.headers).filter(([k]) => k !== key)),
        }));
    }

    // Method for calling the API
    const handleSend = async () => {
        if (formData.type === "http") {
            const data: RequestInit = {
                method: formData.method,
                headers: Object.fromEntries(
                    Object.entries(formData.headers).map(([key, value]) => [key, String(value)])
                ) as Record<string, string>,
                body: formData.body === '' ? null : formData.body,
            };
            setSendLoading(true);
            try {
                const resp = await fetch(formData.URL, data);
                setRespStatus(resp.status);
                const response = await resp.json();
                setResponse(JSON.stringify(response, null, 2));
            } catch (error) {
                setRespError(error);
            } finally {
                setSendLoading(false);
            }
        } else if (formData.type === "ws") {
            console.log("Web Sockets!!");
        } else if (formData.type === "graphql") {
            console.log("GraphQL!!");
        }
    };

    const handleCloseRequest = () => {
        setIsOpen(false);
        setFormData({ name: "", type: 'http', method: 'GET', URL: '', headers: { "Content-Type": "application/json" }, body: '' });
        localStorage.removeItem("form-data");
    }

    return (
        <>
            <CreateReqModal reqLoading={reqLoading} CreateRequest={CreateRequest} reqData={reqData} handleReqChange={handleReqChange} userData={userData} openReqModal={openReqModal} setOpenReqModal={setOpenReqModal} />
            <CreateColModal colLoading={colLoading} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} handleCollData={handleCollData} collData={collData} CreateCollection={CreateCollection} />
            <Sidebar setRespStatus={setRespStatus} setResponse={setResponse} formData={formData} openRequest={openRequest} setOpenReqModal={setOpenReqModal} setDialogOpen={setDialogOpen} loading={loading} userData={userData} setIsOpen={setIsOpen} />
            <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-hidden">
                    {sandLoading ? (<Loader loadingStates={loadingStates} loading={sandLoading} duration={1000} />) : (isOpen ? (<Playground handleCloseRequest={handleCloseRequest} respError={respError} respStatus={respStatus} saveLoading={saveLoading} sendLoading={sendLoading} response={response} handleHeaderDelete={handleHeaderDelete} handleHeader={handleHeader} headerValue={headerValue} headerKey={headerKey} setHeaderValue={setHeaderValue} setHeaderKey={setHeaderKey} saved={saved} updateRequest={updateRequest} formData={formData} handleChange={handleChange} handleSend={handleSend} activeTab={activeTab} setActiveTab={setActiveTab} />) : (<Wellcome setOpenReqModal={setOpenReqModal} setDialogOpen={setDialogOpen} />))}
                </div>
            </div>
        </>
    )
}