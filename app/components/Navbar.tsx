import { Form, Link } from "@remix-run/react";
import { useAuth } from "~/context/AuthContext";

export function Navbar() {
  const { user } = useAuth();


  return (
    <nav className="bg-emerald-700 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">AI Snippets</Link>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-emerald-100">Hello, {user.email}</span>
            <Form action="/logout" method="post">
              <button
                type="submit"
                className="bg-emerald-800 hover:bg-emerald-900 px-3 py-1 rounded"
              >
                Logout
              </button>
            </Form>
          </div>
        ) : (
          <Link to="/login" className="bg-emerald-800 hover:bg-emerald-900 px-3 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
