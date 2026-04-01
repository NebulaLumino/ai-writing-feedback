"use client";
import { useState } from "react";

export default function WritingFeedbackPage() {
  const [writingType, setWritingType] = useState("Essay/Article");
  const [sampleText, setSampleText] = useState("");
  const [focusAreas, setFocusAreas] = useState("Clarity, engagement, structure");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!sampleText.trim()) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ writingType, sampleText, focusAreas }),
    });
    const data = await res.json();
    setOutput(data.result || data.error);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-slate-950 to-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-300 mb-2">AI Writing Feedback</h1>
        <p className="text-slate-400 mb-8">Get detailed, actionable feedback on your writing</p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-zinc-500/20 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Writing Type</label>
              <select value={writingType} onChange={e => setWritingType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-zinc-500">
                {["Essay/Article","Blog post","Creative writing","Business writing","Academic paper","Email"].map(w => <option key={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Feedback Focus</label>
              <input value={focusAreas} onChange={e => setFocusAreas(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-zinc-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Your Writing *</label>
              <textarea value={sampleText} onChange={e => setSampleText(e.target.value)} rows={8}
                placeholder="Paste your writing here for feedback..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-zinc-500 resize-none" />
            </div>
            <button onClick={handleGenerate} disabled={loading}
              className="w-full bg-zinc-600 hover:bg-zinc-500 disabled:bg-zinc-800 text-white font-semibold py-3 rounded-xl transition-colors">
              {loading ? "Reviewing..." : "Get Writing Feedback"}
            </button>
          </div>
          <div className="bg-slate-900/60 border border-zinc-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-300 mb-4">Feedback</h2>
            {output ? (
              <pre className="text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed max-h-[600px] overflow-y-auto">{output}</pre>
            ) : (
              <div className="text-slate-500 flex items-center justify-center h-64">Feedback will appear here...</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
