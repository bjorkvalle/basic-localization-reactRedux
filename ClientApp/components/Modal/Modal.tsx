import * as React from 'react';

type Props = {
    onCloseRequest: () => any;
    children: any | any[];
    modalHeaderTitle?: string;
    modalSubHeaderTitle?: string;
    small?: boolean;
}

class Modal extends React.Component<Props, {}> {
    private modal: any;
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('keyup', this.handleKeyUp, false);
        document.addEventListener('click', this.handleOutsideClick, false);
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeyUp, false);
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    handleKeyUp = (e: any) => {
        const { onCloseRequest } = this.props;
        const keys: any = {
            //* '27' is the code for ESC key
            27: () => {
                e.preventDefault();
                onCloseRequest();
                window.removeEventListener('keyup', this.handleKeyUp, false);
            },
        };
        if (keys[e.keyCode]) {
            keys[e.keyCode]();
        }
    }

    handleOutsideClick = (e: any) => {
        const { onCloseRequest } = this.props;

        if (e.target.id == "modal-row-data") {
            onCloseRequest();
            return;
        }

        // ignore clicks on the component itself
        if (this.modal.contains(e.target)) {
            return;
        }
        onCloseRequest();
    }

    render() {
        const { onCloseRequest, children, modalHeaderTitle, modalSubHeaderTitle, small } = this.props;
        return (
            <div className="my-modal-overlay">
                <button type="button" className="btn modal-close" onClick={onCloseRequest} />
                <div ref={node => { this.modal = node; }} className={`my-modal-content ${small ? 'small' : ''}`}>
                    <div className="my-modal-header">
                        <h3 className="text-main">
                            {modalHeaderTitle}<span className="row text-white">{modalSubHeaderTitle}</span>
                        </h3>
                    </div>
                    <div className="my-modal-body">
                        {children}
                    </div>
                    <div className="my-modal-footer">
                        <ul className="modal-button-row pull-right">
                            <li>
                                <button type="button" className="btn" onClick={onCloseRequest} value="Close" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default Modal;