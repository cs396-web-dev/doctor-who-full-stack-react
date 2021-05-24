import React from 'react';

class CompanionList extends React.Component {
  
    render () {
        console.log('rendering...', this.props.companions);
        if (!this.props.companions) {
            return (
                <section className="companions"></section>
            );
        }
        const companions = this.props.companions;
        return (
            <section className="companions">
                <h2>Companions</h2>
                <table>
                {
                    companions.map(companion => (
                        <tr key={companion._id} data-id={companion._id}>
                            <td><img className="thumb" src={companion.image_url} /></td>
                            <td>{companion.name}</td>
                            {/* <td><a className="edit-companion" data-id={companion._id} href="#">Edit</a></td>  */}
                            {/* <td><a className="delete-companion" data-id={companion._id} href="#">Delete</a></td> */}
                        </tr>
                    ))
                }
                </table>
            </section>
        );
    }
}

export default CompanionList;