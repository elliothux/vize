import { Function } from '../types';
import { action, observable } from 'mobx';

export enum HistoryOperationTypes {
    ADD_COMPONENT_INSTANCE,
    DELETE_COMPONENT_INSTANCE,
}

export class HistoryStore {}

export const historyStore = new HistoryStore();

export function withHistory(target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<Function>) {
    descriptor!.value = target[propertyKey] = ((...args: any[]) => {
        console.log(target, ...args);
        return (descriptor as any).initializer().bind(target)(...args);
    }).bind(target);
}
