"use client";
import { CodeBlock } from "@/components/ui/code-block";

export default function CodeBlockDemo() {

  const code = `// Get started with APIs using a dummy API
fetch("https://turborequest.vercel.app/api/dummy", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ test: true })
})
    // Get instant results
    .then(response => response.json())
    .then(data => console.log(data)) // { success: true, message: "Dummy API response" }
    .catch(error => console.error(error));`;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <CodeBlock language="jsx" filename="Sample.js" highlightLines={[11]} code={code} />
    </div>
  );
}