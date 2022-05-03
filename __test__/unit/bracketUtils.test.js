import {
  isExponentOfTwo,
  getTextX,
  offsets,
  getLineX,
  separateAndSplit,
  getTeamNameYPlacement,
  getFinalRound,
} from "../../src/lib/utils/bracketUtils";

import { basicMatches, unevenMatches } from "../testData";

describe("bracketUtils", () => {
  const matchWidt = 150;
  const matchHeight = 100;

  describe("isExponentOfTwo", () => {
    test.each`
      number | expected
      ${3}   | ${false}
      ${20}  | ${false}
      ${40}  | ${false}
    `(
      "returns false when number is not exponent of two ($number)",
      ({ number, expected }) => {
        const res = isExponentOfTwo(number);
        expect(res).toBe(expected);
      }
    );
    test.each`
      number | expected
      ${1}   | ${true}
      ${2}   | ${true}
      ${4}   | ${true}
      ${8}   | ${true}
      ${16}  | ${true}
      ${32}  | ${true}
      ${64}  | ${true}
      ${128} | ${true}
    `(
      "returns true when number is exponent of two ($number)",
      ({ number, expected }) => {
        const res = isExponentOfTwo(number);
        expect(res).toBe(expected);
      }
    );
  });

  describe("getTextX", () => {
    it("should return text offset when anchor is start", () => {
      const res = getTextX("start");
      expect(res).toBe(offsets.text);
    });
    it("should return width - text offset when anchor is end", () => {
      const res = getTextX("end", matchWidt);
      expect(res).toBe(matchWidt - offsets.text);
    });
    it("should return width / 2 when anchor is not start or end", () => {
      const res = getTextX("middle", matchWidt);
      expect(res).toBe(matchWidt / 2);
    });
  });

  describe("getLineX", () => {
    it("should return line offset when anchor is start", () => {
      const res = getLineX("start");
      expect(res).toBe(offsets.lines);
    });
    it("should return width - line offset when anchor is end", () => {
      const res = getLineX("end", matchWidt);
      expect(res).toBe(matchWidt - offsets.lines);
    });
    it("should return width / 2 when anchor is not start or end", () => {
      const res = getLineX("middle", matchWidt);
      expect(res).toBe(matchWidt / 2);
    });
  });

  describe("separateAndSplit", () => {
    const getRounds = (matches) => {
      return new Array(...new Set(matches.map((m) => m.round))).sort(
        (a, b) => a - b
      );
    };
    it("should throw an error if number of matches in a round is not half the previous round", () => {
      expect(() => {
        separateAndSplit(
          { all: getRounds(unevenMatches) },
          "all",
          unevenMatches
        );
      }).toThrow(/half/i);
    });
    it("should throw an error if number of matches in a round is not an exponentiation of two", () => {
      expect(() => {
        separateAndSplit(
          { all: getRounds(unevenMatches) },
          "all",
          [...unevenMatches].slice(0, -1)
        );
      }).toThrow(/exponentiation/i);
    });
    it("should return the matches in order if not split", () => {
      const shuffledMatches = basicMatches
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      const rounds = getRounds(shuffledMatches);
      const res = separateAndSplit(
        { all: rounds },
        "all",
        shuffledMatches,
        false
      );
      expect(res.length).toBe(rounds.length);
      expect(res[0].length).toBe(
        basicMatches.filter((m) => m.round === rounds[0]).length
      );
      expect(res[1].length).toBe(
        basicMatches.filter((m) => m.round === rounds[1]).length
      );
      expect(res[2].length).toBe(
        basicMatches.filter((m) => m.round === rounds[2]).length
      );
    });
    it("should return the matches split into halfs", () => {
      const shuffledMatches = basicMatches
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      const rounds = getRounds(shuffledMatches);
      const res = separateAndSplit(
        { all: rounds },
        "all",
        shuffledMatches,
        true
      );
      expect(res.length).toBe(rounds.length * 2 - 1);
      expect(res[0].length).toBe(
        basicMatches.filter((m) => m.round === rounds[0]).length / 2
      );
      expect(res[1].length).toBe(
        basicMatches.filter((m) => m.round === rounds[1]).length / 2
      );
      expect(res[2].length).toBe(
        basicMatches.filter((m) => m.round === rounds[2]).length
      );
      expect(res[3].length).toBe(
        basicMatches.filter((m) => m.round === rounds[1]).length / 2
      );
      expect(res[4].length).toBe(
        basicMatches.filter((m) => m.round === rounds[0]).length / 2
      );
    });
  });

  describe("getTeamNameYPlacement", () => {
    it("should return height / 3 if verticalPosition is 0", () => {
      const res = getTeamNameYPlacement(0, matchHeight);
      expect(res).toBe(matchHeight / 3);
    });
    it("should return height * 4/5 if verticalPosition is 1", () => {
      const res = getTeamNameYPlacement(1, matchHeight);
      expect(res).toBe((matchHeight * 4) / 5);
    });
  });

  describe("getFinalRound", () => {
    it("should return 0 if array is empty", () => {
      const res = getFinalRound([]);
      expect(res).toBe(0);
    });
    it("should return the highest numbered round from the matches", () => {
      const res = getFinalRound(basicMatches);
      expect(res).toBe(3);
    });
  });
});
