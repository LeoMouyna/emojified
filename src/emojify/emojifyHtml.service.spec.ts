import { EmojifyHtmlService } from "./emojifyHtml.service";
import { emojis } from "./emojis";

describe("EmojifyHtmlService", () => {
  const emojifyService = new EmojifyHtmlService(emojis);
  it("shouldn't add space on html content", () => {
    const content =
      '<span class=“readapt-content”><span class=“readapt-syllable-1">Eur</span><span class=“readapt-syllable-2”>a</span><span class=“readapt-syllable-1">sia</span></span>';
    expect(emojifyService.emojify(content)).toBe(content);
  });
  it("should add emoji on known keywords", () => {
    const content =
      '<p>The <b>dog</b> or <b>domestic dog</b> (<i>Canis familiaris</i><sup id="cite_ref-Alvares2019_4-0" class="reference"><a href="#cite_note-Alvares2019-4" data-ol-has-click-handler="">[4]</a></sup><sup id="cite_ref-FOOTNOTEWangTedford20081_5-0" class="reference"><a href="#cite_note-FOOTNOTEWangTedford20081-5" data-ol-has-click-handler="">[5]</a></sup> or <i>Canis lupus familiaris</i><sup id="cite_ref-FOOTNOTEWangTedford20081_5-1" class="reference"><a href="#cite_note-FOOTNOTEWangTedford20081-5" data-ol-has-click-handler="">[5]</a></sup>) is a <a href="/wiki/Domestication" title="Domestication">domesticated</a> descendant of the <a href="/wiki/Wolf" title="Wolf">wolf</a>.</p>';
    const expected =
      '<p>The <b>🐶 dog</b> or <b>domestic 🐶 dog</b> (<i>Canis familiaris</i><sup id="cite_ref-Alvares2019_4-0" class="reference"><a href="#cite_note-Alvares2019-4" data-ol-has-click-handler="">[4]</a></sup><sup id="cite_ref-FOOTNOTEWangTedford20081_5-0" class="reference"><a href="#cite_note-FOOTNOTEWangTedford20081-5" data-ol-has-click-handler="">[5]</a></sup> or <i>Canis lupus familiaris</i><sup id="cite_ref-FOOTNOTEWangTedford20081_5-1" class="reference"><a href="#cite_note-FOOTNOTEWangTedford20081-5" data-ol-has-click-handler="">[5]</a></sup>) is a <a href="/wiki/Domestication" title="Domestication">domesticated</a> descendant of the <a href="/wiki/Wolf" title="Wolf">🐺 wolf</a>.</p>';
    expect(emojifyService.emojify(content)).toBe(expected);
  });
});
