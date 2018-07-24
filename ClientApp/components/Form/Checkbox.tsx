import * as React from 'react';
import ModalLauncher from '../Modal/ModalLauncher';

type Props = {
    field: any,
    form: any,
    title?: string,
    boxLabel?: string,
    helpText?: string
    pageTitle?: string;
    instructions?: string;
    inline?: boolean;
    disabled?: boolean;
}

const Checkbox: React.StatelessComponent<Props> = ({
    field: { name, value, onChange, onBlur },
    form: { errors },
    title,
    helpText,
    boxLabel,
    pageTitle,
    instructions,
    disabled,
    inline
}) => {

    const rbStyles = {
        "marginLeft": "10px",
        "marginTop": "10px"
    };

    return (
        <div className="form-group">
            <label className="col-sm-4 control-label text-capitalize" htmlFor={name}>
                {title}
            </label>
            <div className="col-sm-8">
                <div className="input-group" >
                    <input
                        disabled={disabled}
                        id={name}
                        name={name}
                        value={value}
                        checked={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        type="checkbox"
                        className={`${inline ? 'checkbox-inline' : ''}`}
                        style={rbStyles}
                    />
                    {errors[name] &&
                        <div id="input_required" />
                    }
                    <label htmlFor={name} className="ml-5 text-capitalize">
                        {boxLabel}
                    </label>
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
            </div>
        </div>
    );
}
export default Checkbox;