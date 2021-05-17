import { useState, useEffect, useRef, useCallback } from 'react';
import { listService } from '../../services/list.service'
import { useDispatch, useSelector } from 'react-redux';
import { loadLists, saveList } from '../../store/actions/ListActions'

import './NewListButton.scss'

export const NewListButton = (props) => {

    const [isListFormOpen, setIsListFormOpen] = useState(false);
    const [newListInputValue, setNewListInputValue] = useState('');
    const formContainerRef = useRef(null);
    const openFormButtonRef = useRef(null);
    const lists = useSelector(state => state.listReducer.lists)
    const [activeList,setActiveList] = useState(listService.getEmptyList())
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadLists())
    }, []);

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
        setNewListInputValue(e.target.value);
        setActiveList({...activeList, title: e.target.value});
    }

    const toggleListForm = () => {
        console.log('current state:', isListFormOpen);
        console.log('going to change to:', !isListFormOpen);
        setIsListFormOpen(!isListFormOpen);
    }

    const onAddNewList = (e) => {
        dispatch(saveList(activeList))
        setActiveList(listService.getEmptyList())
        setNewListInputValue('');
        // e.target.value = '';
    }

    return (
        <section className="new-list-button-container">
            {isListFormOpen ?
                <section className="new-list-form" ref={formContainerRef}>
                    <input type="text" placeholder="Enter list title..." onChange={updateListTitle} value={newListInputValue}/>
                    <footer>
                        <button className="add-list trello-button" onClick={onAddNewList}> Add List</button>
                        <button className="remove-list" onClick={toggleListForm}><i className="fas fa-times"></i></button>
                    </footer>
                </section>
            :
            <button ref={openFormButtonRef} className="create-list-button" onClick={toggleListForm}>+ Add a list</button>}
        </section>
    )
}
