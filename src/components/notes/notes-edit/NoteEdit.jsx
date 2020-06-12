import React, { useState, useEffect } from 'react';
import { SaveNote, getNoteById } from '../../../core/api/notes.api';
import { Redirect } from 'react-router-dom';
import './NoteEdit.css';

export function NotesEdit(props) {

    const [currentNote, setCurrentNote] = useState({title: '', content: '', authorId: '', authorName: '', date: '', isImportant: false, requiredTime : ''});
    const [shouldRedirect, setShouldRedirect] = useState(false);
    console.log(props);
    useEffect(() => {
        if (props.computedMatch.params.id) {
            getNoteById(props.computedMatch.params.id).then((result) => {
                setCurrentNote(result.data);
            });
        }
    }, [props.computedMatch.params.id])

    const onInputChange = (event) => {
        event.persist();
        setCurrentNote((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onNoteSave = (event) => {
        event.preventDefault();
        SaveNote(currentNote).then(() => { 
            setShouldRedirect(true);
        })
        .catch((err) => console.error(err));
    }

    const onCheckBoxChange = (event) => {
        event.persist();
        setCurrentNote((prevState)=>({
            ...prevState,
            [event.target.name]: event.target.checked
        }))
    
 
      
        
    };

    return (
        <>
        { shouldRedirect && <Redirect to="/notes" /> }
        <div className="note-edit-wrapper">
            <form onSubmit={onNoteSave}>
                <div className="form-group">
                    <label labelfor="title">Title: </label>
                    <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={currentNote.title} />
                </div>
                <div className="form-group">
                    <label labelfor="content">Content: </label>
                    <textarea className="form-control" id="content" name="content" onChange={onInputChange} value={currentNote.content} />
                </div>
                <div className="form-group">
                    <label labelfor="status">Status: </label>
                    <select className="form-control" id="status" name="status" onChange={onInputChange} value={currentNote.status}>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="form-group">
                       
                       
                       <label labelfor="isImportant">Is it important: </label>
                       <input type="checkbox" name="isImportant" id="isImportant" className="form-control" onChange={onCheckBoxChange} checked={currentNote.isImportant} />
                  
               </div>
               <div className="form-group">
                       
                       
                       <label labelfor="requiredTime">Time required:  </label>
                       <input type="number" name="requiredTime" id="requiredTime" className="form-control" onChange={onInputChange} value={currentNote.requiredTime} />
                  
               </div>
                <button className="btn btn-primary">Save note</button>
            </form>
        </div>
        </>
    )
}
