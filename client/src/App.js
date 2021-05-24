import Header from './Header';
import DoctorList from './DoctorList';
import CompanionList from './CompanionList';
import DoctorDetailView from './DoctorDetailView';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDoctor: null,
            currentCompanions: null
        }

        this.handleDoctorSelection = this.handleDoctorSelection.bind(this);
    }
  
    componentDidMount() {
        console.log('mounted!');
    }

    handleDoctorSelection(doc) {
        console.log(doc);
        this.setState({
            currentDoctor: doc
        })
        fetch(`/doctors/${doc._id}/companions`)
            .then(response => response.json())
            .then(companions => {
                this.setState({
                    currentCompanions: companions
                });
                console.log(this.state.currentCompanions);
            })


    }
  
    render () {
        console.log('redraw panels', this.state.currentCompanions);
        
        return (
            <div className="container">
                <Header title="Doctor Who Editor" />

                <DoctorList onDoctorSelection={this.handleDoctorSelection} />

                <main className="main">
                    <DoctorDetailView 
                        doctor={this.state.currentDoctor || {} } />
                    <CompanionList 
                        companions={this.state.currentCompanions} />
                </main>  
            </div>
        );
    }
}

export default App;