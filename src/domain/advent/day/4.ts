import { map, pipe } from 'rxjs'
import { newAdvent, solveAdvent, solveAdventBonus } from '../command'

export function day4() {
  newAdvent({ id: '4', input })
  solveAdvent({
    id: '4',
    transform: pipe(map((i) => i.input + 1)),
  })
  solveAdventBonus({
    id: '4',
    bonus: pipe(map((i) => 2)),
  })
}

const input = `something`
