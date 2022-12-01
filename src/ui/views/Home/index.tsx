import { map, takeUntil } from 'rxjs'
import { loadAdvents } from '../../../domain/advent'
import {
  getSolvedAdvent,
  getSolvedAdventBonus,
} from '../../../domain/advent/query'

export default function Home({ destruction$ }) {
  const days = new Array(25).fill(1).map((_, index) => `${index + 1}`)

  setTimeout(loadAdvents)

  return (
    <div
      style={`
      padding: 20px;
    `}
    >
      <h1>Advent of Code 2022</h1>
      <p>Example application using the @taterer/rx-entity framework.</p>
      <br />
      <br />
      {days.map((day) => {
        return (
          <div
            style={`
            display: flex;
            margin: 10px;
            justify-content: space-between;
          `}
          >
            <div>
              <a
                href={`https://adventofcode.com/2022/day/${day}`}
                target='_blank'
              >
                Day {day}
              </a>
            </div>
            <div
              single$={getSolvedAdvent(day).pipe(
                map((solution) => {
                  return <span>Solution: {solution}</span>
                }),
                takeUntil(destruction$)
              )}
            />
            <div
              single$={getSolvedAdventBonus(day).pipe(
                map((solution) => {
                  return <span>Bonus: {solution}</span>
                }),
                takeUntil(destruction$)
              )}
            />
          </div>
        )
      })}
    </div>
  )
}
