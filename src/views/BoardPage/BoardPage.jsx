
import { useState, useEffect, useRef, useCallback } from 'react';
import './BoardPage.scss'
import { listService } from '../../services/list.service'
import { useDispatch, useSelector } from 'react-redux';
import { loadLists, saveList } from '../../store/actions/ListActions'
import {ListsContainer} from '../../cmps/ListsContainer';

export const BoardPage = (props) => {
    const [isListFormOpen, setIsListFormOpen] = useState(false);
    const formContainerRef = useRef(null);
    const openFormButtonRef = useRef(null);
    const lists = useSelector(state => state.listReducer.lists)
    const [activeList,setActiveList] = useState(listService.getEmptyList())
    // const lists = useSelector(state => state.ListReducer.lists)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadLists())
    }, [])

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
        console.log('lists', lists);
    }

    return (
        <section className="board-page container">
            <ListsContainer lists={lists}/>
           {isListFormOpen ?
             <section className="new-list-form" ref={formContainerRef}>
                <input type="text" placeholder="Enter list title..." onChange={updateListTitle}/>
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
