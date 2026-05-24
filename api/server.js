#!/usr/bin/env node
/**
 * POST /api/subscribe — add email to Resend Audience (Segment)
 *
 * Env (set in DigitalOcean App Platform):
 *   RESEND_API_KEY
 *   RESEND_SEGMENT_ID   — Segment UUID from Resend dashboard
 *   PORT                — default 8080
 */

import http from "node:http";

const PORT = Number(process.env.PORT ?? 8080);
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const RESEND_SEGMENT_ID = process.env.RESEND_SEGMENT_ID ?? "";

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", c => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function isValidEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

async function resendCreateContact(email) {
  const res = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      segments: [{ id: RESEND_SEGMENT_ID }],
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (res.ok) {
    return { ok: true, existing: false, data };
  }

  const msg = data?.message ?? data?.error ?? res.statusText;
  if (/already exists|duplicate|contact already/i.test(String(msg))) {
    return { ok: true, existing: true };
  }

  return { ok: false, message: msg, status: res.status };
}

async function handleSubscribe(req, res) {
  if (!RESEND_API_KEY || !RESEND_SEGMENT_ID) {
    return json(res, 503, {
      error: "Subscribe is not configured yet (missing RESEND_API_KEY or RESEND_SEGMENT_ID).",
    });
  }

  let body;
  try {
    body = JSON.parse(await readBody(req));
  } catch {
    return json(res, 400, { error: "Invalid JSON body." });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!isValidEmail(email)) {
    return json(res, 400, { error: "Invalid email address." });
  }

  const result = await resendCreateContact(email);
  if (!result.ok) {
    console.error("Resend contact error:", result.status, result.message);
    return json(res, 502, { error: "Could not subscribe. Please try again." });
  }

  console.log(`Subscribed ${email}${result.existing ? " (already on list)" : ""}`);
  return json(res, 200, { ok: true, email, existing: result.existing });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

  // DO ingress strips the /api prefix before forwarding (e.g. /api/health → /health).
  if (req.method === "GET" && (url.pathname === "/health" || url.pathname === "/api/health")) {
    return json(res, 200, {
      ok: true,
      resend: Boolean(RESEND_API_KEY),
      segment: Boolean(RESEND_SEGMENT_ID),
    });
  }

  if (
    req.method === "POST" &&
    (url.pathname === "/subscribe" || url.pathname === "/api/subscribe")
  ) {
    return handleSubscribe(req, res);
  }

  json(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Subscribe API listening on :${PORT}`);
});
