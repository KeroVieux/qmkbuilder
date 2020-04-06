const React = require('react');

const Main = require('main/main');
const Editor = require('main/editor');

const State = require('state');

const C = require('const');

class Index extends React.Component {

	constructor(props) {
		super(props);

		this.state = new State(this);
		this.state.update({
			C,
		})
	}

	render() {
		// Assign the current screen.
		let Screen;
		if (this.state.screen === C.SCREEN_MAIN) {
			Screen = Main;
		} else {
			Screen = Editor;
		}

		return <div>
			<h1 className="title p-t-30 m-b-30">
				QMK Firmware Builder
			</h1>
			<p className="subtitle is-4">

				All keyboard build with chip like XMEGA AVR32 AVR can generate firmware at here

			</p>
			<div id="meta" className="field is-grouped is-grouped-multiline m-b-30">


				<div className="control">
					<div className="tags has-addons">
						<span className="tag">XMEGA</span>

						<a className="tag is-success">Yes</a>

					</div>
				</div>

				<div className="control">
					<div className="tags has-addons">
						<span className="tag">AVR32</span>

						<a className="tag is-success">Yes</a>

					</div>
				</div>
				<div className="control">
					<div className="tags has-addons">
						<span className="tag">AVR</span>

						<a className="tag is-success">Yes</a>

					</div>
				</div>

				<div className="control">
					<div className="tags has-addons">
						<span className="tag">OEM</span>

						<span className="tag is-danger">No</span>

					</div>
				</div>
			</div>

			<Screen
				state={ this.state }/>
		</div>;
	}

}

module.exports = Index;
