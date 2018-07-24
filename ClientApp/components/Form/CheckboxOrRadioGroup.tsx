import * as React from 'react';
import ModalLauncher from '../Modal/ModalLauncher';

interface Props {
    // field: any,
    // form: any,
    name: string,
    type: 'checkbox' | 'radio'; //- '|' is a ts union type
    wide?: boolean;
    inline?: boolean;
    title?: string;
    options: any[]; //- determines the label and value for each checkbox/radio
    helpText?: string,
    checked: (id: number) => boolean,
    pageTitle: string;
    instructions?: string;
    // selectedOptions: any[]; //- pre-selected options
    onChange: (event: any, id: number) => any;
    columnBreakAt?: number;
}

const CheckboxOrRadioGroup: React.StatelessComponent<Props> = ({
    // field: { name, value, onBlur }, 
    // form: { errors, touched, setFieldValue }, 
    name,
    wide,
    title,
    helpText,
    pageTitle,
    instructions,
    options,
    // selectedOptions,
    type,
    checked,
    onChange,
    inline,
    columnBreakAt
}) => {
    const rbStyles = {
        "marginRight": "8px",
        "marginTop": "10px"
    };

    return (
        <div className="form-group">
            {title && (
                <label className={`control-label text-capitalize ${wide ? 'col-sm-2' : 'col-sm-4'} `} htmlFor={name}>
                    {title}
                </label>
            )}
            <div className={`${title ? wide ? 'col-sm-10' : 'col-sm-8' : 'col-sm-12'} `}>
                <div className="input-group" >
                    {inline === true ? (
                        <div>
                            {/* {createInline()} */}
                            {options.map((option: any) => (
                                <label key={option.id} className="checkbox-inline" >
                                    <input
                                        name={name}
                                        type="checkbox"
                                        value={option.id}
                                        checked={checked(option.id)}
                                        onChange={(e) => onChange(e, option.id)}
                                    />
                                    {/* {`${option.id} ${option.name}`} */}
                                    {`${option.name}`}
                                </label>
                            ))}
                        </div>
                    ) : (
                            <div>
                                {options.map(option => (
                                    <div key={option.id}>
                                        <label>
                                            <input
                                                name={name}
                                                type="checkbox"
                                                value={option.id}
                                                checked={checked(option.id)}
                                                onChange={(e) => onChange(e, option.id)}
                                                style={rbStyles}
                                            />
                                            {`${option.name}`}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    {instructions ? (
                        <span className="input-group-addon">
                            <ModalLauncher
                                modalHeaderTitle={pageTitle}
                                classIcon='glyphicon-question-sign'
                                classButtonColor="transparent"
                                classIconColor="text-yellow"
                                small={true}
                            >
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
export default CheckboxOrRadioGroup;