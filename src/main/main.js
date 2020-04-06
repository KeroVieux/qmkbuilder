const React = require('react');

const Keyboard = require('state/keyboard');

const C = require('const');
const Utils = require('utils');

const _ = require('lodash');
const axios = require('axios');
const store = require('store')

class Main extends React.Component {

	constructor(props) {
		super(props);

		// Bind functions.
		this.upload = this.upload.bind(this);
		this.useKLE = this.useKLE.bind(this);
		this.setUser = this.setUser.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	async componentDidMount() {
		const state = this.props.state;
		const user = store.get('user')
		if (user) {
			state.ui.set('user', user)
		}
		const res = await axios.post(`${state.C.LOCAL.DB_URL}/${state.C.LOCAL.DB_NAME}/_find`, {
			sort: [{
				updatedAt: 'desc'
			}],
			limit: 1000,
			selector: {
				$or:[
					{
						status: { $gt: 1 }
					},
					{
						user,
					}
				]
			},
		})
		state.update({
			kbdList: res.data.docs,
		})

	}

	/*
	 * Upload a QMK Builder configuration.
	 */
	upload() {
		const state = this.props.state;

		// Upload a file.
		Utils.readFile(contents => {
			try {
				// Deserialize the contents.
				const deserialized = JSON.parse(contents);

				// Build a new keyboard.
				const keyboard = Keyboard.deserialize(state, deserialized.keyboard);

				state.update({
					keyboard: keyboard,
					screen: C.SCREEN_WIRING // Switch to the wiring screen.
				});
			} catch (e) {
				console.error(e);
				state.error('Invalid configuration');
			}
		});
	}

	/*
	 * Use KLE raw data.
	 */
	useKLE() {
		const state = this.props.state;

		try {
			const json = parser.parse('[' + state.ui.get('kle', '') + ']'); // Parse the raw data.

			// Parse the KLE data.
			const keyboard = new Keyboard(state, json);

			// Make sure the data is valid.
			if (keyboard.keys.length === 0) {
				throw 'empty layout';
			}

			state.update({
				keyboard: keyboard,
				screen: C.SCREEN_WIRING // Switch to the wiring screen.
			});
		} catch (e) {
			console.error(e);
			state.error('Invalid layout');
		}
	}
	setUser() {
		const state = this.props.state;
		store.set('user', state.ui.get('user'))
		this.componentDidMount()
	}

	/*
	 * Use a preset.
	 *
	 * @param {String} id The id of the preset.
	 */
	useCloudPreset(index) {
		const state = this.props.state;
		const deserialized = state.kbdList[index].content;
		const keyboard = Keyboard.deserialize(state, deserialized.keyboard);
		state.update({
			currentKbd: state.kbdList[index],
			keyboard: keyboard,
			screen: C.SCREEN_KEYMAP // Switch to the keymap screen.
		});
	}

	render() {
		const state = this.props.state;

		return <div>
			<div className='columns'>
				<div className='column'>
					<div className="field has-addons">
						<div className="control is-expanded">
							<input className="input" type="text"
								   placeholder="set your name"
								   value={ state.ui.get('user', '') }
								   onChange={ state.ui.set('user') }/>
						</div>
						<div className="control">
							<a className="button is-warning" onClick={ this.setUser }>
								Set
							</a>
						</div>
					</div>
					<textarea
						className='textarea m-b-5'
						placeholder='Paste layout here...'
						value={ state.ui.get('kle', '') }
						onChange={ state.ui.set('kle') }/>
					<button
						className='button is-fullwidth is-primary m-b-5'
						onClick={ this.useKLE }>
						Import KLE configuration
					</button>
				</div>
				<div className='column'>
					<button
						className='button is-fullwidth is-primary is-outlined m-b-5'
						onClick={ this.upload }>
						Upload Local configuration
					</button>
					{(() => {
						return _.map(state.kbdList, (item, index) => {
							return <button
								className='button is-fullwidth m-b-5'
								onClick={ () => this.useCloudPreset(index) }
								key={ index }>
								{ item.name }
							</button>
						});
					})()}
				</div>
			</div>
		</div>;
	}

}

module.exports = Main;
