import { describe, expect, it } from "vitest";
// Exercise the installed library's sanitizer, rather than duplicating its implementation.
// Load at runtime so the app compiler does not type-check third-party source files.
const sanitizerModule = "../../node_modules/maplibre-gl/src/util/dom.ts";
const { DOM } = await import(sanitizerModule);

describe("map attribution security", () => {
  it("removes consecutive event handlers while preserving attribution links", () => {
    const clean = DOM.sanitize('<details open onload="1" ontoggle="1">Map source</details><a href="https://example.com">Provider</a>');
    const container = document.createElement("div");
    container.innerHTML = clean;
    for (const element of container.querySelectorAll("*")) {
      expect(element.hasAttribute("onload")).toBe(false);
      expect(element.hasAttribute("ontoggle")).toBe(false);
    }
    expect(container.querySelector("a")?.getAttribute("href")).toBe("https://example.com");
    expect(container.textContent).toContain("Map source");
  });

});
