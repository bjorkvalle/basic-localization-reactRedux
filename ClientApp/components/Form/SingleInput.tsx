import * as React from 'react';
import ModalLauncher from '../Modal/ModalLauncher';

interface OwnProps {
	type: 'text' | 'number' | 'date' | 'color' | 'password' | 'tel' | 'email';
	title?: string;
	placeholder?: string;
	field: any;
	form: any;
	disabled?: boolean;
	required?: boolean;
	helpText?: string;
	altErrorField?: string;
	pageTitle?: string;
	instructions?: string;
	inputIcon?: string;
	inputGroupClass?: string;
}

class SingleInput extends React.Component<OwnProps> {
	render() {
		const {
			title,
			placeholder,
			disabled,
			type,
			helpText,
			altErrorField,
			field: { name, value, onChange, onBlur },
			form: { errors, touched, setFieldValue },
			pageTitle,
			instructions,
			inputIcon,
			inputGroupClass
		} = this.props;
		return (
			<div className={`form-group ${inputGroupClass}`}>
				{title && (
					<label className="col-sm-4 control-label text-capitalize" htmlFor={name}>
						{title}
					</label>
				)}
				<div className={`${title ? 'col-sm-8' : ''} `}>
					<div className="input-group">
						<input
							id={name}
							name={name}
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							disabled={disabled}
							type={type}
							placeholder={placeholder}
							className={`form-control text-input`}
						/>
						{inputIcon &&
							<span id="input_icon">{inputIcon}</span>
						}

						{altErrorField ? (
							<div id="input_required" />
						) : (
								(errors[name] &&
									<div id="input_required" />
								)
							)}
						{/* <img src={'./dist/images/screen1.png'} id="input_img" /> */}
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
					{touched[name] &&
						errors[name] && (
							<small id="helpText" className={`ml-5 form-text text-muted input-feedback`}>
								{errors[name]}
							</small>
						)}
				</div>
			</div>
		);
	}
}
export default SingleInput;
