import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Snippet } from "~/types/snippet";
import { SnippetForm } from "~/components/SnippetForm";
import { SnippetList } from "~/components/SnippetList";
import { Navbar } from "~/components/Navbar";

export async function loader() {
  const res = await fetch("http://localhost:3000/snippets");
  const data = await res.json();
  return json(data);
}

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
}


export default function Index() {
  const snippets = useLoaderData<Snippet[]>();

  return (
    <>
    <Navbar />
    <main className="bg-emerald-50 min-h-screen p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-slate-100 p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-emerald-900 text-center">
          AI Snippet Summarizer
        </h1>
        <SnippetForm />
        <hr className="my-8 border-t border-slate-100" />
        <h2 className="text-2xl font-semibold mb-4 text-emerald-800">Previous Snippets</h2>
        <SnippetList snippets={snippets} />
      </div>
    </main>
    </>
  );
}
