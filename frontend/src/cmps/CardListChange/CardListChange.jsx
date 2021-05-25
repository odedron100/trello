

import './CardListChange.scss'

export const CardListChange = (props) => {

    return (
        <div className="card-list-change">In list
            <select className="card-list-select" name="card-list" onChange={props.changeCardList} value={props.cardToSave.currList}>
                {Object.keys(props.lists).map((listIdx) =>
                    <option key={listIdx} value={props.lists[listIdx]._id}>{props.lists[listIdx].title}</option>
                )}
            </select>
        </div>
    )
}
