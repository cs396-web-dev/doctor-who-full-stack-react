import React from 'react';

class DoctorDetailView extends React.Component {
    constructor(props) {
        super(props);

        this.deleteDoc = this.deleteDoc.bind(this);

    }

    deleteDoc (ev) {
        const answer = window.confirm('Are you sure?');
        if (answer) {
            const url = `/doctors/${this.props.doctor._id}`;
            fetch(url, {
                    method: 'DELETE'
                })
                .then(response => response.text())
                .then(() => {
                    this.props.onDoctorDelete();
                });
        }
    }

    render () {
        const doctor = this.props.doctor;
        if (!doctor.name) {
            return (
                <section className="doctor"></section>   
            )                                               
        }
            
        return ( 
            <div className="doctor">
                <div className="top">
                    <h2>{doctor.name}</h2>
                    <div>
                        <button className="btn" onClick={ev => { this.props.onToggleMode('edit', ev);} }>Edit</button> 
                        <button className="btn" onClick={this.deleteDoc}>delete</button> 
                    </div>
                </div>
                {doctor.image_url && <img alt={doctor.name + ' image'} className="thumbMedium" src={doctor.image_url} />}
                <p>Seasons: {doctor.seasons ? doctor.seasons.join(', ') : ''}</p>
            </div>
        ) 
    }
}

export default DoctorDetailView;