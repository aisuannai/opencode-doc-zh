const fs = require("fs"), path = require("path");
const dir = "D:/code/code/docs/opencode-zh";
const files = fs.readdirSync(dir).filter(f => f.endsWith(".html"));
const set = new Set(files);
let broken = [], skel = [];
for (const f of files) {
  const html = fs.readFileSync(path.join(dir, f), "utf8");
  for (const m of html.matchAll(/href="([^"#]+)(#[^"]*)?"/g)) {
    let t = m[1];
    if (!t || t.startsWith("http") || t.startsWith("mailto")) continue;
    t = t.split("/").pop();
    if (t.endsWith(".html") && !set.has(t)) broken.push(f + " -> " + t);
  }
  if (f !== "index.html") {
    if (!html.includes('<link rel="stylesheet" href="assets/styles.css">')) skel.push(f + ":no-css");
    if (!html.includes('<script defer src="assets/nav.js"></script>')) skel.push(f + ":no-navjs");
    if (!html.includes('<div id="progress"></div>')) skel.push(f + ":no-progress");
    if (!html.includes('data-file="')) skel.push(f + ":no-datafile");
    if (!/<article class="doc">/.test(html)) skel.push(f + ":no-doc");
    if (!html.includes('<aside class="toc" id="toc">')) skel.push(f + ":no-toc");
    // unclosed aside sanity
    const opens = (html.match(/<aside\b/g) || []).length;
    const closes = (html.match(/<\/aside>/g) || []).length;
    if (opens !== closes) skel.push(f + ":aside-mismatch " + opens + "/" + closes);
    const pre = (html.match(/<pre\b/g) || []).length;
    const preC = (html.match(/<\/pre>/g) || []).length;
    if (pre !== preC) skel.push(f + ":pre-mismatch " + pre + "/" + preC);
  }
}
console.log("files:", files.length);
console.log("broken links:", broken.length);
console.log(broken.slice(0, 30).join("\n"));
console.log("skeleton issues:", skel.length);
console.log(skel.slice(0, 30).join("\n"));
