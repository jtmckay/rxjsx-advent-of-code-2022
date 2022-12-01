import { eventFactory } from '@taterer/rx-entity'
import { merge, OperatorFunction } from 'rxjs'
import { MemoryEntity } from '../../persistence/memory'
import { Advent } from './event'

export enum AdventEvent {
  new = 'new',
  solve = 'solve',
  solveBonus = 'solveBonus',
}

export interface NewAdvent {
  id: string
  input: string
}

export const [newAdvent$, newAdvent] = eventFactory<NewAdvent>({
  entity: MemoryEntity.advent,
  eventType: AdventEvent.new,
})

export interface SolveAdvent {
  id: string
  transform: OperatorFunction<Advent, any>
}

export const [solveAdvent$, solveAdvent] = eventFactory<SolveAdvent>({
  entity: MemoryEntity.advent,
  eventType: AdventEvent.solve,
})

export interface SolveAdventBonus {
  id: string
  bonus: OperatorFunction<Advent, any>
}

export const [solveAdventBonus$, solveAdventBonus] =
  eventFactory<SolveAdventBonus>({
    entity: MemoryEntity.advent,
    eventType: AdventEvent.solveBonus,
  })

export const adventCommands$ = merge(
  newAdvent$,
  solveAdvent$,
  solveAdventBonus$
)
