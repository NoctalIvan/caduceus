import { IQuestion } from '../src/interfaces/IQuestion'
import { ComparisonOperator } from '../src/enums/ComparisonOperator';
import { fetchAndAnswer } from '../src/engine/answerQuestion'
import * as assert from 'assert'

describe('answerQuestion', () => {
    it('should resolve an easy question', async () => {
        const question:IQuestion = {
            symbol: 'aapl',
            condition: {
                analytic: {
                    type: 'smaDelta',
                    period: 7
                },
                comparison: {
                    operator: ComparisonOperator.GT,
                    value: 1
                },
            },
            resultCondition: {
                analytic: {
                    type:'highestFutureRatio',
                    period: 3,
                },
                comparison: {
                    operator: ComparisonOperator.GT,
                    value: 0.5
                }
            }
        }

        const answer = await fetchAndAnswer(question)
        assert.ok(answer)
        assert.ok(answer.matchingSize > 1)
    } )
})