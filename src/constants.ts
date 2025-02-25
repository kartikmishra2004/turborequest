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

export const loadingStates = [
    {
      text: "Setting up environment",
    },
    {
      text: "Connecting to server",
    },
    {
      text: "Preparing UI",
    }
  ];