const React = require('react');

const Chooser = require('./chooser');

const Help = require('ui/elements/help');

const C = require('const');

class Pins extends React.Component {

	render() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		return <div className='pane-pins'>
			<div className='m-b-30'>
				<h2 className='m-b-20'>
					Choose the controller on the keyboard.
				</h2>
				<div className="select">
					<select
						value={ keyboard.controller }
						onChange={ e => keyboard.controller = parseInt(e.target.value) }>
						<option value={ C.CONTROLLER_ATMEGA32U2 }>ATmega32U2</option>
						<option value={ C.CONTROLLER_ATMEGA32U4 }>ATmega32U4</option>
						<option value={ C.CONTROLLER_AT90USB1286 }>AT90USB1286</option>
					</select>
				</div>
				<Help>
					<strong>ATmega32U2</strong>: Alps64
					<br/>
					<strong>ATmega32U4</strong>: Teensy 2.0, Pro Micro, GH60 (Most Common)
					<br/>
					<strong>AT90USB1286</strong>: Teensy++ 2.0
				</Help>
			</div>
			<div className='m-b-30'>
				<h2 className='m-b-20'>
					Configure the row and column pins.
				</h2>
			</div>
			<div className='columns'>
				<div className='column'>
					<h2 className='m-b-20 tc'>Rows</h2>
					<br/>
					{(() => {
						// Rows.
						const rows = [];
						for (let i = 0; i < keyboard.rows; i ++) {
							rows.push(<div className="m-b-5"
								key={ i }>
								<div className='height-32 m-r-5 dib tr' style={{width: '40px'}}>{ i }</div>
								<Chooser
									state={ state }
									onChange={ p => keyboard.setRowPin(i, p) }
									pin={ keyboard.pins.row[i] }/>
							</div>);
						}
						return rows;
					})()}
				</div>
				<div className='column'>
					<h2 className='m-b-20 tc'>Columns</h2>
					{(() => {
						// Columns.
						const cols = [];
						for (let i = 0; i < keyboard.cols; i ++) {
							cols.push(<div className="m-b-5"
								key={ i }>
								<div className='height-32 m-r-5 dib tr' style={{width: '40px'}}>{ i }</div>
								<Chooser
									state={ state }
									onChange={ p => keyboard.setColPin(i, p) }
									pin={ keyboard.pins.col[i] }/>
							</div>);
						}
						return cols;
					})()}
				</div>
			</div>
			<div className='columns'>
				<div className="column">
					<h2 className='m-b-20 tc'>LED</h2>
					<div className="m-b-5">
						<div className='height-32 m-r-5 dib tr' style={{width: '160px'}}>Num Lock</div>
						<Chooser
							noPin
							state={ state }
							onChange={ p => keyboard.setPin('num', p) }
							pin={ keyboard.pins.num }/>
					</div>
					<div className="m-b-5">
						<div className='height-32 m-r-5 dib tr' style={{width: '160px'}}>Caps Lock</div>
						<Chooser
							noPin
							state={ state }
							onChange={ p => keyboard.setPin('caps', p) }
							pin={ keyboard.pins.caps }/>
					</div>
					<div className="m-b-5">
						<div className='height-32 m-r-5 dib tr' style={{width: '160px'}}>Scroll Lock</div>
						<Chooser
							noPin
							state={ state }
							onChange={ p => keyboard.setPin('scroll', p) }
							pin={ keyboard.pins.scroll }/>
					</div>
					<div className="m-b-5">
						<div className='height-32 m-r-5 dib tr' style={{width: '160px'}}>Compose</div>
						<Chooser
							noPin
							state={ state }
							onChange={ p => keyboard.setPin('compose', p) }
							pin={ keyboard.pins.compose }/>
					</div>
					<div className="m-b-5">
						<div className='height-32 m-r-5 dib tr' style={{width: '160px'}}>Kana</div>
						<Chooser
							noPin
							state={ state }
							onChange={ p => keyboard.setPin('kana', p) }
							pin={ keyboard.pins.kana }/>
					</div>
					<div className="m-b-5">
						<div className='height-32 m-r-5 dib tr' style={{width: '160px'}}>Backlight</div>
						<Chooser
							noPin
							state={ state }
							onChange={ p => keyboard.setPin('led', p) }
							pin={ keyboard.pins.led }/>
					</div>
					<div className="m-b-5">
						<div className='height-32 m-r-5 dib tr' style={{width: '160px'}}>WS2812 Strip</div>
						<Chooser
							noPin
							state={ state }
							onChange={ p => keyboard.setPin('rgb', p) }
							pin={ keyboard.pins.rgb }/>
					</div>
				</div>
				<div className="column"> </div>
			</div>
		</div>;
	}

}

module.exports = Pins;
