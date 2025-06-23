import { Form, useActionData, useNavigation, useNavigate, Link } from "@remix-run/react";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { useAuth } from "~/context/AuthContext";
import { User } from "~/types/user";

type ActionData = { error: string } | { user: User };


export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return json<ActionData>({ error: "Email and password are required" }, { status: 400 });
  }

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return json<ActionData>({ error: "Invalid credentials" }, { status: 401 });
  }

  const user = await res.json();
  return json<ActionData>({ user });
}

export default function LoginPage() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { login } = useAuth();

  if (actionData && "user" in actionData) {
    login(actionData.user); 
    navigate("/"); 
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 p-8">
      <div className="bg-white p-8 border border-slate-100 rounded-xl shadow max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-emerald-800 text-center">Login</h1>
        <Form method="post" className="space-y-4">
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="w-full border border-slate-200 px-6 py-3 rounded"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border border-slate-200 px-6 py-3 rounded"
            required
          />
          {actionData && "error" in actionData && (
            <p className="text-red-500 text-center">{actionData.error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-emerald-700 text-white py-2 rounded hover:bg-emerald-800 disabled:opacity-50"
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? "Logging in..." : "Login"}
          </button>
        </Form>
      </div>
      <Link
        to="/"
        className="inline-block text-emerald-700 hover:underline text-sm mt-6"
      >
        ← Back to Home
      </Link>
    </main>

  );
}
