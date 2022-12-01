import { EntityEventHandlers, entityServiceFactory } from '@taterer/rx-entity'
import { OperatorFunction } from 'rxjs'
import { memoryDb$, MemoryEntity } from '../../persistence/memory'
import {
  adventCommands$,
  AdventEvent,
  NewAdvent,
  SolveAdvent,
  SolveAdventBonus,
} from './command'

export interface Advent {
  id: string
  input: string
  transform?: OperatorFunction<Advent, any>
  bonus?: OperatorFunction<Advent, any>
}

export const adventEventHandlers: EntityEventHandlers<Advent, AdventEvent> = {
  [AdventEvent.new]: (entity, event: NewAdvent) => {
    return {
      id: event.id,
      input: event.input,
    }
  },
  [AdventEvent.solve]: (entity, event: SolveAdvent) => {
    return {
      ...entity,
      transform: event.transform,
    }
  },
  [AdventEvent.solveBonus]: (entity, event: SolveAdventBonus) => {
    return {
      ...entity,
      bonus: event.bonus,
    }
  },
}

export const adventEntity$ = adventCommands$.pipe(
  entityServiceFactory(memoryDb$, MemoryEntity.advent, adventEventHandlers)
)
