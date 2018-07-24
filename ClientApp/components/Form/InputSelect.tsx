import * as React from 'react';
import ModalLauncher from '../Modal/ModalLauncher';
import Select from 'react-select';

type OwnProps = {
	pageTitle?: string;
	title?: string;
	placeholder?: string;
	helpText?: string;
	data: any;
	field: any;
	form: any;
	disabled?: boolean;
	instructions?: string;
};
type OwnState = {
	selectedOption: any;
	suggestions: any[];
};

class InputSelect extends React.Component<OwnProps, OwnState> {
	constructor(props: any) {
		super(props);
		this.state = {
			selectedOption: undefined,
			suggestions: [],
		}
	}

	//? if hoC based instead of state based
	componentDidMount() {
		if (this.state.suggestions.length <= 0) {
			const suggestions = this.props.data.map((x: any) => { return { value: x.keyValues.key, label: x.keyValues.value }; });
			this.setState({ suggestions: suggestions });

			//* validate (only) on init
			//* compares the components old props with its new ones it's receiving
			const valueLabel = suggestions.find((x: any) => x.value === this.props.field.value);
			if (valueLabel != undefined) {
				this.handleChange(valueLabel);
				// this.setState({ selectedOption: valueLabel });
				// this.props.form.setFieldValue(this.props.field.name, valueLabel ? valueLabel.value : undefined);
			}
			// this.props.form.setFieldTouched(this.props.field.name, true, true);
			// 	this.handleChange(valueLabel);
		}
	}

	//? if state based instead of hoC redux based
	componentWillReceiveProps(props: any) {
		if (this.state.suggestions.length <= 0) {
			const suggestions = props.data.map((x: any) => { return { value: x.keyValues.key, label: x.keyValues.value }; });
			this.setState({ suggestions: suggestions });

			//* validate (only) on init
			//* compares the components old props with its new ones it's receiving
			if (this.props.field.value === undefined && (this.props.field.value !== props.field.value)) {
				console.log("d2d")
				const valueLabel = suggestions.find((x: any) => x.value === props.field.value);
				this.handleChange(valueLabel);
			}
		}
	}

	handleChange = (selectedOption: any) => {
		//* this will trigger already on init if an existing cif is loaded
		//* thus an undefined check is done to make sure the following values
		//* aren't cleared until an actual selection change has been made
		if (this.props.field.name === "standardId" && this.state.selectedOption !== undefined) {
			//* If the standardId has been changed clear the calculation checkboxes in team qualification
			this.props.form.setFieldValue("cifCompetenceForNaceCodes", []);
			this.props.form.setFieldValue("cifLevelOfSystemIntegrations", []);
			this.props.form.setFieldValue("cifAdditionalAuditorTimeFactors", []);
			this.props.form.setFieldValue("cifLessAuditorTimeFactors", []);
		}

		//* regular update of selected value
		this.setState({ selectedOption: selectedOption });
		this.props.form.setFieldValue(this.props.field.name, selectedOption ? selectedOption.value : undefined);
		this.props.form.setFieldTouched(this.props.field.name, true, true);
		this.props.form.validateForm(this.props.field.name);
	}

	render() {
		const {
			title,
			pageTitle,
			field: { name, value, onChange, onBlur },
			form: { errors, touched },
			placeholder,
			helpText,
			disabled,
			instructions,
		} = this.props;
		const { selectedOption, suggestions } = this.state;
		return (
			<div className="form-group">
				{title && (
					<label className="col-sm-4 control-label text-capitalize" htmlFor={name}>
						{title}
					</label>
				)}
				<div className="col-sm-8">
					<div className="input-group">
						<Select
							placeholder={placeholder}
							disabled={disabled}
							value={selectedOption}
							onChange={this.handleChange}
							options={suggestions} />
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
					{touched[name] && errors[name] &&
						<small id="helpText" className={`ml-5 form-text text-muted input-feedback`}>
							{errors[name] ? errors[name] : "Type for suggestion(s)"}
						</small>
					}
				</div>
			</div>
		);
	}
}
export default InputSelect;