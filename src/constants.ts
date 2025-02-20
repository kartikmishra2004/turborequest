export const METHODS = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
];

export const PROTOCOLS = [
    { value: "http", label: "HTTP" },
    { value: "ws", label: "WebSocket" },
    { value: "graphql", label: "GraphQL" },
];

export const sampleResponse = `{
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