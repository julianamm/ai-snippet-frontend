import { json, redirect } from "@remix-run/node";
import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useActionData, useNavigation } from "@remix-run/react";
import { Snippet } from "~/types/snippet";
import { SnippetForm } from "~/components/SnippetForm";
import { SnippetList } from "~/components/SnippetList";
import { Navbar } from "~/components/Navbar";

function getTokenFromCookies(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  return cookieHeader?.split("; ").find(c => c.startsWith("token="))?.split("=")[1] || null;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const token = getTokenFromCookies(request);
  if (!token) return redirect("/login");

  const res = await fetch(`http://localhost:3000/snippets`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(`Error fetching snippets`);
  const data = await res.json();
  return json(data as Snippet[]);
}

export async function action({ request }: ActionFunctionArgs) {
  const token = getTokenFromCookies(request);
  if (!token) return redirect("/login");

  const formData = await request.formData();
  const text = formData.get("text");
  if (typeof text !== "string" || !text.trim()) {
    return json({ error: "Text is required" }, { status: 400 });
  }

  const res = await fetch(`http://localhost:3000/snippets`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const result = await res.json();
    return json({ error: result.error || "Error creating snippet" }, { status: res.status });
  }

  return null;
}

export default function Index() {
  const snippets = useLoaderData<Snippet[]>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <>
    <Navbar />
    <main className="bg-emerald-50 min-h-screen p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-slate-100 p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-emerald-900 text-center">
          AI Snippet Summarizer
        </h1>
          <SnippetForm isSubmitting={navigation.state === "submitting"} error={actionData?.error} />
        <hr className="my-8 border-t border-slate-100" />
        <h2 className="text-2xl font-semibold mb-4 text-emerald-800">Previous Snippets</h2>
        <SnippetList snippets={snippets} />
      </div>
    </main>
    </>
  );
}
