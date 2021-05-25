

import './CardDescription.scss'

export const CardDescription = (props) => {

    return (
        <div className="description-container item-container">
            <label htmlFor="description"> <span><i className="fas fa-align-right"></i> </span> Description</label>
            <main>
                <textarea name="description"  id="description" cols="30" rows="10" placeholder="Description..." value={props.cardToSave.description} onChange={((e) => props.changeCardDetails(e))}></textarea>
                <button className="save-button save-button-trello" onClick={((e) => props.updateCard(e,props.cardToSave))} >SAVE</button>
            </main>
        </div>
    )
}
