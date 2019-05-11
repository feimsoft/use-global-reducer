import { Dispatch, SetStateAction } from 'react';

export type GlobalListener<ContextState> = Dispatch<SetStateAction<ContextState>>;

export interface IGlobalStore<ContextState> {
    state: ContextState;
    listeners: GlobalListener<ContextState>[];
    setState: (newState: ContextState) => void;
}