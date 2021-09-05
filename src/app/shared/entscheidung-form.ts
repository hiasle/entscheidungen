import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({ template: '' })
export abstract class EntscheidungForm<T, E> {

    constructor() {
        this.doSomething();
    }

    @Input() input: E | undefined;
    @Output() submit: EventEmitter<T> = new EventEmitter<T>();

    abstract doSomething(): void;

}
