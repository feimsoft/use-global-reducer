# use-global-reducer
## How to install
npm:
```
npm install @feimsoft/use-global-reducer
```
yarn:
```
yarn add @feimsoft/use-global-reducer
```

## How to use
### Declare your global reducer
```ts
import {Reducer} from 'react';

interface GlobalState {
    navOpen: boolean;
}

type GlobalAction =
    | { type: 'open-nav' | 'close-nav' }

const reducer: Reducer<GlobalState, GlobalAction> = (state, action) => {
    switch (action.type) {
        case 'open-nav': return { ...state, navOpen: true }
        case 'close-nav': return { ...state, navOpen: false }
        default: throw new Error('Unexpected action');
    }
};

const useGlobal = useGlobalReducer(reducer, {
    header: null,
    navOpen: false
});

export default useGlobal;
```

### Consume your global state
```ts
const SideNav: FC = ({children}) => {
    const [globalState, globalDispatcher] = useGlobal();
    const handleClose = () => globalDispatcher({ type: 'close-nav' });
    const handleOpen = () => globalDispatcher({ type: 'open-nav' });

    return (
        <SwipeableDrawer
            open={globalState.navOpen}
            onClose={handleClose}
            onOpen={handleOpen}
        >
            <div
                tabIndex={0}
                role="button"
                onClick={handleClose}
                onKeyDown={handleClose}
            >
                {children}
            </div>
        </SwipeableDrawer>
    );
}
```