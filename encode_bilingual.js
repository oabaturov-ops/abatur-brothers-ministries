const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "input.txt");
const outputFile = path.join(__dirname, "output.txt");

let raw = fs.readFileSync(inputFile, "utf8");
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);

const ruMatch = raw.match(/===RU===\s*([\s\S]*?)===EN===/);
const enMatch = raw.match(/===EN===\s*([\s\S]*?)$/);

if (!ruMatch || !enMatch) {
  console.log("Error: format must have ===RU=== and ===EN=== sections");
  process.exit(1);
}

function parseSection(text) {
  const lines = text.trim().split(/\r?\n/);
  const title = (lines[0] || "").trim();
  const excerpt = (lines[1] || "").trim();
  const category = (lines[2] || "").trim();
  let contentStart = 3;
  while (contentStart < lines.length && lines[contentStart].trim() === "") {
    contentStart++;
  }
  const contentLines = lines.slice(contentStart);
  const paragraphs = [];
  let current = "";
  for (const line of contentLines) {
    if (line.trim() === "") {
      if (current.trim()) {
        paragraphs.push(current.trim());
        current = "";
      }
    } else {
      current += (current ? " " : "") + line.trim();
    }
  }
  if (current.trim()) paragraphs.push(current.trim());
  const contentStr = paragraphs.join("\\n\\n");
  return { title, excerpt, category, contentStr, paragraphs };
}

const ru = parseSection(ruMatch[1]);
const en = parseSection(enMatch[1]);

const slugMap = {
  "\u0430":"a","\u0431":"b","\u0432":"v","\u0433":"g","\u0434":"d","\u0435":"e",
  "\u0451":"yo","\u0436":"zh","\u0437":"z","\u0438":"i","\u0439":"y","\u043A":"k",
  "\u043B":"l","\u043C":"m","\u043D":"n","\u043E":"o","\u043F":"p","\u0440":"r",
  "\u0441":"s","\u0442":"t","\u0433":"u","\u0444":"f","\u0445":"kh","\u0446":"ts",
  "\u0447":"ch","\u0448":"sh","\u0449":"shch","\u044A":"","\u044B":"y","\u044C":"",
  "\u044D":"e","\u044E":"yu","\u044F":"ya"," ":"-",
  "\u0410":"a","\u0411":"b","\u0412":"v","\u0413":"g","\u0414":"d","\u0415":"e",
  "\u0401":"yo","\u0416":"zh","\u0417":"z","\u0418":"i","\u0419":"y","\u041A":"k",
  "\u041B":"l","\u041C":"m","\u041D":"n","\u041E":"o","\u041F":"p","\u0420":"r",
  "\u0421":"s","\u0422":"t","\u0423":"u","\u0424":"f","\u0425":"kh","\u0426":"ts",
  "\u0427":"ch","\u0428":"sh","\u0429":"shch","\u042A":"","\u042B":"y","\u042C":"",
  "\u042D":"e","\u042E":"yu","\u042F":"ya",
};

let slug = ru.title.toLowerCase().split("").map(c => slugMap[c] || c).join("")
  .replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
if (!slug) slug = "article-" + Date.now();

const readTime = Math.max(1, Math.ceil(ru.paragraphs.join("").length / 1500)) + " \u043C\u0438\u043D";
const today = new Date().toISOString().slice(0, 10);

const id = Date.now();

const output = `  {
    id: ${id},
    slug: "${slug}",
    titleRu: "${ru.title.replace(/"/g, '\\"')}",
    titleEn: "${en.title.replace(/"/g, '\\"')}",
    excerptRu: "${ru.excerpt.replace(/"/g, '\\"')}",
    excerptEn: "${en.excerpt.replace(/"/g, '\\"')}",
    contentRu: \`${ru.contentStr.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
    contentEn: \`${en.contentStr.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
    date: "${today}",
    categoryRu: "${ru.category.replace(/"/g, '\\"')}",
    categoryEn: "${en.category.replace(/"/g, '\\"')}",
    readTime: "${readTime}",
  },`;

fs.writeFileSync(outputFile, output, "utf8");
console.log("Done! output.txt created");
console.log("  Slug: " + slug);
console.log("  RU: " + ru.title);
console.log("  EN: " + en.title);
console.log("  RU paragraphs: " + ru.paragraphs.length);
console.log("  EN paragraphs: " + en.paragraphs.length);