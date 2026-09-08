import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9223;
const TARGET_URL = "http://localhost:5173/?print-deck=1";
const OUTPUT_PATH = path.resolve("public/Ferrel_Rashad_Portfolio_Deck.pdf");

async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function run() {
  console.log("Launching headless Chrome on port", PORT);
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--disable-gpu",
    "--no-sandbox",
    "--window-size=1200,675",
    "about:blank",
  ]);

  chrome.stderr.on("data", () => {});
  chrome.stdout.on("data", () => {});

  // Wait for Chrome to bind port
  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(200);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const data = await res.json();
      if (data.webSocketDebuggerUrl) {
        wsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {
      // retry
    }
  }

  if (!wsUrl) {
    chrome.kill();
    throw new Error("Could not connect to Chrome CDP");
  }

  console.log("Connected to CDP:", wsUrl);

  // Create new page target
  const targetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(TARGET_URL)}`, {
    method: "PUT",
  });
  const pageTarget = await targetRes.json();
  const pageWsUrl = pageTarget.webSocketDebuggerUrl;

  const ws = new WebSocket(pageWsUrl);

  let id = 1;
  const callbacks = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const { resolve, reject } = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise((resolve) => ws.onopen = resolve);

  console.log("WebSocket open, enabling Page and Runtime...");
  await send("Page.enable");
  await send("Runtime.enable");

  // Wait for document to load and images to complete
  console.log("Waiting for #pdf-deck-standalone and all images to be loaded...");
  let ready = false;
  for (let i = 0; i < 60; i++) {
    await sleep(250);
    const evalResult = await send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector('#pdf-deck-standalone');
        if (!el) return { ready: false, reason: 'no-element' };
        const imgs = Array.from(document.images);
        const allDone = imgs.every(img => img.complete && img.naturalHeight > 0);
        return { ready: allDone, count: imgs.length, allDone };
      })()`,
      returnByValue: true,
    });

    const val = evalResult?.result?.value;
    if (val && val.ready) {
      ready = true;
      break;
    }
  }

  // Extra pause for font rendering / animations
  await sleep(1000);

  console.log("Page is ready! Capturing printToPDF...");
  const pdfResult = await send("Page.printToPDF", {
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  });

  const buffer = Buffer.from(pdfResult.data, "base64");
  await fs.writeFile(OUTPUT_PATH, buffer);
  const altPath = path.resolve("public/portfolio-deck.pdf");
  await fs.writeFile(altPath, buffer);
  console.log(`Successfully generated PDF: ${OUTPUT_PATH} and ${altPath} (${buffer.length} bytes)`);

  ws.close();
  chrome.kill();
}

run().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
