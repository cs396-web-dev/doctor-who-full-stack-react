// useful reference: https://reactjs.org/docs/faq-ajax.html
import React from 'react';

class DoctorList extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
    }
  
    handleSelection(ev) {
        const docID = ev.target.dataset.key;
        const doctor = this.props.doctors.filter(doc => doc._id === docID)[0];

        // notify the rest of the app that the doctor changed
        this.props.onDoctorSelection(doctor);
    }

    render () {
        if (!this.props.doctors) {
            return (
                <aside className="aside">
                    {/* List of doctors goes here */}
                </aside>
            );
        }

        return (
            <aside className="aside">
                <ol>
                {
                    this.props.doctors.map(item => (
                        <li key={item._id} >
                            <a href="#" data-key={item._id} onClick={this.handleSelection}>{item.name}</a>
                        </li>
                    ))
                }
                </ol>
                <button className="btn" onClick={this.props.addNewDoc}>Add New</button>
            </aside>
        );
    }
}

export default DoctorList;