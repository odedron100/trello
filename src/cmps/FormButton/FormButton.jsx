import { useState, useEffect, useRef, useCallback } from 'react';
import './FormButton.scss'

export const FormButton = (props) => {

    const [isItemFormOpen, setIsItemFormOpen] = useState(false);
    const [newItemInputValue, setNewItemInputValue] = useState('');
    const formContainerRef = useRef(null);
    const openFormButtonRef = useRef(null);


      const handleDocumentClick = useCallback((e) => {
        if (e.target === openFormButtonRef.current) {
            return;
        }

        console.log('isItemFormOpen', isItemFormOpen);
        if (!formContainerRef.current || !isItemFormOpen) {
            return;
        }

        if (!formContainerRef.current.contains(e.target)) {
            console.log('closing!');
            setIsItemFormOpen(false);
        }
    }, [formContainerRef, isItemFormOpen, openFormButtonRef]);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    });

    const toggleListForm = () => {
        console.log('current state:', isItemFormOpen);
        console.log('going to change to:', !isItemFormOpen);
        setIsItemFormOpen(!isItemFormOpen);
    }

    const updateItemTitle = (e) => {
        setNewItemInputValue(e.target.value);
    }

    const onSubmit = (e) => {
        const newItem = {
            title: newItemInputValue
        };

        props.onSubmit(newItem);
        setNewItemInputValue('');
    }

    return (
        <div>
            {isItemFormOpen ?
                <section className="new-list-form" ref={formContainerRef}>
                    <input autoFocus type="text" placeholder="Enter list title..." onChange={updateItemTitle} value={newItemInputValue}/>
                    <footer>
                        <button className="add-list trello-button" onClick={onSubmit}>{`Add ${props.itemType}`}</button>
                        <button className="remove-list" onClick={toggleListForm}><i className="fas fa-times"></i></button>
                    </footer>
                </section>
            :
            <button ref={openFormButtonRef} className="create-list-button" onClick={toggleListForm}>+ Add a {props.itemType}</button>}
        </div>
    )
}
