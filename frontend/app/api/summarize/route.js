// app/api/summarize/route.js
import { NextResponse } from "next/server";

/**
 * Proxy endpoint untuk brotoo-suma.hf.space
 * Request body: { url: string, type: "news" | "youtube" }
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const url = (body?.url || "").trim();
    const type = body?.type || "news";

    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    // Pilih endpoint sesuai type
    const path = type === "youtube" ? "/summarize-video" : "/summarize-news";
    const HF_BASE = "https://brotoo-suma.hf.space";
    const endpoint = `${HF_BASE}${path}`;

    // Optional API key jika diperlukan (simpan di server env)
    const HF_API_KEY = process.env.HF_API_KEY;
    const headers = { "Content-Type": "application/json" };
    if (HF_API_KEY) headers["Authorization"] = `Bearer ${HF_API_KEY}`;

    // Dua strategi payload (beberapa Spaces menerima {url}, lain {data: [url]})
    const tryPost = async (payload) => {
      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        // not JSON -> forward raw text
        json = { raw: text };
      }
      return { ok: res.ok, status: res.status, json };
    };

    // 1) coba { url }
    let attempt = await tryPost({ url });
    // 2) jika gagal atau response tidak mengandung json useful, coba { data: [url] }
    if (!attempt.ok || (!attempt.json || Object.keys(attempt.json).length === 0)) {
      attempt = await tryPost({ data: [url] });
    }

    if (!attempt.ok && attempt.status !== 200) {
      // kembalikan error dari space
      return NextResponse.json(
        { error: "Upstream error from space", status: attempt.status, raw: attempt.json },
        { status: 502 }
      );
    }

    // Normalisasi hasil: cari common fields
    const raw = attempt.json;
    let normalized = null;

    // Common shapes:
    // - { data: ["summary", {...}] }
    // - { summary: "..." }
    // - { result: "..."} or string
    if (typeof raw === "string") {
      normalized = raw;
    } else if (Array.isArray(raw?.data) && raw.data.length > 0) {
      // if first item is string, use it
      if (typeof raw.data[0] === "string") normalized = raw.data[0];
      else normalized = raw.data;
    } else if (raw.summary) {
      normalized = raw.summary;
    } else if (raw.result) {
      normalized = raw.result;
    } else if (raw?.predictions && Array.isArray(raw.predictions) && typeof raw.predictions[0] === "string") {
      normalized = raw.predictions[0];
    } else {
      normalized = raw; // fallback: forward raw object
    }

    return NextResponse.json({ ok: true, summary: normalized, raw }, { status: 200 });
  } catch (err) {
    console.error("/api/summarize error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
