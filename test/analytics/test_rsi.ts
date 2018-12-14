import * as assert from "assert";
import { IChartItem } from "./../../src/interfaces/IChartItem";
import { rsi } from "./../../src/engine/analytics/rsi";

it("analytics - rsi", () => {
    const chart: IChartItem[] = require("./../mocks/appl.json")
    rsi(chart, 3)

    assert.deepEqual(chart[4].rsi, { '3': { rsi: 51.39, rsiDelta: 0.33549896049896066 } })
})
