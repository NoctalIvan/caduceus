import * as assert from "assert";
import { IChartItem } from "./../../src/interfaces/IChartItem";
import { movingAverages } from "./../../src/engine/analytics/movingAvg";

it("analytics - movingAvg", () => {
  const chart: IChartItem[] = require("./../mocks/appl.json");
  movingAverages(chart, 3)
  assert.deepEqual(chart[3].movingAverages, {
    "3": {
      sma: 190.14666666666668,
      ema: 191.23833333333334,
      wma: 190.01,
      wema: 190.14666666666668,
      smaRelative: -0.00660014279992327,
      emaRelative: -0.0008968531772982624,
      wmaRelative: -0.007314142416801617,
      wemaRelative: -0.0011958042363975352,
      smaDelta: -0.004815073272854242,
      emaDelta: 0.0008984647592462647,
      wmaDelta: 0.0009042782016275286,
      wemaDelta: 0.0005989765061642505
    }
  });
});
