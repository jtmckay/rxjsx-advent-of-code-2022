import { concatMap, filter, merge, Observable, of, switchMap } from 'rxjs'
import { memoryDb$, MemoryEntity } from '../../persistence/memory'
import { AdventEvent } from './command'
import { Advent, adventEntity$ } from './event'

export function getAdvent(id): Observable<
  Advent & {
    meta: {
      entity: MemoryEntity.advent
      eventType: AdventEvent
    }
  }
> {
  return merge(
    memoryDb$.pipe(concatMap((db) => db.get(MemoryEntity.advent, id))),
    adventEntity$.pipe(filter((i) => i.id === id))
  ).pipe(filter((i) => !!i))
}

export function getSolvedAdvent(id: string): Observable<string> {
  return getAdvent(id).pipe(
    filter((i) => i.meta.eventType === AdventEvent.solve),
    switchMap((i) => {
      if (i.transform) {
        return of(i).pipe(i.transform)
      } else {
        return of()
      }
    }),
    filter((i) => !!i)
  ) as Observable<string>
}

export function getSolvedAdventBonus(id: string): Observable<string> {
  return getAdvent(id).pipe(
    filter((i) => i.meta.eventType === AdventEvent.solveBonus),
    switchMap((i) => {
      if (i.bonus) {
        return of(i).pipe(i.bonus)
      } else {
        return of()
      }
    }),
    filter((i) => !!i)
  ) as Observable<string>
}
