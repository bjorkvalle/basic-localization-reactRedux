import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as LocalizationStore from '../store/Localization';

type Props = LocalizationStore.ILocalizationState
    & typeof LocalizationStore.actionCreators;

const TranslationBar: React.SFC<Props> = ({ changeLanguage }) => {
    const containerStyle = {
        "marginLeft": "auto",
        "marginRight": "auto",
        "width": "250px"
    };

    return (
        <div className='mt-20' >
            <button className="btn btn-primary mr-10" onClick={() => changeLanguage('en')}>English</button>
            <button className="btn btn-warning" onClick={() => changeLanguage('fr')}>French</button>
        </div>
    )
}
export default connect((state: ApplicationState) => state.localization, LocalizationStore.actionCreators)(TranslationBar);