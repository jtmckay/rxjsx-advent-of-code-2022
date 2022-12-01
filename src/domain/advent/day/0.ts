import { map, pipe } from 'rxjs'
import { newAdvent, solveAdvent, solveAdventBonus } from '../command'

export function day0() {
  newAdvent({ id: '0', input })
  solveAdvent({
    id: '0',
    transform: pipe(map((i) => i.input + 1)),
  })
  solveAdventBonus({
    id: '0',
    bonus: pipe(map((i) => i.input + 2)),
  })
}

const input = 'something'
