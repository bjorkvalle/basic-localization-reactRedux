import * as React from 'react';

interface OwnProps {
	title?: string;
	value: any;
	wide?: boolean;
	helpText?: string;
	inputIcon?: string;
	inputGroupClass?: string;
	removeAddon?: boolean;
}

const StaticDisplay: React.SFC<OwnProps> = ({ title, helpText, inputIcon, inputGroupClass, value, wide, removeAddon }) => (
	<div className={`form-group ${inputGroupClass}`}>
		{title && (
			<label className={`control-label text-capitalize ${wide ? 'col-sm-2' : 'col-sm-4'} `} htmlFor={name}>
				{title}
			</label>
		)}
		{/* <div className={`${title ? wide ? 'col-sm-10' : 'col-sm-8' : 'col-sm-12'} `}> */}
		<div className={`${title ? wide ? 'col-sm-10' : 'col-sm-8' : ''} `}>
			<div className="input-group">
				<input
					id={value}
					name={value}
					value={`${value}`}
					// value={`${value}${inputIcon}`}
					disabled={true}
					className={`form-control text-input`}
				/>
				{inputIcon &&
					<span id={`input_icon`} style={removeAddon ? { "right": "5px" } : {}}>{inputIcon}</span>
				}
				{/* temp solution with transparent */}
				{!removeAddon &&
					<span className="input-group-addon" style={{ "padding": "6px 15px", "color": "transparent" }}>
						@
					</span>
				}
			</div>
			{helpText && (
				<small id="helpText" className="ml-5 form-text text-muted">
					{helpText}
				</small>
			)}
		</div>
	</div>
);
export default StaticDisplay;
