"use client";

import { useState } from "react";
import {
  Wand2,
  Copy,
  Download,
  Loader2,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const ACCEPTED_FORMATS = ".mp4,.mov,.mkv,.m4a,.wav";

export default function Home() {
  const [mode, setMode] = useState("news");
  const [urlInput, setUrlInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  // progress bar
  const [progress, setProgress] = useState(0);

  // shimmer skeleton
  const [showSkeleton, setShowSkeleton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSummary("");

    setShowSkeleton(true);

    // start progress simulation
    setProgress(5);
    let interval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? prev : prev + 5));
    }, 300);

    setLoading(true);

    try {
      let response;

      if (mode === "news") {
        const url = urlInput.trim();
        if (!url) {
          setError("Input News URL");
          setLoading(false);
          clearInterval(interval);
          setProgress(0);
          setShowSkeleton(false);
          return;
        }

        response = await fetch("https://brotoo-suma.hf.space/summarize-news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
      } else {
        if (!file) {
          setError("Please upload your video first");
          setLoading(false);
          clearInterval(interval);
          setProgress(0);
          setShowSkeleton(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", file);

        response = await fetch(
          "https://brotoo-suma.hf.space/summarize-upload-video",
          { method: "POST", body: formData }
        );
      }

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || payload?.error) {
        setError(payload?.error || "There was an error while we process your request.");
        return;
      }

      setSummary(payload.summary || "Summary not found.");
      if (mode === "video") setFile(null);
    } catch (err) {
      setError(err?.message || "Network Error.");
    } finally {
      setLoading(false);
      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setProgress(0);
        setShowSkeleton(false);
      }, 450);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Summary is copied to your clip board");
    } catch {
      alert("Failed to copy");
    }
  };

  const downloadSummary = (text) => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center py-24 text-neutral-800 px-4">
        <div className="mb-8 px-6 py-3 bg-gray-300/10 backdrop-blur-lg rounded-full flex items-center gap-3">
          <Wand2 className="w-5 h-5" />
          <span className="font-medium">AI Summarizer</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center max-w-3xl">
          Summarize News & Videos <span className="text-teal-500">Instantly</span> With Suma AI
        </h1>

        <p className="mt-4 text-lg text-black/70 text-center max-w-xl">
          Just choose any mode, News or Video then click Upload & Summarize <br /> and leave the rest to us
        </p>

        {/* 🔥 NEW — Gradient progress bar + % text inside */}
        {(loading || progress > 0) && (
          <div className="w-full max-w-2xl mt-6 transition relative">
            <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full text-[10px] flex items-center justify-center text-white font-semibold transition-all duration-200"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #14b8a6, #0ea5e9, #14b8a6)",
                  backgroundSize: "200% 200%",
                  animation: "gradientMove 2s linear infinite",
                }}
              >
                {progress}%{/* % INSIDE BAR */}
              </div>
            </div>
          </div>
        )}

        {/* 🔥 gradient bar animation keyframes */}
        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-8 space-y-4">
          <div className="flex items-center justify-between bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl p-1 shadow-sm">
            <div className="flex gap-1">
              {["news", "video"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setMode(item);
                    setError("");
                    setSummary("");
                  }}
                  className={`px-5 py-2 rounded-xl font-semibold transition ${
                    mode === item ? "bg-teal-500 text-white shadow" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item === "news" ? "News" : "Video"}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center text-sm text-gray-500 gap-2 pr-3">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />
              <span>
                {mode === "news"
                  ? "Only for Trusted News URL"
                  : "Format: .mp4 .mov .mkv .m4a .wav"}
              </span>
            </div>
          </div>

          {mode === "news" ? (
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <div className="relative group shrink-0">
                  <button
                    type="button"
                    aria-label="Help"
                    className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    ?
                  </button>
                  <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute left-0 -top-40 w-72 z-50">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm text-gray-800">
                      <strong className="block text-sm mb-1">How to Use</strong>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Paste News URL with https tag (https://...)</li>
                        <li>Use the supported only sources.</li>
                        <li>Click the summarize button and leave it to us 😉.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Input Supported News URL"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none bg-gray-50 focus:ring-2 focus:ring-teal-400/60"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold disabled:opacity-60 flex items-center gap-2 shadow"
                >
                  {loading ? <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </> : "Summarize"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label
                htmlFor="video-upload"
                className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-2xl bg-white/60 p-6 cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition"
              >
                <UploadCloud className="w-8 h-8 text-teal-500" />
                <div className="text-center">
                  <p className="font-semibold text-gray-800">Upload video to summarize</p>
                  <p className="text-sm text-gray-500">Format: .mp4, .mov, .mkv, .m4a, .wav</p>
                </div>

                {file ? (
                  <div className="flex items-center gap-2 text-sm text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{file.name}</span>
                  </div>
                ) : (
                  <div className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-600">Choose File</div>
                )}

                <input
                  id="video-upload"
                  type="file"
                  accept={ACCEPTED_FORMATS}
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files?.[0];
                    setFile(selected || null);
                    setError("");
                  }}
                />
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold disabled:opacity-60 flex items-center gap-2 shadow"
                >
                  {loading ? <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </> : "Upload & Summarize"}
                </button>
              </div>
            </div>
          )}
        </form>

        {error && (
          <div className="mt-4 max-w-2xl w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <div className="text-sm">{error}</div>
          </div>
        )}

        {/* 🔥 shimmer skeleton while loading summary */}
        {showSkeleton && !summary && !error && (
          <div className="mt-8 w-full max-w-2xl animate-pulse">
            <div className="bg-gray-200 h-6 w-40 rounded mb-3" />
            <div className="bg-gray-200 h-4 w-28 rounded mb-5" />
            <div className="bg-gray-200 h-24 rounded" />
          </div>
        )}

        {/* summary card */}
        {summary && !showSkeleton && (
          <div className="mt-8 w-full max-w-2xl">
            <div className="bg-white border border-gray-100 shadow rounded-lg p-5">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="text-lg font-semibold">Summary</h3>
                  <p className="text-sm text-gray-500">
                    Source: {mode === "news" ? "News URL" : "Video Upload"}
                  </p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => copyToClipboard(summary)}
                    className="px-3 py-1 border rounded flex items-center gap-2 text-sm"
                  >
                    <Copy className="w-4 h-4" /> Copy
                  </button>
                  <button
                    onClick={() => downloadSummary(summary)}
                    className="px-3 py-1 border rounded flex items-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>

              <div className="mt-4 text-neutral-800">
                <p className="whitespace-pre-line leading-relaxed text-black/80">
                  {summary}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}