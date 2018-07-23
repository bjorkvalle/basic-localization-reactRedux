import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as LocalizationStore from '../store/Localization';
import { get } from 'lodash';

type Props = LocalizationStore.ILocalizationState
    & typeof LocalizationStore.actionCreators
    & OwnProps;

type OwnProps = {
    phraseId: string,
    options?: {
        ignoreTranslate?: boolean,
        addMissingTranslation?: boolean
    }
};

type State = {
    currentLanguageCode: string;
    phrase: string
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
            this.translate(props.languageCode);
        }
    }

    translate = (languageCode: string) => {
        const { options, phraseId, translations, languages } = this.props;
        const defaultPhrase = this.props.children;

        if (options
            && options.ignoreTranslate !== undefined
            && options.ignoreTranslate === true) {
            // console.log("ignore translation");
        } else {
            // console.log("translate");
            //* fetch translations (store)
            const translationsByLanguageCode: { code: string, phrases: any }[] = translations.filter(x => x.code === languageCode);

            //* find translated phrase
            const phrases: any = translationsByLanguageCode[0].phrases;
            //? doesn't support deep nesting
            //? lodash (get) already supports deep nesting. Less boilerplate to write 
            // const translatedPhrase = phrases[phraseId]; 
            const translatedPhrase = get(phrases, phraseId);

            if (translatedPhrase) {
                //* set translated phrase
                this.setState({ phrase: translatedPhrase });
            } else {
                //* if missing translation
                if (options
                    && options.addMissingTranslation !== undefined
                    && options.addMissingTranslation === true
                    && defaultPhrase) {
                    //* add existing default to phrase json (store)
                    translations.filter(x => x.code === languageCode)[0].phrases[phraseId] = defaultPhrase;
                } else {
                    //* highlight missing translation
                    const language = languages.filter(x => x.code === languageCode)[0];
                    this.setState({
                        phrase: `Missing translation for\nlanguage: '${language.name}',\nphraseId: '${phraseId}'`
                    });
                }
            }
        }
    }

    render() {
        //* whitespace pre-wrap makes sure newline (\n) is taken care of
        return (
            <span style={{ "whiteSpace": "pre-wrap" }}>
                {this.state.phrase}
            </span>
        )
    }
}
export default connect((state: ApplicationState) => state.localization, LocalizationStore.actionCreators)(Translate);
