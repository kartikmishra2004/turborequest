"use client";

import React, { useEffect, useState } from "react";

import { CodeBlock } from "@/components/ui/code-block";

export default function CodeBlockDemo() {

  const [response, setResponse] = useState({});

  const handleRunCode = async () => {
    try {
      const response = await fetch('/api/dummy', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ test: true }),
      });
      const resp = await response.json();
      setResponse(resp);
    } catch (error) {
      console.log("Error fetching data from the dummy API!!", error);
    }
  }

  useEffect(() => {
    handleRunCode();
  }, [])

  const code = `// Get started with APIs using a dummy API
const url = "https://turborequest.vercel.app/api/dummy";
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ test: true })
});

// Get instant results
console.log(response.status); // 200
console.log(response.data);   // { success: true, message: "Dummy API response" }`;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <CodeBlock language="jsx" filename="Sample.jsx" highlightLines={[12, 13]} code={code} />
    </div>
  );
}