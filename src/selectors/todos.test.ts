import * as Selectors from "./todos";

import * as Domain from "../domain/models";
import {createStore} from "../store";
import {add, toggle} from "../modules/todos";
import sleep from "../lib/sleep";


describe('todos selectors', () => {
    describe('getTodos', () => {
        it('return array of todos sorted by createdAt desc', async () => {
            const store = createStore();
            store.dispatch(add((Domain.Todo.factory({title:'foo'}))));
            await sleep(10);
            store.dispatch(add((Domain.Todo.factory({title:'bar'}))));

            const actual = Selectors.getTodos(store.getState());
            expect(actual.length).toBe(2);
            expect(actual[0].title).toEqual("bar");
        });
    });

    describe('getCompletedAll',() => {
        it('return array of completed todos ', async () => {
            const store = createStore();
            store.dispatch(add((Domain.Todo.factory({title:'foo'}))));
            await sleep(10);
            const todo = Domain.Todo.factory({title:'bar'});
            store.dispatch(add((todo)));
            store.dispatch(toggle(todo.id));

            const actual = Selectors.getCompletedAll(store.getState());

            expect(actual.length).toBe(1);
            expect(actual[0].isDone).toBe(true);
        });
    });

    describe('getNumofCompleted',() => {
        it('return completed todos count ', async () => {
            const store = createStore();
            store.dispatch(add((Domain.Todo.factory({title:'foo'}))));
            await sleep(10);
            const todo = Domain.Todo.factory({title:'bar'});
            store.dispatch(add((todo)));
            store.dispatch(toggle(todo.id));

            const actual = Selectors.getNumofCompleted(store.getState());

            expect(actual).toBe(1);
        });
    });

    describe('getStatistics',() => {
        it('return todos statistics ', async () => {
            const store = createStore();
            store.dispatch(add(Domain.Todo.factory({ title: 'foo' })));
            store.dispatch(add(Domain.Todo.factory({ title: 'bar' })));
            store.dispatch(add(Domain.Todo.factory({ title: 'buz' })));
            store.dispatch(toggle(Object.keys(store.getState().todos)[1]));

            const actual = Selectors.getStatistics(store.getState());
            expect(actual.numofAll).toBe(3);
            expect(actual.numofCompleted).toBe(1);
            expect(actual.numofUncompleted).toBe(2);
            expect(actual.completedRatio).toBeCloseTo(0.33);
            expect(actual.uncompletedRatio).toBeCloseTo(0.67);
        });
    });

    describe('getStatistics',() => {
        it('return todos statistics ', async () => {
            const store = createStore();
            store.dispatch(add(Domain.Todo.factory({ title: 'foo' })));
            store.dispatch(add(Domain.Todo.factory({ title: 'bar' })));
            store.dispatch(add(Domain.Todo.factory({ title: 'buz' })));

            store.dispatch(toggle(Object.keys(store.getState().todos)[1]));
            await sleep(10);
            store.dispatch(toggle(Object.keys(store.getState().todos)[0]));

            const actual = Selectors.getHistories(store.getState());
            expect(actual.length).toBe(2);
            expect(actual[0].title).toEqual("foo");
        });
    });
});
