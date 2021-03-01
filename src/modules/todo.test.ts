import {Todo,Todos} from '../domain/models';
import {SET,set} from './todos';
import {ADD,add} from './todos';
import {UPDATE,update} from './todos';
import {REMOVE,remove} from './todos';
import {TOGGLE,toggle} from './todos';

describe('todos',() => {
    describe('set',() => {
        it('action set todos', () => {
            const todos = [
                {
                    title:'todo1',
                    detail:'todo1',
                },
                {
                    title:'todo2',
                    detail:'todo2',
                },
            ];
            const action = set(Todos.factory(todos));
            expect(action.type).toBe(SET);
            expect(Todos.getNumof(action.payload.todos)).toBe(2);
        });
    });

    describe('add',() => {
        it('action add todo', () => {
            const todo = {
                    title:'todo1',
                    detail:'todo1',
                };

            const action = add(Todo.factory(todo));
            expect(action.type).toBe(ADD);
            expect(action.payload.todo.title).toEqual('todo1');
            expect(action.payload.todo.detail).toEqual('todo1');
        });
    });

    describe('update',() => {
        it('action update todo', () => {
            const todo = {
                title:'todo1',
                detail:'todo1',
            };
            const todoValue = Todo.factory(todo);
            const action = update(todoValue.id,todoValue);
            expect(action.type).toBe(UPDATE);
            expect(action.payload.id).toEqual(todoValue.id);
            expect(action.payload.todo.title).toEqual(todo.title);
            expect(action.payload.todo.detail).toEqual(todo.detail);
        });
    });

    describe('remove',() => {
        it('action remove todos', () => {
            const action = remove('1');
            expect(action.type).toBe(REMOVE);
            expect(action.payload.id).toEqual('1');
        });
    });

    describe('toggle',() => {
        it('action toggle todo', () => {
            const action = toggle('1');
            expect(action.type).toBe(TOGGLE);
            expect(action.payload.id).toEqual('1');
        });
    });
});
