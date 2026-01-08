import fs from "fs";
import pdf from "pdf-parse";

/**
 * Best-effort PDF text extraction for ATS.
 * (Text-only, layout-agnostic, normalized)
 */
export async function extractTextFromPDF(pdfPath) {
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`PDF not found at: ${pdfPath}`);
  }

  const buffer = fs.readFileSync(pdfPath);

  const data = await pdf(buffer, {
    normalizeWhitespace: true,
    disableCombineTextItems: false,
  });

  let text = data.text || "";

  // Normalize
  text = text
    .replace(/\r/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .replace(/[^\x00-\x7F]/g, " ")
    .trim();

  return text;
}

