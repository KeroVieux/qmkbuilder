const React = require('react');

const NumberBox = require('ui/elements/numberbox');
const Help = require('ui/elements/help');

const C = require('const');

class Wiring extends React.Component {

	render() {
		const state = this.props.state;
		const keyboard = state.keyboard;
		const selected = keyboard.selected;

		return <div>
			<div className='m-b-30'>
				<h2 className='m-b-20'>
					Specify the diode direction.
				</h2>
				<div className="select">
					<select
						value={ keyboard.settings.diodeDirection }
						onChange={ e => keyboard.setSetting('diodeDirection', parseInt(e.target.value)) }>
						<option value={ C.DIODE_COL2ROW }>Column to Row</option>
						<option value={ C.DIODE_ROW2COL }>Row to Column</option>
					</select>
				</div>
				<Help>
					<strong>Column to Row</strong>: Marked end of diode towards row. Used by most PCBs and handwired builds (Recommended).
					<br/>
					<strong>Row to Column</strong>: Marked end of diode towards column. Used by Phantom TKL PCB. Not common.
				</Help>
			</div>
			<div className='m-b-30'>
				<h2 className='m-b-20'>
					Change the number of rows and columns in the matrix.
				</h2>
				<div className="columns">
					<div className="column is-3 tr">
						<h3 className="height-30">Rows</h3>
					</div>
					<div className="column tl">
						<NumberBox
							style={{ width: '3rem' }}
							min={ 1 }
							value={ keyboard.rows }
							onChange={ v => keyboard.rows = v }/>
					</div>
				</div>
				<div className="columns">
					<div className="column is-3 tr">
						<h3 className="height-30">Columns</h3>
					</div>
					<div className="column tl">
						<NumberBox
							style={{ width: '3rem' }}
							min={ 1 }
							value={ keyboard.cols }
							onChange={ v => keyboard.cols = v }/>
					</div>
				</div>
			</div>
			<div>
				{(() => {
					if (selected) {
						return <div>
							<h2 className='m-b-20'>
								<div style={{ height: '1.5rem' }}/>
								Change the position of the selected key in the matrix.
								<div style={{ height: '0.5rem' }}/>
							</h2>
							<div className="columns">
								<div className="column is-3 tr">
									<h3 className="height-30">Row</h3>
								</div>
								<div className="column">
									<NumberBox
										style={{ width: '3rem' }}
										minus='chevron-up'
										plus='chevron-down'
										min='0'
										max={ keyboard.rows - 1 }
										value={ selected.row }
										onChange={ v => selected.row = v }/>
								</div>
							</div>
							<div className="columns">
								<div className="column is-3 tr">
									<h3 className="height-30">Column</h3>
								</div>
								<div className="column">
									<NumberBox
										style={{ width: '3rem' }}
										minus='chevron-left'
										plus='chevron-right'
										min='0'
										max={ keyboard.cols - 1 }
										value={ selected.col }
										onChange={ v => selected.col = v }/>
								</div>
							</div>
						</div>;
					}
				})()}
			</div>
		</div>;
	}

}

module.exports = Wiring;
