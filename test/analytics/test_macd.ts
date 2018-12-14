import * as assert from "assert";
import { IChartItem } from "./../../src/interfaces/IChartItem";
import { macd } from "./../../src/engine/analytics/macd";


it("analytics - macd", () => {
    const chart: IChartItem[] = require("./../mocks/appl.json");
    macd(chart, 3, 5, 4);
    assert.deepEqual(chart[11].macd, {
        "3_5_4": {
        macd: -0.11193386881288347,
        macdDelta: -0.9342620485527969,
        signal: -1.2020348627514907,
        signalDelta: 0.6045864545854831,
        histogram: 1.0901009939386073,
        histogramDelta: -0.7926425323985613
        }
    });
});
