import {Todo,Todos} from '../domain/models';
import reducer, {SET,set} from './todos';
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

        it('set Action', () => {
            const todos = Todos.factory([{title:"sample",detail:"sample"}]);
            const action = set(todos);

            const setState = reducer(undefined,action);
            expect(Todos.getNumof(setState)).toBe(1);
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

        it('add Action', () => {
            const todo = Todo.factory({title:"sample",detail:"sample"});
            const action = add(todo);

            const addState = reducer(undefined,action);
            const [addTodo] = Todos.findByTitle(addState,"sample");
            expect(Todos.getNumof(addState)).toBe(1);
            expect(addTodo.title).toEqual("sample");
            expect(addTodo.detail).toEqual("sample");
        });
    });

    describe('update',() => {
        it('action update todo', () => {
            const todo = Todo.factory({
                title:'todo1',
                detail:'todo1',
            });
            const updateValues = {
                title:'update',
                detail:'update',
            };
            const action = update(todo.id,updateValues);
            expect(action.type).toBe(UPDATE);
            expect(action.payload.id).toEqual(todo.id);
            expect(action.payload.todoValues.title).toEqual(updateValues.title);
            expect(action.payload.todoValues.detail).toEqual(updateValues.detail);
        });

        it('update Action', () => {
            const todos = Todos.factory([{title:"sample",detail:"sample"}]);
            const [targetTodo] = Todos.findByTitle(todos,"sample");

            const updateValues:Todo.Values = {title:"update",detail:"update"};
            const action = update(targetTodo.id,updateValues);

            const updateState = reducer(todos,action);
            const [updateTodo] = Todos.findByTitle(updateState,"update");
            expect(updateTodo.title).toEqual(updateValues.title);
            expect(updateTodo.detail).toEqual(updateValues.detail);
        });
    });

    describe('remove',() => {
        it('action remove todos', () => {
            const action = remove('1');
            expect(action.type).toBe(REMOVE);
            expect(action.payload.id).toEqual('1');
        });

        it('remove Action', () => {
            const todos = Todos.factory([
                {title:"remove",detail:"remove"},
                {title:"sample",detail:"sample"},
            ]);
            const [targetTodo] = Todos.findByTitle(todos,"remove");
            const action = remove(targetTodo.id);

            const removeState = reducer(todos,action);
            expect(Todos.getNumof(removeState)).toBe(1);
        });
    });

    describe('toggle',() => {
        it('action toggle todo', () => {
            const action = toggle('1');
            expect(action.type).toBe(TOGGLE);
            expect(action.payload.id).toEqual('1');
        });

        it('toggle Action', () => {
            const todos = Todos.factory([
                {title:"toggle",detail:"toggle"},
                {title:"sample",detail:"sample"},
            ]);
            const [targetTodo] = Todos.findByTitle(todos,"toggle");
            const action = toggle(targetTodo.id);

            const toggleState = reducer(todos,action);
            const [toggleTodo] = Todos.findByTitle(toggleState,"toggle");
            expect(toggleTodo.completedAt).not.toBeNull();
        });
    });
});
