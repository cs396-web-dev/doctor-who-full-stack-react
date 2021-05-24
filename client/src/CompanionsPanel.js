import React from 'react';
import CompanionList from './CompanionList';

class CompanionsPanel extends React.Component {

    render () {
        return (
            <CompanionList companions={this.props.companions}  />
        )
    }
}

export default CompanionsPanel;