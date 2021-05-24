import React from 'react';

class DoctorEditView extends React.Component {
    constructor(props) {
        super(props);
        const {_id, name, seasons, ordering, image_url} = props.doctor;
        this.state = {
            _id: _id, 
            name: name, 
            seasons: seasons ? seasons.join(', ') : '', 
            ordering: ordering, 
            image_url: image_url,
            errors: {
                name: '', 
                seasons: '', 
                ordering: '', 
                image_url: ''
            }
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //*********************************************************/
    // NOTE: HACK
    // This feels like a hac to me.
    // When you're using the state object to manage the form data,
    // but then this component's props are updated by the
    // parent container (i.e. the user wants to edit
    // a different doctor), this is the only way that I could find
    // to update the state.
    //
    // Is there's also a way to destroy and recreate the form?
    // Seems cleaner
    //*********************************************************/
    static getDerivedStateFromProps(props, state) {
        // this hook fires everytime props or state is modified:
        if (!props.doctor || props.doctor._id === state._id) {
            return null;
        }
        const {_id, name, seasons, ordering, image_url} = props.doctor;
        return {
            _id: _id, 
            name: name, 
            seasons: seasons ? seasons.join(', ') : '', 
            ordering: ordering, 
            image_url: image_url,
            errors: {
                name: '', 
                seasons: '', 
                ordering: '', 
                image_url: ''
            }
        };
    }
    
    handleChange (ev) {
        let val = ev.currentTarget.value;
        const prop = ev.currentTarget.name;
        const errors = this.state.errors;
        if (prop ==='name') {
            errors[prop] = val.length >= 1 ? '' : 'Name is required';
        } else if (prop ==='seasons') { 
            let seasonsError = '';
            const seasonsUnvalidated = val.split(',');
            for (const season of seasonsUnvalidated) {
                const seasonNum = parseInt(season.trim());
                if (Number.isNaN(seasonNum) && season.trim().length > 0) {
                    seasonsError = 'Please verify that your "seasons" entry is correct.';
                    break;
                }
            }
            errors[prop] = seasonsError; 
        } else if (prop ==='ordering') { 
            let orderingError = '';
            const ordering = parseInt(val.trim());
            if (Number.isNaN(ordering) && val.trim().length > 0) {
                orderingError = 'Ordering must be an integer.';
            }
            errors[prop] = orderingError; 
            if (errors[prop].length === 0) {
                val = parseInt(val);
            }
        }
        this.setState({
            [prop]: val,
            errors: errors
        });
    }

    parseSeasons (seasonsString) {
        return seasonsString.toString().split(',')
            .map(season => parseInt(season.trim()))
            .filter(num => !Number.isNaN(num));
    }

    handleSubmit (ev) {
        ev.preventDefault();

        const errors = this.state.errors
        if (errors.name.length > 0 || errors.seasons.length > 0 | errors.ordering.length > 0) {
            return;
        }
        const data = {
            name: this.state.name,
            seasons: this.parseSeasons(this.state.seasons),
            ordering: this.state.ordering,
            image_url: this.state.image_url
        };
        let url = '/doctors/';
        let method = 'POST'
        if (this.props.mode === 'edit') {
            url += this.state._id;
            method = 'PATCH';
        }

        // OK to submit:
        fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                this.props.onDoctorCreateUpdate(data);
                this.props.onToggleMode('view');
            });

    }

    render () {
        const buttonText = this.state._id ? "Update" : "Create";
        const errors = this.state.errors;
        if (!this.state._id && this.props.mode !== 'create') {
            return (
                <section className="doctor"></section>   
            )                                               
        }
        return ( 
            <div className="doctor">
                <form id="edit-doctor-form">
                    <div className="error"></div>
                    <div className="input-section">
                        <label>Name</label>
                        <input type="text" 
                            name="name" 
                            value={this.state.name}
                            onChange={this.handleChange} />
                        {errors.name.length > 0 && 
                            <span className='error'>{errors.name}</span>}
                    </div>
                    <div className="input-section">
                        <label>Seasons</label>
                        <input type="text" 
                            name="seasons" 
                            value={this.state.seasons}
                            onChange={this.handleChange} />
                            {errors.seasons.length > 0 && 
                                <span className='error'>{errors.seasons}</span>}
                    </div>
                    <div className="input-section">
                        <label>Ordering</label>
                        <input type="text" 
                            name="ordering" 
                            value={this.state.ordering}
                            onChange={this.handleChange} />
                            {errors.ordering.length > 0 && 
                                <span className='error'>{errors.ordering}</span>}
                    </div>
                    <div className="input-section">
                        <label>Image</label>
                        <input type="text" 
                            name="image_url" 
                            value={this.state.image_url}
                            onChange={this.handleChange} />
                    </div>
                    <button className="btn btn-main" onClick={this.handleSubmit}>{buttonText}</button>
                    <a className="btn" onClick={ev => { this.props.onToggleMode('view', ev);}}>Cancel</a>
                </form>
            </div>
        ) 
    }
}

export default DoctorEditView;