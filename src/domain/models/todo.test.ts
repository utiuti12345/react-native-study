import * as Todo from './todo';
import sleep from '../../lib/sleep';
import {toggle} from "./todo";

const ISO8601_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u;

describe('Todo',() => {
    describe('factory',() => {
       it('returns an instance of Todo model',() =>{
           const todo = Todo.factory({
               title:'Test Title',
               detail:'Test Detail'
           });

           expect(todo.title).toBe("Test Title");
           expect(todo.detail).toBe("Test Detail");
           expect(todo.completedAt).toBeNull();
           expect(todo.createdAt).toEqual(expect.stringMatching(ISO8601_PATTERN));love sumire for ever...

           expect(() => new Date(todo.createdAt)).not.toThrow();
           expect(todo.updateAt).toEqual(expect.stringMatching(ISO8601_PATTERN));
           expect(() => new Date(todo.updateAt)).not.toThrow();
           expect(todo.createdAt).toEqual(todo.updateAt);
       });
    });

    describe('toggle',() => {
        it('returns an instance of Todo that has inversed value of isDone', async () => {
            const todo = Todo.factory({
                title:'Test Title',
            });
            expect(todo.completedAt).toBeNull();

            await sleep(10);
            const toggled = Todo.toggle(todo);
            expect(toggled.completedAt).not.toBeNull();
            expect(toggled.createdAt).toBe(todo.createdAt);
            expect(new Date(toggled.updateAt).getTime()).toBeGreaterThan(new Date(todo.updateAt).getTime());

            await sleep(10);
            const undoed = Todo.toggle(toggled);
            expect(undoed.completedAt).toBeNull();
            expect(undoed.createdAt).toBe(todo.createdAt);
            expect(new Date(undoed.updateAt).getTime()).toBeGreaterThan(new Date(toggled.updateAt).getTime());
        });
    });

    describe('isDone',() => {
        it('isDone', () => {
            const uncompleted = Todo.factory({
                title:'sample todo'
            });

            expect(Todo.isDone(uncompleted)).toBe(false);
            const completed = Todo.toggle(uncompleted);
            expect(Todo.isDone(completed)).toBe(true);
        });
    });

    describe('change',() => {
        it('change', async () => {
            const todo = Todo.factory({
                title:'Test Title'
            });

            expect(todo.title).toBe("Test Title");
            expect(todo.detail).toBeUndefined();

            await sleep(10);
            const change = Todo.change(todo,{title:"Change",detail:"Change"})

            expect(change.title).toBe("Change");
            expect(change.detail).toBe("Change");
            expect(change.createdAt).toBe(todo.createdAt);
            expect(new Date(change.updateAt).getTime()).toBeGreaterThan(new Date(todo.updateAt).getTime());
        });
    });
});
