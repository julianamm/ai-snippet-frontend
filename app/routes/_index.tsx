// app/routes/_index.tsx
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Snippet } from "~/types/snippet";

// Fetch snippets from your backend
export async function loader() {
  const res = await fetch("http://localhost:3000/snippets");
  const data = await res.json();
  return json(data);
}

// Send text to your backend API
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const method = request.method;

  if (method === "POST") {
    const text = formData.get("text");

    if (!text || typeof text !== "string") {
      return json({ error: "Invalid text input" }, { status: 400 });
    }

    const res = await fetch("http://localhost:3000/snippets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const result = await res.json();

    if (!res.ok) {
      return json({ error: result.error || "Something went wrong" }, { status: res.status });
    }

    return null;
  }

  if (method === "DELETE") {
    const id = formData.get("id");

    if (!id || typeof id !== "string") {
      return json({ error: "Invalid ID" }, { status: 400 });
    }

    const res = await fetch(`http://localhost:3000/snippets/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return json({ error: "Failed to delete snippet" }, { status: 500 });
    }

    return null;
  }

  return json({ error: "Method not allowed" }, { status: 405 });
}


export default function Index() {
  const snippets = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const sortedSnippets = [...snippets].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

  return (
    <main className="p-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">AI Snippet Summarizer</h1>

      <Form method="post" className="space-y-4">
        <textarea
          name="text"
          rows={5}
          className="w-full border border-gray-300 p-3 rounded shadow"
          placeholder="Paste your text here..."
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Generating..." : "Generate Summary"}
        </button>
      </Form>

      <hr className="my-6" />

      <section>
        <h2 className="text-xl font-semibold mb-2">Previous Snippets</h2>
        <ul className="space-y-4">
          {sortedSnippets.map((snippet: Snippet) => (
            <li key={snippet.id} className="border p-4 rounded bg-gray-50">
              <p className="text-gray-700 mb-2">
                <strong>Original:</strong> {snippet.text}
              </p>
              <p className="text-green-700">
                <strong>Summary:</strong> {snippet.summary}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(snippet.createdAt).toLocaleString()}
              </p>
              <Form method="delete"   onSubmit={(e) => {
                if (!confirm("Are you sure you want to delete this snippet?")) {
                  e.preventDefault();
                }
              }}>
                <input type="hidden" name="id" value={snippet.id} />
                <button
                  type="submit"
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </Form>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
