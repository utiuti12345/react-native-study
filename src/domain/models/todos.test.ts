import * as Todo from './todo';
import * as Todos from './todos';
import {update} from "./todos";

const TODO_VALUES = [
    {
        title:'1',
        detail:'sample',
    },
    {
        title:'2',
        detail:'sample',
    },
    {
        title:'3',
        detail:'sample',
    },
];

const ISO8601_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u;

describe('Todos',() => {
    describe('factory',() => {
        it('return as instance of todo model ', () => {
            const todos = Todos.factory(TODO_VALUES);

            expect(Todos.getNumof(todos)).toBe(3);

            const [actual] = Todos.findByTitle(todos,'1');
            expect(actual.title).toBe('1');
            expect(actual.detail).toBe('sample');
            expect(actual.createdAt).toEqual(expect.stringMatching(ISO8601_PATTERN));
            expect(() => new Date(actual.createdAt)).not.toThrow();
            expect(actual.updateAt).toEqual(expect.stringMatching(ISO8601_PATTERN));
            expect(() => new Date(actual.updateAt)).not.toThrow();
            expect(actual.createdAt).toEqual(actual.updateAt);
        });
    });

    describe('add',() => {
        it('add todo model ', () => {
            const todos = Todos.factory(TODO_VALUES);

            expect(Todos.getNumof(todos)).toBe(3);

            const newValue = Todo.factory({title:'4',detail:'sample'});
            const added = Todos.add(todos,newValue);
            expect(Todos.getNumof(added)).toBe(4);
            expect(Todos.findByTitle(added,'4').length).toBe(1);
        });
    });

    describe('remove',() => {
        it('remove todo model ', () => {
            const todos = Todos.factory(TODO_VALUES);

            expect(Todos.getNumof(todos)).toBe(3);

            const [id] = Object.keys(todos);
            const removed = Todos.remove(todos,id);
            expect(Todos.getNumof(removed)).toBe(2);
        });
    });

    describe('update',() => {
        it('update todo model ', () => {
            const todos = Todos.factory(TODO_VALUES);

            const [id] = Object.keys(todos);
            const newValue = {title:'update',detail:undefined};
            const updated = Todos.update(todos,id,newValue);
            expect(updated[id].title).toEqual('update');
            expect(updated[id].detail).toBeUndefined();
            expect(new Date(updated[id].updateAt).getTime()).toBeGreaterThanOrEqual(new Date(todos[id].updateAt).getTime());
        });
    });

    describe('toggle',() => {
        it('toggle todo model',  () => {
            const todos = Todos.factory(TODO_VALUES);
            const [id] = Object.keys(todos);
            const toggled = Todos.toggle(todos,id);
            expect(toggled[id].completedAt).not.toBeNull();
        });
    });
});
