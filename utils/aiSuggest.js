// utils/aiSuggest.js
const fetchFn = global.fetch ? global.fetch : require("node-fetch");

async function callOllama({ model, prompt }) {
  const resp = await fetchFn("http://127.0.0.1:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      options: { temperature: 0.3 },
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Ollama error ${resp.status}: ${txt}`);
  }

  const data = await resp.json();
  return (data.response || "").trim();
}

function buildPrompt(resume) {
  // keep it compact; your DB fields are strings
  return `
You are an ATS resume coach. Given the resume data below, produce improvement suggestions.

Rules:
- Output ONLY JSON.
- JSON schema:
{
  "summary_fixes": ["..."],
  "missing_sections": ["..."],
  "bullet_improvements": ["..."],
  "keywords_to_add": ["..."],
  "link_fixes": ["..."]
}
- Be specific, practical, and ATS-oriented.
- Do not invent facts. Only recommend structure/wording improvements.

Resume data:
${JSON.stringify(resume, null, 2)}
`.trim();
}

async function suggestImprovementsFromResume(resumeObj) {
  const model = process.env.AI_MODEL || "llama3.1:8b";
  const prompt = buildPrompt(resumeObj);

  const raw = await callOllama({ model, prompt });

  // attempt to parse JSON cleanly even if model adds stray text
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) {
    return {
      summary_fixes: [],
      missing_sections: [],
      bullet_improvements: [raw],
      keywords_to_add: [],
      link_fixes: [],
    };
  }

  const jsonStr = raw.slice(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    return {
      summary_fixes: [],
      missing_sections: [],
      bullet_improvements: [raw],
      keywords_to_add: [],
      link_fixes: [],
    };
  }
}

module.exports = { suggestImprovementsFromResume };
