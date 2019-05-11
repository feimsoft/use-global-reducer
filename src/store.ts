import { Reducer, ReducerAction, Dispatch, useState, useEffect } from 'react';
import { IGlobalStore, GlobalListener } from "./interfaces";

export class GlobalStore<ContextState, ContextAction> implements IGlobalStore<ContextState> {
    state: ContextState;
    listeners: GlobalListener<ContextState>[] = [];
    reducer: Reducer<ContextState, ContextAction>;

    constructor(initialState: ContextState, reducer: Reducer<ContextState, ContextAction>) {
        this.state = initialState;
        this.reducer = reducer;

        this.useCustom = this.useCustom.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.setState = this.setState.bind(this);
    }

    setState(newState: ContextState) {
        this.state = { ...this.state, ...newState };
        this.listeners.forEach((listener) => {
            listener(this.state);
        });
    }

    dispatch(action: ReducerAction<Reducer<ContextState, ContextAction>>) {
        let newState = this.reducer(this.state, action);
        this.setState(newState);
    }

    useCustom(): [ContextState, Dispatch<ReducerAction<Reducer<ContextState, ContextAction>>>] {
        const newListener = useState(this.state)[1];

        useEffect(() => {
            // Called just after component mount
            this.listeners.push(newListener);
            return () => {
                // Called just before the component unmount
                this.listeners = this.listeners.filter(listener => listener !== newListener);
            };
        }, []);

        return [this.state, this.dispatch];
    }
}