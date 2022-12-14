import { from, map, pipe, switchMap } from 'rxjs'
import { newAdvent, solveAdvent, solveAdventBonus } from '../command'

export function day0() {
  newAdvent({ id: '0', input })
  solveAdvent({
    id: '0',
    transform: pipe(
      switchMap((i) => from(i.input.split('\n'))),
      map((i) => i + 1)
    ),
  })
  solveAdventBonus({
    id: '0',
    bonus: pipe(
      switchMap((i) => from(i.input.split('\n'))),
      map((i) => i + 1)
    ),
  })
}

const input = `something`
