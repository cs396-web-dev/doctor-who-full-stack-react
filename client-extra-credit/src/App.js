import Header from './Header';
import DoctorList from './DoctorList';
import DetailPanel from './DetailPanel';
import CompanionsPanel from './CompanionsPanel';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.modes = {
            view: 'view',
            edit: 'edit',
            create: 'create'
        }
        this.state = {
            currentDoctor: null,
            currentCompanions: null,
            mode: this.modes.view
        }

        // this.syncDoctorData();

        this.handleDoctorSelection = this.handleDoctorSelection.bind(this);
        this.fetchDoctors = this.fetchDoctors.bind(this); 
        this.handleCreateUpdateDoctor = this.handleCreateUpdateDoctor.bind(this);
        this.handleDeleteDoctor = this.handleDeleteDoctor.bind(this);
        this.showCreateDocForm = this.showCreateDocForm.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
    }
  
    handleDoctorSelection(doc) {
        this.setState({
            currentDoctor: doc,
            mode: this.modes.view
        })
        fetch(`/doctors/${doc._id}/companions`)
            .then(response => response.json())
            .then(companions => {
                this.setState({
                    currentCompanions: companions
                });
            })
    }
    
    showCreateDocForm () {
        this.setState({
            currentDoctor: null,
            currentCompanions: null,
            mode: this.modes.create
        })
    }

    componentDidMount() {
        this.fetchDoctors()
    }

    fetchDoctors () {
        fetch('/doctors')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    doctors: data
                })
            });
    }

    toggleMode(mode, ev) {
        this.setState({
            mode: this.modes[mode]
        })
        if (ev) {
            ev.preventDefault();
        }
    }

    handleReset () {
        this.handleDeleteDoctor();
    }

    handleCreateUpdateDoctor (doc) {
        this.setState({
            currentDoctor: doc
        });
        this.fetchDoctors();
    }

    handleDeleteDoctor () {
        this.setState({
            currentDoctor: null,
            currentCompanions: null
        });
        this.fetchDoctors();
    }
  
    render () {
        
        return (
            <div className="container">
                <Header title="Doctor Who Editor"
                    onReset={this.handleReset} />

                <DoctorList 
                    onDoctorSelection={this.handleDoctorSelection} 
                    doctors={this.state.doctors}
                    addNewDoc={this.showCreateDocForm} />

                <main className="main">
                    <DetailPanel 
                        doctor={this.state.currentDoctor}
                        mode={this.state.mode}
                        onToggleMode={this.toggleMode}
                        onDoctorCreateUpdate={this.handleCreateUpdateDoctor}
                        onDoctorDelete={this.handleDeleteDoctor} />

                    <CompanionsPanel 
                        companions={this.state.currentCompanions} />
                </main>
            </div>
        );
    }
}

export default App;