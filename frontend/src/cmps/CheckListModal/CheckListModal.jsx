import {useState } from 'react';
import './CheckListModal.scss'

export const CheckListModal = (props) => {
    const [checkListTitle,setCheckListTitle] = useState(null);

    const onInputChange = (e) => {
        setCheckListTitle(e.target.value);
    }

    const handleAddCheckList = () => {
        if(!checkListTitle) return;
        props.addCheckList(checkListTitle)
    }

    return (
        <section className="check-list-modal">
            <header className="header">Check list</header>
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="Enter title..." onChange={onInputChange}/>
            <button className="add save-button-trello" onClick={handleAddCheckList}>Add</button>
        </section>
    )
}
