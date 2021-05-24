import React from 'react';
import DoctorDetailView from './DoctorDetailView';
import DoctorEditView from './DoctorEditView';

class DetailPanel extends React.Component {

    render () {
        const doc = this.props.doctor || {};
        if (this.props.mode === 'view') {
            return (
               <DoctorDetailView 
                    doctor={doc}
                    mode={this.props.mode}
                    onToggleMode={this.props.onToggleMode}
                    onDoctorDelete={this.props.onDoctorDelete}  />
            ) 
        } else {
            return (
                <DoctorEditView 
                    doctor={doc}
                    mode={this.props.mode}
                    onToggleMode={this.props.onToggleMode}
                    onDoctorCreateUpdate={this.props.onDoctorCreateUpdate} />
            )
        }
    }
}

export default DetailPanel;