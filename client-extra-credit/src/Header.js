import React from 'react';

class Header extends React.Component {

    constructor(props) {
        super(props);
        
        this.resetData = this.resetData.bind(this);
    }

    resetData (ev) {
        fetch(`/reset/`)
            .then(response => response.json())
            .then(this.props.onReset);

        ev.preventDefault();
    }

    render () {
        return (
            <header className="header">
                <h1>{this.props.title}</h1>
                <button id="reset" className="btn" onClick={this.resetData}>Reset Data</button>
            </header>
        );
    }
}

export default Header;