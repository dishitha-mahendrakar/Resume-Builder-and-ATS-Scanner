const { request } = require("undici");

async function extractResumeJSONWithAI(resumeText) {
  const endpoint = process.env.AI_ENDPOINT || "http://localhost:11434";
  const model = process.env.AI_MODEL || "llama3.1:8b";

  const prompt = `
You are an ATS resume parser.
Convert the RESUME TEXT into STRICT JSON only (no markdown, no commentary).
All keys must exist. Use "" if missing. Every value MUST be a STRING.

Schema:
{
  "name": "",
  "email": "",
  "phone": "",
  "summary": "",
  "objective": "",
  "skills": "",
  "experience": "",
  "education": "",
  "projects": "",
  "interests": "",
  "certification": "",
  "courses": "",
  "technology": "",
  "languages": "",
  "links": "",
  "contacts": "",
  "positions": "",
  "profiles": "",
  "awards": "",
  "honors": "",
  "additional": ""
}

Rules:
- Return ONLY valid JSON.
- Do not hallucinate email/phone if not present.
- For multiple items, join with commas or new lines inside the string.

RESUME TEXT:
${resumeText}
`.trim();

  const res = await request(`${endpoint}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      options: { temperature: 0.1 },
    }),
  });

  const data = await res.body.json();
  let raw = (data.response || "").trim();

  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("AI did not return JSON");

  raw = raw.slice(start, end + 1);
  return JSON.parse(raw);
}

module.exports = { extractResumeJSONWithAI };
