import * as assert from "assert";
import { IChartItem } from "./../../src/interfaces/IChartItem";
import { priceEvolution } from "../../src/engine/analytics/priceEvolution";

it("analytics - pastFutureRatio", () => {
  const chart: IChartItem[] = require("./../mocks/appl.json");
  priceEvolution(chart, 3);

  assert.deepEqual(chart[3].priceEvolution, {
    "3": {
      past: 194.17,
      pastRelative: 0.014419309335980346,
      future: 176.98,
      futureRelative: -0.07538791076746254,
      pastLowest: 185.93,
      pastLowestRelative: -0.028629643174337804,
      pastHighest: 199.85,
      pastHighestRelative: 0.04409382999843259,
      futureLowest: 175.51,
      futureLowestRelative: -0.08306776030510421,
      futureHighest: 194.9695,
      futureHighestRelative: 0.01859620709471832
    }
  });
});
