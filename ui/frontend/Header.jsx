import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';
import { connect } from 'react-redux';
import Link from './uss-router/Link';

import {
  changeChannel,
  changeMode,
  performClippy,
  performCompileToAssembly,
  performCompileToLLVM,
  performExecute,
  performFormat,
  performGistSave,
  toggleConfiguration,
  navigateToHelp,
} from './actions';

function oneRadio(name, currentValue, possibleValue, change, labelText) {
  const id = `${name}-${possibleValue}`;
  return [
    <input className="header-radio" type="radio" name={name} id={id} key={`${id}-input`}
           checked={ currentValue === possibleValue } onChange={ () => change(possibleValue) } />,
    <label className="header-radio-label" htmlFor={id} key={`${id}-label`}>{labelText}</label>,
  ];
}

const executionLabel = (crateType, tests) => {
  if (tests) { return "Test"; }
  if (crateType === 'bin') { return "Run"; }
  return "Build";
};

class Header extends PureComponent {
  render() {
    const {
      execute, compileToAssembly, compileToLLVM,
      format, clippy, gistSave,
      channel, changeChannel, mode, changeMode,
      crateType, tests,
      toggleConfiguration, navigateToHelp,
    } = this.props;

    const oneChannel = (value, labelText) =>
            oneRadio("channel", channel, value, changeChannel, labelText);
    const oneMode = (value, labelText) =>
            oneRadio("mode", mode, value, changeMode, labelText);

    const primaryLabel = executionLabel(crateType, tests);

    return (
      <div className="header">
        <div className="header-compilation header-set">
          <button className="header-btn header-btn-primary"
                  onClick={ execute }>{ primaryLabel }</button>
          <button className="header-btn"
                  onClick={ compileToAssembly }>ASM</button>
          <button className="header-btn"
                  onClick={ compileToLLVM }>LLVM IR</button>
        </div>

        <div className="header-tools header-set">
          <legend className="header-title">Tools</legend>
          <button className="header-btn"
                  onClick={ format }>Format</button>
          <button className="header-btn"
                  onClick={ clippy }>Clippy</button>
        </div>

        <div className="header-sharing header-set">
          <button className="header-btn"
                  onClick={ gistSave }>Gist</button>
        </div>

        <div className="header-mode header-set">
          <legend className="header-title">Mode</legend>
          { oneMode("debug", "Debug") }
          { oneMode("release", "Release") }
        </div>

        <div className="header-channel header-set">
          <legend className="header-title">Channel</legend>
          { oneChannel("stable", "Stable") }
          { oneChannel("beta", "Beta") }
          { oneChannel("nightly", "Nightly") }
        </div>

        <div className="header-set">
          <button className="header-btn"
                  onClick={toggleConfiguration}>Config</button>
        </div>

        <div className="header-set">
          <Link className="header-btn" action={navigateToHelp}>?</Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  changeChannel: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  channel: PropTypes.string.isRequired,
  clippy: PropTypes.func.isRequired,
  compileToAssembly: PropTypes.func.isRequired,
  compileToLLVM: PropTypes.func.isRequired,
  execute: PropTypes.func.isRequired,
  format: PropTypes.func.isRequired,
  gistSave: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  crateType: PropTypes.string.isRequired,
  tests: PropTypes.bool.isRequired,
  toggleConfiguration: PropTypes.func.isRequired,
  navigateToHelp: PropTypes.func.isRequired,
};

const mapStateToProps = ({ configuration: { channel, mode, crateType, tests } }) => (
  { channel, mode, crateType, tests, navigateToHelp }
);

const mapDispatchToProps = dispatch => ({
  changeChannel: channel => dispatch(changeChannel(channel)),
  changeMode: mode => dispatch(changeMode(mode)),
  clippy: () => dispatch(performClippy()),
  compileToAssembly: () => dispatch(performCompileToAssembly()),
  compileToLLVM: () => dispatch(performCompileToLLVM()),
  execute: () => dispatch(performExecute()),
  format: () => dispatch(performFormat()),
  gistSave: () => dispatch(performGistSave()),
  toggleConfiguration: () => dispatch(toggleConfiguration()),
});

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default ConnectedHeader;
