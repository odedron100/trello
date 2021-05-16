
import { useState, useEffect, useRef, useCallback } from 'react';
import './BoardPage.scss'

export const BoardPage = (props) => {
    const [isListFormOpen, setIsListFormOpen] = useState(false);
    const [listTitle, setListTitle] = useState('');
    const formContainerRef = useRef(null);
    const openFormButtonRef = useRef(null);

    const handleDocumentClick = useCallback((e) => {
        if (e.target === openFormButtonRef.current) {
            return;
        }

        console.log('isListFormOpen', isListFormOpen);
        if (!formContainerRef.current || !isListFormOpen) {
            return;
        }

        if (!formContainerRef.current.contains(e.target)) {
            console.log('closing!');
            setIsListFormOpen(false);
        }
    }, [formContainerRef, isListFormOpen, openFormButtonRef]);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    });

    const updateListTitle = (e) =>{
        setListTitle(e.target.value)
    }

    const toggleListForm = () => {
        console.log('current state:', isListFormOpen);
        console.log('going to change to:', !isListFormOpen);
        setIsListFormOpen(!isListFormOpen);
    }

    return (
        <section className="board-page container">
           {isListFormOpen ?
             <section className="new-list-form" ref={formContainerRef}>
                <input type="text" onChange={updateListTitle}/>
                <button className="add-list"> Add List</button>
                <button className="remove-list" onClick={toggleListForm}> X </button>
            </section>
             :
             <button ref={openFormButtonRef} className="create-list-button" onClick={toggleListForm}>+ Add a list</button>}
        </section>
    )
}
