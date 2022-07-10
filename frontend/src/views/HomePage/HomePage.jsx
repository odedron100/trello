import './HomePage.scss'
import {useDispatch, useSelector } from 'react-redux';
import {loadBoards} from '../../store/actions/BoardActions'
// import {ListsContainer} from '../../cmps/ListsContainer';
import { useEffect } from 'react';
import { BoardList } from '../../cmps/BoardList/BoardList';

export const HomePage = (props) => {
    const boards = useSelector(state => state.BoardReducer.boards)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadBoards())
    }, []);
    return (
        <section className="home-page container">
            {/* {boards && <ListsContainer lists={lists}/>} */}
            {boards && <BoardList boards={boards}/>}
        </section>
    )
}
