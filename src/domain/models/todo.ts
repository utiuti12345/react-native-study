interface Model {
    readonly id: string;
    readonly title: string;
    readonly detail?: string;
    readonly createdAt: string;
    readonly updateAt: string;
    readonly completedAt: string | null;
}

import {v4 as generatedUuid} from 'react-native-uuid';

import {assertIsDefined} from '../../lib/assert';

export interface Values {
    readonly title: string;
    readonly detail?: string;
}

export function factory(todo: Values): Model {
    assertIsDefined(todo.title);

    const now = new Date().toISOString();

    return {
        id: generatedUuid(),
        title: todo.title,
        detail: todo.detail,
        createdAt: now,
        updateAt: now,
        completedAt: null,
    };
}

export function toggle(todo: Model): Model {
    const now = new Date().toISOString();
    return {
        ...todo,
        updateAt: now,
        completedAt: todo.completedAt === null ? now : null
    };
}

export function isDone(todo: Model): boolean {
    return todo.completedAt !== null;
}

export function change(todo: Model, newValue: Values): Model {
    assertIsDefined(newValue.title);

    const now = new Date().toISOString();
    return {
        ...todo,
        ...newValue,
        updateAt: now,
    };
}
