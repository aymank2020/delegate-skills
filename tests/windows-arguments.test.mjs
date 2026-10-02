import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

for (const [skill, flags] of [
  ["codex-delegate", ["model"]],
  ["opencode-delegate", ["model", "agent", "variant", "session"]],
]) {
  for (const flag of flags) {
    for (const value of ["model & echo injection", "model%PATH%", "model|more", "model\nnext"]) {
      test(`${skill} rejects shell syntax in --${flag}: ${JSON.stringify(value)}`, { skip: process.platform !== "win32" }, () => {
        const script = fileURLToPath(new URL(`../skills/${skill}/scripts/relay.mjs`, import.meta.url));
        const result = spawnSync(process.execPath, [script, `--${flag}`, value], {
          input: "Read-only brief.", encoding: "utf8", windowsHide: true, timeout: 5000,
        });
        assert.equal(result.status, 2);
        assert.match(result.stderr, /unsupported characters/);
        assert.equal(result.stdout, "");
      });
    }
  }
}
