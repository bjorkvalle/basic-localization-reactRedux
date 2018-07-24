import { addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { getOpenData, storeLang } from '../utils';

//#region ACTION_TYPE_KEYS
export enum LocalizationActionTypeKeys {
    INIT_BEGIN = 'INIT_BEGIN',
    INIT_SUCCESS = 'INIT_SUCCESS',
    INIT_FAIL = 'INIT_FAIL',
    CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
}
//#endregion

//#region STATE
export interface ILocalizationState {
    isInitializing: boolean;
    isLoading: boolean;
    languageCode: string;
    translations: { code: string, phrases: any }[];
    languages: { id: number, name: string, code: string }[];
}
//#endregion

//#region ACTIONS
interface IInitBeginAction {
    type: LocalizationActionTypeKeys.INIT_BEGIN;
}
interface IInitSuccessAction {
    type: LocalizationActionTypeKeys.INIT_SUCCESS;
    translations: { code: string, phrases: any }[];
    languages: { id: number, name: string, code: string }[];
}
interface IInitFailAction {
    type: LocalizationActionTypeKeys.INIT_FAIL;
}
interface IChangeLanguageAction {
    type: LocalizationActionTypeKeys.CHANGE_LANGUAGE;
    languageCode: string;
}
//#endregion

//#region KNOWN_ACTIONS
type KnownAction =
    | IInitBeginAction
    | IInitSuccessAction
    | IInitFailAction
    | IChangeLanguageAction
//#endregion

//#region ACTION_CREATORS
//* action creators - exposes actions to the ui
export const actionCreators = {
    initLocalization: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch(<IInitBeginAction>{ type: LocalizationActionTypeKeys.INIT_BEGIN });

        const translationPromise = getOpenData(`./dist/translations.json`);
        const languagePromise = getOpenData(`./dist/languages.json`);
        let allPromises = [translationPromise, languagePromise];

        const fetchTask = Promise.all(allPromises)
            .then((data: any[]) => {
                const translationData: { code: string, phrases: any }[] = data[0];
                const languageData: { id: number, name: string, code: string }[] = data[1];
                dispatch(<IInitSuccessAction>{
                    type: LocalizationActionTypeKeys.INIT_SUCCESS,
                    translations: translationData,
                    languages: languageData,
                });
            })
            .catch((err) => dispatch(<IInitFailAction>{ type: LocalizationActionTypeKeys.INIT_FAIL }));

        addTask(fetchTask);
    },
    changeLanguage: (code: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (getState().localization.languageCode !== code) {
            storeLang(code);
            dispatch(<IChangeLanguageAction>{ type: LocalizationActionTypeKeys.CHANGE_LANGUAGE, languageCode: code });
        }
    },
};
//#endregion

//#region REDUCERS
const unloadedState: ILocalizationState = {
    isInitializing: true,
    isLoading: false,
    languageCode: 'en',
    translations: [],
    languages: []
};
export const reducer: Reducer<ILocalizationState> = (state: ILocalizationState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        //load
        case LocalizationActionTypeKeys.INIT_BEGIN:
            return {
                ...state
            };
        case LocalizationActionTypeKeys.INIT_SUCCESS:
            return {
                ...state,
                isInitializing: false,
                translations: action.translations,
                languages: action.languages,
            };
        case LocalizationActionTypeKeys.INIT_FAIL:
            return {
                ...state,
                isInitializing: false,
            };
        //change language
        case LocalizationActionTypeKeys.CHANGE_LANGUAGE:
            return {
                ...state,
                languageCode: action.languageCode
            };
        default:
            return state || unloadedState;
    }
};
//#endregion