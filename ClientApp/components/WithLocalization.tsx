import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as LocalizationStore from '../store/Localization';

type Props = LocalizationStore.ILocalizationState
    & typeof LocalizationStore.actionCreators;

class WithLocalization extends React.Component<Props, {}> {
    componentDidMount() {
        this.props.initLocalization();
    }

    render() {
        return (
            <div>
                {!this.props.isInitializing && (
                    this.props.children
                )}
            </div>
        );
    }
}
export default connect((state: ApplicationState) => state.localization, LocalizationStore.actionCreators)(WithLocalization);
