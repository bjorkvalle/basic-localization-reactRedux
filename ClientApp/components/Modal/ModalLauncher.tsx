import * as React from 'react';
import Modal from './Modal';

type Props = {
    children: any | any[];
    buttonLabel?: string;
    modalHeaderTitle?: string;
    modalSubHeaderTitle?: string;
    classIcon?: 'glyphicon-ok' | 'glyphicon-remove' | 'glyphicon-th-list' | 'glyphicon-question-sign' | 'glyphicon-chevron-right';
    classIconColor?: 'text-main' | 'text-yellow' | 'text-white';
    classButtonColor?: 'btn-lightblue' | 'btn-gray-25' | 'transparent';
    classButtonCss?: string;
    small?: boolean;
    disabled?: boolean;
}
type State = {
    showModal: boolean;
}

class ModalLauncher extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { showModal: false };
    }

    handleToggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const { buttonLabel, children, modalHeaderTitle, modalSubHeaderTitle, small, disabled } = this.props;
        return (
            <div>
                <button disabled={disabled} {...this.props} value={buttonLabel} onClick={this.handleToggleModal} />
                {this.state.showModal && (
                    <Modal
                        small={small}
                        onCloseRequest={this.handleToggleModal}
                        modalHeaderTitle={modalHeaderTitle}
                        modalSubHeaderTitle={modalSubHeaderTitle}>
                        {children}
                    </Modal>
                )}
            </div>
        );
    }
}
export default ModalLauncher;