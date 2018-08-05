import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as LocalizationStore from '../store/Localization';
import { get, forOwn } from 'lodash';
import { ITranslation } from '../models';

type Props = LocalizationStore.ILocalizationState
    & typeof LocalizationStore.actionCreators
    & OwnProps;

type OwnProps = {
    phraseId: string,
    options?: {
        ignoreTranslate?: boolean,
        addMissingTranslation?: boolean,
        highlightMissingTranslation?: boolean,
        renderInnerHtml?: boolean
    },
    propsData?: {}
};

type State = {
    currentLanguageCode: string;
    phrase: string;
};

class Translate extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentLanguageCode: this.props.languageCode,
            phrase: props.children
        }
    }

    componentDidMount() {
        this.translate(this.props.languageCode);
    }

    componentWillReceiveProps(props: any) {
        const { currentLanguageCode } = this.state;
        const { languageCode } = props;

        if (currentLanguageCode !== languageCode) {
            this.setState({ currentLanguageCode: languageCode });
            this.translate(languageCode);
        }
    }

    translate = (languageCode: string) => {
        const { options = {}, phraseId, translations, languages, propsData = {} } = this.props;
        const defaultPhrase = this.props.children;
        const hasValidDefaultTranslation: boolean = defaultPhrase !== undefined;
        const ignoreTranslate: boolean = options.ignoreTranslate !== undefined
            ? options.ignoreTranslate
            : false;
        const addMissingTranslation: boolean = options.addMissingTranslation !== undefined
            ? options.addMissingTranslation
            : false;
        const highlightMissingTranslation: boolean = options.highlightMissingTranslation !== undefined
            ? options.highlightMissingTranslation
            : false;


        if (!ignoreTranslate) {
            //* get translation dictionary by code and its phrases
            const translationByLanguageCode: ITranslation = translations.filter(x => x.code === languageCode)[0];
            const phrases: any = translationByLanguageCode.phrases;

            //* find translated phrase(s)
            //? simply writing 'const translatedPhrase = phrases[phraseId]' doesn't support deep nesting
            //? lodash (get) already supports deep nesting. Less boilerplate to write
            const translatedPhrase: string = get(phrases, phraseId);
            const isValidTranslatedPhrase: boolean = translatedPhrase !== undefined;

            if (isValidTranslatedPhrase) {
                //* extract props by regex exp
                const propsPattern: string = '(\\$\\{.*?\\})';
                const splitProps: string = translatedPhrase
                    .split(new RegExp(propsPattern, 'gm'))
                    .map((str: string) => {
                        let match: string | undefined = undefined;
                        //* loop through data's props (using lodash) and check for matches
                        forOwn(propsData, (value, key) => {
                            const keyPattern: string = '(\\$\\{' + key + '\\})';
                            const regex: RegExp = new RegExp(keyPattern, 'gm');
                            if (regex.test(str)) {
                                //* if match, return key's value 
                                match = value;
                            }
                        });
                        return match ? match : str;
                    })
                    .reduce((translation, next) => {
                        //* insert them back into the phrase using reduce
                        return (translation + next);
                    });
                //* set translated phrase
                this.setState({ phrase: splitProps });
            } else {
                //* if missing translation
                if (addMissingTranslation) {
                    if (hasValidDefaultTranslation) {
                        //* add existing default to phrase json (store)
                        translations.filter(x => x.code === languageCode)[0].phrases[phraseId] = defaultPhrase;
                    } else {
                        const language = languages.filter(x => x.code === languageCode)[0];
                        this.setState({
                            phrase: `Tried to add missing translation but no default was specified\nlanguage: '${language.name}',\nphraseId: '${phraseId}'`
                        });
                    }
                } else if (highlightMissingTranslation) {
                    //* highlight missing translation
                    const language = languages.filter(x => x.code === languageCode)[0];
                    this.setState({
                        phrase: `Missing translation for\nlanguage: '${language.name}',\nphraseId: '${phraseId}'`
                    });
                }
            }
        }
    }

    hasHtml = (value: string): boolean => {
        const pattern = /(&[^\s]*;|<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>)/;
        return !value ? false : value.search(pattern) >= 0;
    };

    render() {
        const phrase: string = this.state.phrase;
        const { options = {} } = this.props;
        const renderInnerHtml: boolean = options.renderInnerHtml !== undefined
            ? options.renderInnerHtml
            : false;

        if (renderInnerHtml && this.hasHtml(phrase)) {
            return (
                <span style={{ "whiteSpace": "pre-wrap" }} dangerouslySetInnerHTML={{ __html: phrase }}>
                </span>
            )
        } else {
            //* whitespace pre-wrap makes sure newline (\n) is taken care of
            return (
                <span style={{ "whiteSpace": "pre-wrap" }}>
                    {this.state.phrase}
                </span>
            )
        }
    }
}
export default connect((state: ApplicationState) => state.localization, LocalizationStore.actionCreators)(Translate);
