import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';
import { NoteStatus, deleteNote } from '../../../core/api/notes.api';



const noteCardStyle = {
    maxWidth: '18rem'
}

const deleteBtnStyles = {
    cursor:'pointer'
}

const editBtnStyle ={
    cursor: 'poiner',
    color: 'rgb(139,0,139)'
}

export function NoteCard({ note, onDeleteClick }) {
    const loggedUser = getLoggedUser();

    let noteClassByType = "card text-white m-3 ";
    switch(note.status) {
        case NoteStatus.Active: 
            noteClassByType += "bg-primary";
        break;
        case NoteStatus.Done: 
            noteClassByType += "bg-success";
        break;
        case NoteStatus.Pending:
            noteClassByType += "bg-secondary";
        break;
        default: 
            noteClassByType += "bg-primary";
        break;
    }
    function  requiredTime (){
 
        let evaluation=parseInt(note.evaluation);
        if (evaluation<2) {
            return "card text-white bg-info mb-3";
           
        }
        else if(evaluation>=2 && evaluation<=5){
            return "card text-white bg-warning mb-3";
        }
        else{
            return "card text-white bg-danger mb-3";
        }
    }

    return (
    <div className={noteClassByType} style={noteCardStyle}>
        <div className="card-header">
            {note.title}
            { (loggedUser.isAdmin || loggedUser.id === note.authorId) && <Link to={`/notes/edit/${note.id}`} > Edit </Link> }
    { (loggedUser.isAdmin || loggedUser.id === note.authorId) && <span style={deleteBtnStyles} onClick={() => onDeleteClick(note.id)}>Delete</span> }
        </div>
        <div className="card-body">
            <p className="card-text">{note.content}</p>
        </div>
        <div className="card-footer bg-transparent border-secondary">
            <div>Author: {note.authorName}</div>
            <div>Created on: {note.date}</div>
            <div className={(note.isImportant && "text-warning") || "text-success"}> Status: {(note.isImportant && "It is important") || "It is not important"}</div>
            <div className = {requiredTime()}>Time required: {note.requiredTime} hr</div>
        </div>
    </div>
    )
}