import * as React from 'react';
import ModalLauncher from '../Modal/ModalLauncher';

interface OwnProps {
	title: string;
	rows: number;
	placeholder: string;
	helpText?: string;
	wide?: boolean;
	disabled?: boolean;
	field: any;
	form: any;
	pageTitle: string;
	instructions: string;
}

class TextArea extends React.Component<OwnProps, {}> {
	render() {
		const {
			title,
			field: { name, value, onChange, onBlur, onReset },
			form: { errors, touched, setFieldValue },
			placeholder,
			helpText,
			wide,
			disabled,
			rows,
			pageTitle,
			instructions
		} = this.props;

		return (
			<div className="form-group">
				<label className={`control-label text-capitalize ${wide ? 'col-sm-2' : 'col-sm-4'} `} htmlFor={name}>
					{title}
				</label>
				<div className={`${wide ? 'col-sm-10' : 'col-sm-8'} `}>
					<div className="input-group">
						<textarea
							id={name}
							name={name}
							value={value}
							onChange={onChange}
							onReset={onReset}
							onBlur={onBlur}
							disabled={disabled}
							rows={rows}
							placeholder={placeholder}
							className={`form-control ${
								touched ? (errors ? 'text-input error' : 'text-input success') : 'text-input'
								}`}
						/>
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
					<small id="helpText" className="form-text text-muted">
						{helpText}
					</small>
					{touched[name] && errors[name] &&
						<small id="helpText" className={`ml-5 form-text text-muted input-feedback`}>
							{errors[name]}
						</small>
					}
				</div>
			</div>
		);
	}
}
export default TextArea;
