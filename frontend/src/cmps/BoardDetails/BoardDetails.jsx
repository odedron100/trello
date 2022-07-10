

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardById } from '../../store/actions/BoardActions';
import { ListsContainer } from '../ListsContainer/ListsContainer';
import './BoardDetails.scss'

export const BoardDetails = (props) => {
    const board = useSelector(state => state.BoardReducer.currBoard)

    const dispatch = useDispatch();
    useEffect(() => {
        const { id } = props.match.params;
        dispatch(getBoardById(id));
    }, []);
    console.log('board', board);
    return (
        <section className="board-details">
            {board && <ListsContainer lists={board.lists}/>}
        </section>
    )
}
