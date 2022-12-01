import { map, pipe } from 'rxjs'
import { newAdvent, solveAdvent, solveAdventBonus } from '../command'

export function day1() {
  newAdvent({ id: '1', input })
  solveAdvent({
    id: '1',
    transform: pipe(map((i) => i.input + 1)),
  })
  solveAdventBonus({
    id: '1',
    bonus: pipe(map((i) => i.input + 2)),
  })
}

const input = 'something'
