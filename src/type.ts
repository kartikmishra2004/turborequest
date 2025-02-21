export interface Request {
    name: string;
    _id: string;
    type: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    URL: string;
    headers?: Record<string, string | number | boolean | null | string[]>;
    body?: string;
}

export interface Collection {
    _id: string;
    name: string;
    requests: Request[];
}

export type User = {
    id: string;
    fullName: string;
    email: string;
    photoURL?: string;
    collections: Collection[];
} | null;


export interface CollData {
    name: string,
    email?: string | null,
}

export interface ReqData {
    name: string,
    collectionName: string,
    email?: string | null,
}

export interface FormData {
    type: string;
    method: string;
    URL: string;
    headers?: Record<string, string | number | boolean | null | string[]>;
    body?: string;
}