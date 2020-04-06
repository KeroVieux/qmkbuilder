const React = require('react');

const NumberBox = require('ui/elements/numberbox');
const Help = require('ui/elements/help');

const C = require('const');
const Utils = require('utils');
const moment = require('moment');
const axios = require('axios');
const _ = require('lodash');

class Settings extends React.Component {

	constructor(props) {
		super(props);

		// Bind functions.
		this.save = this.save.bind(this);
		this.saveToCloud = this.saveToCloud.bind(this);
	}
	async saveToCloud() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		// Get a friendly name for the keyboard.
		const friendly = keyboard.settings.name ? Utils.generateFriendly(keyboard.settings.name) : 'layout';

		// Serialize the keyboard.
		const serialized = keyboard.serialize();
		const data = {
			name: friendly,
			content: {
				version: C.VERSION,
				keyboard: serialized
			},
			user: state.ui.get('user'),
			status: 1,
			createdAt: moment().valueOf(),
			updatedAt: moment().valueOf(),
		}
		if (state.currentKbd && state.currentKbd._id) {

			const res = await axios.put(`${state.C.LOCAL.DB_URL}/${state.C.LOCAL.DB_NAME}/${state.currentKbd._id}`, _.assign(data, {
				_rev: state.currentKbd._rev,
			}))
			data._rev = res.data.rev
			state.update({
				currentKbd: data
			})
			alert('updated success')
		} else {
			const uuidRes = await axios.get(`${state.C.LOCAL.DB_URL}/_uuids`)
			const uuid = uuidRes.data.uuids[0]
			await axios.put(
				`${state.C.LOCAL.DB_URL}/${state.C.LOCAL.DB_NAME}/${uuid}`,
				data
			);
			alert('insert success')
		}
	}

	/*
	 * Save the configuration.
	 */
	save() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		// Get a friendly name for the keyboard.
		const friendly = keyboard.settings.name ? Utils.generateFriendly(keyboard.settings.name) : 'layout';

		// Serialize the keyboard.
		const serialized = keyboard.serialize();

		// Create the configuration.
		const config = JSON.stringify({
			version: C.VERSION,
			keyboard: serialized
		});

		// Download.
		const blob = new Blob([config], { type: 'text/plain;charset=utf-8' });
		saveAs(blob, friendly + '.json');
	}

	render() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		// Compile a list of errors and warnings.
		const list = [];
		let index = 0;
		for (const error of keyboard.errors) {
			list.push(<div className='pane-settings-list-element' key={ index ++ }>
				<span style={{ color: '#c0392b' }}><i className='fa fa-times-circle'/></span>
				{ error }
			</div>);
		}
		for (const warning of keyboard.warnings) {
			list.push(<div className='pane-settings-list-element' key={ index ++ }>
				<span style={{ color: '#c6cc33' }}><i className='fa fa-exclamation-triangle'/></span>
				{ warning }
			</div>);
		}
		if (list.length === 0) {
			list.push(<div style={{ padding: '1rem' }} key={ -1 }>
				No errors or warnings!
			</div>);
		}

		return <div className='pane-settings'>
			Configure your settings.
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Layout Name</h2>
			<input
				style={{ width: '8rem' }}
				type='text'
				value={ keyboard.settings.name }
				onChange={ e => keyboard.setSetting('name', e.target.value) }/>
			<Help>
				Give your layout a name!
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Bootloader Size</h2>
			<select
				style={{ width: '8rem' }}
				value={ keyboard.settings.bootloaderSize }
				onChange={ e => keyboard.setSetting('bootloaderSize', parseInt(e.target.value)) }>
				<option value={ C.BOOTLOADER_8192 }>8192 KB</option>
				<option value={ C.BOOTLOADER_4096 }>4096 KB</option>
				<option value={ C.BOOTLOADER_2048 }>2048 KB</option>
				<option value={ C.BOOTLOADER_512 }>512 KB</option>
			</select>
			<Help>
				<strong>Atmel DFU loader (ATmega32U4)</strong>: 4096
				<br/>
				<strong>Atmel DFU loader (AT90USB1286)</strong>: 8192
				<br/>
				<strong>LUFA bootloader (ATmega32U4)</strong>: 4096
				<br/>
				<strong>Arduino Caterina (ATmega32U4)</strong>: 4096
				<br/>
				<strong>USBaspLoader (ATmega***)</strong>: 2048
				<br/>
				<strong>Teensy halfKay (ATmega32U4)</strong>: 512
				<br/>
				<strong>Teensy++ halfKay (AT90USB1286)</strong>: 2048
				<br/>
				If in doubt, choose <strong>4096</strong>.
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>WS2812 LEDs</h2>
			<div style={{ width: '8rem', display: 'inline-block', textAlign: 'left' }}>
				<NumberBox
					style={{ width: '3.5rem' }}
					min='0'
					value={ keyboard.settings.rgbNum }
					onChange={ v => keyboard.setSetting('rgbNum', v) }/>
			</div>
			<Help>
				The number of WS2812 LEDs, if any.
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Backlight Levels</h2>
			<div style={{ width: '8rem', display: 'inline-block', textAlign: 'left' }}>
				<NumberBox
					style={{ width: '3.5rem' }}
					min='0'
					max='15'
					value={ keyboard.settings.backlightLevels }
					onChange={ v => keyboard.setSetting('backlightLevels', v) }/>
			</div>
			<Help>
				The number of backlight levels.
			</Help>
			<div style={{ height: '1.5rem' }}/>
			Save your layout.
			<div style={{ height: '0.5rem' }}/>
			<button onClick={ this.save }  className="button is-warning m-r-5">
				Save To Local
			</button>
			{
				state.ui.get('user') ?
					<button onClick={ this.saveToCloud } className="button is-primary">
						Save To Cloud
					</button> : null
			}

			<div style={{ height: '1.5rem' }}/>
			Check errors and warnings.
			<div style={{ height: '0.5rem' }}/>
			<div className='pane-settings-list'>
				{ list }
			</div>
		</div>;
	}

}

module.exports = Settings;
