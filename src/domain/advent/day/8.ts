import { from, map, pipe, switchMap } from 'rxjs'
import { newAdvent, solveAdvent, solveAdventBonus } from '../command'

export function day8() {
  newAdvent({ id: '8', input })
  solveAdvent({
    id: '8',
    transform: pipe(
      switchMap((i) => from(i.input.split('\n'))),
      map((i) => i + 1)
    ),
  })
  solveAdventBonus({
    id: '8',
    bonus: pipe(
      switchMap((i) => from(i.input.split('\n'))),
      map((i) => i + 1)
    ),
  })
}

const input = `something`
