import { sanitize } from "./webPageEmojify";

describe("Sanitize html content", () => {
  describe("with basic text", () => {
    it("should return it unchanged", () => {
      const basicText =
        "There have been two significant trends occurring within the second half of the 20th century in pet dogs' changing status. The first has been \"commodification\" , shaping it to conform to social expectations of personality and behavior. The second has been the broadening of the family's concept and the home to include dogs-as-dogs within everyday routines and practices.";
      expect(sanitize(basicText)).toBe(basicText);
    });
  });
  describe("with html tags", () => {
    it("should add spaces between tag and it content", () => {
      const htmlContent = "<p>The <b>dog</b> or <b>domestic dog</b></p>";
      const expected = "<p> The <b> dog </b> or <b> domestic dog </b> </p>";
      expect(sanitize(htmlContent)).toBe(expected);
    });
    describe("when tags has properties", () => {
      it("should add spaces between tag and it content only (not on properties)", () => {
        const htmlContent =
          '<h1 id="firstHeading" class="firstHeading mw-first-heading"><span class="mw-page-title-main">Dog</span></h1>';
        const expected =
          '<h1 id="firstHeading" class="firstHeading mw-first-heading"> <span class="mw-page-title-main"> Dog </span> </h1>';
        expect(sanitize(htmlContent)).toBe(expected);
      });
    });
    describe("when tags has style", () => {
      it("should add spaces between tag and it content only (not on style)", () => {
        const htmlContent =
          '<th colspan="2" style="text-align: center; background-color: rgb(235,235,210)">Dog<br></th>';
        const expected =
          '<th colspan="2" style="text-align: center; background-color: rgb(235,235,210)"> Dog <br> </th>';
        expect(sanitize(htmlContent)).toBe(expected);
      });
    });
  });
});
