import { useState } from 'react'
import './CardDescription.scss'

export const CardDescription = (props) => {
    const [newDescription,setNewDescription] = useState(props.cardToSave.description)
    const [newCardToSave,setNewCardToSave] = useState(props.cardToSave)

    const updateDescription = (e) => {
        setNewDescription(e.target.value)
        setNewCardToSave({...newCardToSave,description:newDescription})
        console.log('newCardToSave', newCardToSave);
    }

    return (
        <div className="description-container item-container">
            <label htmlFor="description"> <span><i className="fas fa-align-right"></i> </span> Description</label>
            <main>
                <textarea name="description"  id="description" cols="30" rows="10" placeholder="Description..." value={newDescription} onChange={updateDescription}></textarea>
                <button className="save-button submit-button-trello" onClick={((e) => props.updateCard(e,newCardToSave))} >SAVE</button>
            </main>
        </div>
    )
}
