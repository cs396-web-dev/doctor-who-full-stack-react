import React from 'react';

class DoctorDetailView extends React.Component {

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
                </div>
                <img className="thumbMedium" src={doctor.image_url} />
                <p>Seasons: {doctor.seasons ? doctor.seasons.join(', ') : ''}</p>
            </div>
        ) 
    }
}

export default DoctorDetailView;