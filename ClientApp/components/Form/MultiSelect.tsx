import * as React from 'react';
import Select from 'react-select';
import ModalLauncher from '../Modal/ModalLauncher';
// import { isStringNullOrEmpty } from '../../utils';

type Props = {
    title?: string;
    data: any[];
    selections: any[];
    helpText?: string;
    field: any;
    form: any;
    disabled?: boolean,
    stayOpen?: boolean,
    removeSelected?: boolean,
    placeholder?: string;
    rtl?: boolean, //* selections on the right side
    pageTitle?: string;
    instructions?: string;
}
type State = {
    selectedOptions: any;
    suggestions: any[];
}
class MultiSelect extends React.Component<Props, State> {
    // constructor(props: any) {
    //     super(props);
    //     this.state = {
    //         selectedOptions: undefined,
    //         suggestions: [],
    //     }
    // }

    // componentDidMount() {
    //     if (this.state.suggestions.length <= 0) {
    //         const suggestions = this.props.data.map((x: any) => { return { value: x.keyValues.key, label: x.keyValues.value }; });
    //         let initSelected: string = this.props.selections.map((x) => `,${x.id}`).toString();

    //         if (initSelected.length > 0) {
    //             this.handleSelectChange(initSelected);
    //         }
    //     }
    // }

    // //? if state based instead of hoC redux based
    // componentWillReceiveProps(props: any) {
    //     if (this.state.suggestions.length <= 0) {
    //         const suggestions = props.data.map((x: any) => { return { value: x.keyValues.key, label: x.keyValues.value }; });
    //         this.setState({ suggestions: suggestions });

    //         //* validate (only) on init
    //         //* compares the components old props with its new ones it's receiving
    //         if (this.props.field.value === undefined && (this.props.field.value !== props.field.value)) {
    //             const valueLabel = suggestions.find((x: any) => x.value === props.field.value);
    //             this.handleSelectChange(valueLabel);
    //         }
    //     }
    // }

    // handleSelectChange = (selectedOptions: any) => {
    //     const splitOpts = selectedOptions.split(',').filter((x: string) => !isStringNullOrEmpty(x)); //* is received in a "23,23" format
    //     this.setState({ selectedOptions: selectedOptions });
    //     this.props.form.setFieldValue(this.props.field.name, splitOpts ? splitOpts : undefined);
    //     this.props.form.setFieldTouched(this.props.field.name, true, true);
    //     this.props.form.validateForm(this.props.field.name);
    // }

    render() {
        const { selectedOptions, suggestions } = this.state;
        const {
            placeholder,
            title,
            stayOpen,
            disabled,
            removeSelected,
            rtl,
            instructions,
            pageTitle,
            helpText,
            field: { name },
            form: { errors }
        } = this.props;
        return (
            <div className="form-group">
                {/* {title && (
                    <label className="col-sm-4 control-label text-capitalize" htmlFor={name}>
                        {title}
                    </label>
                )}
                <div className="col-sm-8">
                    <div className="input-group">
                        <Select
                            placeholder={placeholder}
                            closeOnSelect={!stayOpen}
                            disabled={disabled}
                            multi
                            onChange={this.handleSelectChange}
                            options={suggestions}
                            removeSelected={removeSelected}
                            rtl={rtl}
                            simpleValue
                            value={selectedOptions} />

                        {errors[name] &&
                            <div id="input_required" />
                        }

                        {instructions ? (
                            <span className="input-group-addon">
                                <ModalLauncher
                                    modalHeaderTitle={pageTitle ? pageTitle : ''}
                                    classIcon='glyphicon-question-sign'
                                    classButtonColor="transparent"
                                    classIconColor="text-yellow"
                                    small={true} >
                                    <div className={"my-text-modal"}>
                                        <h4 className="text-yellow">
                                            Instructions
										</h4>
                                        <p>
                                            {instructions}
                                        </p>
                                    </div>
                                </ModalLauncher>
                            </span>
                        ) : (
                                <span className="input-group-addon" style={{ "padding": "6px 15px", "color": "transparent" }}>
                                    @
							</span>
                            )}
                    </div>
                    {helpText && (
                        <small id="helpText" className="ml-5 form-text text-muted">
                            {helpText}
                        </small>
                    )}
                </div> */}
            </div>
        );
    }
}
export default MultiSelect;
