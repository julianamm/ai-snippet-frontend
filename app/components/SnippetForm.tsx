import { Form, useNavigation } from "@remix-run/react";

export function SnippetForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className="space-y-4">
      <label htmlFor="text" className="sr-only">
        Text to summarize
      </label>
      <textarea
        id="text"
        name="text"
        rows={6}
        className="w-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-4 rounded-lg shadow-sm resize-none placeholder-slate-500 transition outline-none"
        placeholder="Paste your text here..."
        required
      />
      <button
        type="submit"
        className="w-full bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-800 transition disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Generating summary..." : "Generate Summary"}
      </button>
    </Form>
  );
}
