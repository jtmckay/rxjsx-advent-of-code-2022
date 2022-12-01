import { concatMap, filter, from, merge, Observable, switchMap } from 'rxjs'
import { indexedDb$, IndexedDBEntity } from '../../persistence/indexed-db'
import { TodoEvent } from './command'
import { Todo, todoEntity$ } from './event'

export function getAllTodos(): Observable<Todo> {
  return indexedDb$.pipe(
    concatMap((db) => db.query(IndexedDBEntity.todo)),
    switchMap((values) => from(values as Todo[]))
  )
}

export function getTodo(id): Observable<
  Todo & {
    meta: {
      entity: IndexedDBEntity
      eventType: TodoEvent
    }
  }
> {
  return merge(
    indexedDb$.pipe(concatMap((db) => db.get(IndexedDBEntity.todo, id))),
    todoEntity$.pipe(filter((i) => i.id === id))
  ).pipe(filter((i) => !!i))
}
