import { createStore, applyMiddleware, compose, combineReducers, GenericStoreEnhancer, Store, StoreEnhancerStoreCreator, ReducersMapObject } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as StoreModule from './store';
import { ApplicationState, reducers } from './store';
import { History } from 'history';
import { createLogger } from 'redux-logger';
import { LocalizationActionTypeKeys } from './store/Localization';

export default function configureStore(history: History, initialState?: ApplicationState) {
    //? https://github.com/evgenyrodionov/redux-logger#log-only-in-development
    //* Or you can create your own logger with custom options:
    const logger = createLogger({
        predicate: (getState, action) => action.type !== LocalizationActionTypeKeys.INIT_BEGIN
    });

    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    // If devTools is installed, connect to it
    const devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => GenericStoreEnhancer;
    const createStoreWithMiddleware: any = compose(
        applyMiddleware(thunk, logger, routerMiddleware(history)),
        devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(reducers);
    const store = createStoreWithMiddleware(allReducers, ReHydrateStore(initialState)) as Store<ApplicationState>;

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./store', () => {
            const nextRootReducer = require<typeof StoreModule>('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

    return store;
}

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<ApplicationState>(Object.assign({}, allReducers, { routing: routerReducer }));
}

// https://stackoverflow.com/questions/35305661/where-to-write-to-localstorage-in-a-redux-app
function ReHydrateStore(initialState?: ApplicationState): ApplicationState | undefined {
    if (initialState === undefined) {
        return initialState;
    }

    const lang = JSON.parse(localStorage.getItem('lang') as string);

    if (lang !== null) {
        initialState.localization.languageCode = lang === null ? 'en' : lang;
    }
    return initialState;
}
