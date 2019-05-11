import { Reducer } from 'react';
import { GlobalStore } from "./store";

export function useGlobalReducer<
    ContextState,
    ContextAction
>(
    reducer: Reducer<ContextState, ContextAction>,
    initialState: ContextState,
) {
    const store = new GlobalStore(initialState, reducer);
    return store.useCustom;
}
