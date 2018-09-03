import React from 'react';
import './Modify.css';

const modifySelectedUser = (person) => {
    console.log("PERSOOOON", person);
    return (
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={close}>&times;</span>
                    <h2>Modify User:</h2>
                </div>
                <div className="modal-body">
                    <div className="modifyLabel"> Name: </div><div><input type="text" value={person.item.name || ""}/></div>
                    <div className="modifyLabel">Phone:</div><div> <input type="text" value={person.item.phone || ""}/></div>
                    <div className="modifyLabel">Age: </div><div><input type="text" value={person.item.age|| ""}/></div>
                </div>
                <div className="modal-footer">
                    <div><button className="saveButton">SAVE</button></div>
                </div>
            </div>
    )
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    let modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

const close = () => {
    document.getElementById('myModal').style.display = "none"
};

/*
const handleChange =(event) => {
  this.setState({: event.target.value})
};
*/


export default modifySelectedUser;
