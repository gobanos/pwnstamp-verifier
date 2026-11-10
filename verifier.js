// The web verifier: proofs are checked by pwnstamp-core compiled to WebAssembly
// (crates/pwnstamp-wasm), against the root embedded at build time. Nothing is sent anywhere.
import init, { verify, root_fingerprint } from "./pkg/pwnstamp_wasm.js";

const $ = (id) => document.getElementById(id);

// Unix seconds to `2026-11-10 14:00:00 UTC`.
function date(seconds) {
  return new Date(seconds * 1000).toISOString().replace("T", " ").replace(/\.\d+Z$/, " UTC");
}

const LEVELS = {
  user: "The scenario's unprivileged account.",
  root: "Root inside the target container.",
};

function show(result) {
  $("result").hidden = false;
  $("valid").hidden = !result.valid;
  $("invalid").hidden = result.valid;
  if (!result.valid) {
    $("check").textContent = result.error.check;
    $("reason").textContent = result.error.reason;
    return;
  }
  // textContent only: every field comes from the proof, the pseudo from whoever held the key.
  const p = result.proof;
  $("sub").textContent = p.sub;
  $("scenario").textContent = p.scenario.id;
  $("tuple").textContent = p.scenario.tuple;
  $("level").textContent = p.level;
  $("level-note").textContent = LEVELS[p.level] ?? "";
  $("window").textContent = `${date(p.window.notBefore)} to ${date(p.window.notAfter)}`;
  $("iat").textContent = date(p.iat);
  $("machine").textContent = p.machine;
}

function run() {
  const token = $("proof").value;
  if (token.trim() === "") {
    $("result").hidden = true;
    return;
  }
  show(JSON.parse(verify(token, Date.now() / 1000)));
}

await init();
$("noscript").hidden = true;
$("fingerprint").textContent = root_fingerprint();
$("verify").disabled = false;
$("form").addEventListener("submit", (event) => {
  event.preventDefault();
  run();
});
// A pasted proof is checked right away.
$("proof").addEventListener("paste", () => setTimeout(run, 0));
