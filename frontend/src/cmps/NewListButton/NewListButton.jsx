import { useEffect } from 'react';
import { listService } from '../../services/list.service'
import { useDispatch } from 'react-redux';
import { loadLists, saveList } from '../../store/actions/ListActions'
import {FormButton} from '../FormButton'

import './NewListButton.scss'

export const NewListButton = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadLists())
    }, []);

    const onAddNewList = (newList) => {
        dispatch(saveList({...listService.getEmptyList(), ...newList }))
    }

    return (
        <section className="new-list-button-container">
            <FormButton itemType="list" onSubmit={onAddNewList} />
        </section>
    )
}
