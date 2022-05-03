/**
 * @jest-environment jsdom
 * */
import React from "react";
import { render, screen, userEvent } from "@testing-library/react";

import PlayoffBracketCanvas from "../../src/lib/components/playoffBracketCanvas";
import { basicMatches } from "../testData";
import { renderWithUser } from "../helpers";

describe("PlayoffBracketCanvas", () => {
  describe("rendering", () => {
    test("rendering the whole bracket", () => {
      render(<PlayoffBracketCanvas matches={basicMatches} />);
      const svg = screen.queryByTestId("bracket");
      expect(svg).not.toBeNull();
    });
    test("count the number of matches and teams displayed", () => {
      render(<PlayoffBracketCanvas matches={basicMatches} />);
      const matches = screen.getAllByTestId("single-match");
      expect(matches.length).toBe(basicMatches.length);
    });
    test("count the number of teams displayed", () => {
      render(<PlayoffBracketCanvas matches={basicMatches} />);
      const teams = screen.getAllByTestId("single-team");
      expect(teams.length).toBe(basicMatches.length * 2);
    });
    test("highlighting", () => {
      let highlightedMatches = [];
      basicMatches.forEach((bm, idx) => {
        // highlight every third match
        let hm = { ...bm };
        hm.highlight = idx % 3 === 0 ? ["home"] : null;
        highlightedMatches.push(hm);
      });
      render(
        <PlayoffBracketCanvas
          matches={highlightedMatches}
          highlightColor={{ backgroundColor: "red", color: "pink" }}
        />
      );
      const matches = screen.getAllByTestId("team-highlight");
      expect(matches.length).toBe(
        highlightedMatches.filter((m) => m.highlight).length
      );
    });
  });

  describe("functionality", () => {
    test("clicking the match link text should do nothing when no clicHandler is provided", async () => {
      const { user } = renderWithUser(
        <PlayoffBracketCanvas matches={basicMatches} />
      );
      const matches = screen.getAllByTestId("match-link-text");
      await user.click(matches[0]);
      expect(screen.getAllByTestId("match-link-text").length).toBe(
        matches.length
      );
    });
    test("clicking the match should trigger the clickHandler", async () => {
      const handleSelectMatch = jest.fn();
      const { user } = renderWithUser(
        <PlayoffBracketCanvas
          matches={basicMatches}
          onSelectMatch={handleSelectMatch}
        />
      );
      const matches = screen.getAllByTestId("match-link-text");
      await user.click(matches[0]);
      expect(handleSelectMatch).toHaveBeenCalledWith(basicMatches[0]);
    });
    test("clicking a team should do nothing when no clickHandler provided", async () => {
      const { user } = renderWithUser(
        <PlayoffBracketCanvas matches={basicMatches} />
      );
      const teams = screen.getAllByTestId("team-name-text");
      await user.click(teams[0]);
      expect(screen.getAllByTestId("team-name-text").length).toBe(teams.length);
    });
    test("clicking a team should trigger the clickHandler", async () => {
      const handleSelectTeam = jest.fn();
      const { user } = renderWithUser(
        <PlayoffBracketCanvas
          matches={basicMatches}
          onSelectTeam={handleSelectTeam}
        />
      );
      const teams = screen.getAllByTestId("team-name-text");
      await user.click(teams[0]);
      expect(handleSelectTeam).toHaveBeenCalledWith(basicMatches[0], "home");
    });
    test("displaying the away team on top", async () => {
      const handleSelectTeam = jest.fn();
      const { user } = renderWithUser(
        <PlayoffBracketCanvas
          matches={basicMatches}
          onSelectTeam={handleSelectTeam}
          flipTeams={true}
        />
      );
      const teams = screen.getAllByTestId("team-name-text");
      await user.click(teams[0]);
      expect(handleSelectTeam).toHaveBeenCalledWith(basicMatches[0], "away");
    });
  });
});
