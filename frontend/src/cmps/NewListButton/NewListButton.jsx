import { useEffect } from 'react';
import { boardService } from '../../services/board.service'
import { useDispatch, useSelector } from 'react-redux';
import { loadBoards, saveBoard } from '../../store/actions/BoardActions'
import {FormButton} from '../FormButton'

import './NewListButton.scss'

export const NewListButton = (props) => {
    const board = useSelector(state => state.BoardReducer.currBoard)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBoards())
    }, []);

    const onAddNewList = (newList) => {
        const newListFromService = boardService.getEmptyList();
        newListFromService.title = newList.title;
        dispatch(saveBoard({...board, lists:{...board.lists, ...newListFromService, ...newList }}))
    }

    return (
        <section className="new-list-button-container">
            <FormButton itemType="list" onSubmit={onAddNewList} />
        </section>
    )
}
