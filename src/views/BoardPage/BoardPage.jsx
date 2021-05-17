import './BoardPage.scss'
import {useSelector } from 'react-redux';
import {ListsContainer} from '../../cmps/ListsContainer';

export const BoardPage = (props) => {
    const lists = useSelector(state => state.listReducer.lists)
    return (
        <section className="board-page container">
            <ListsContainer lists={lists}/>
        </section>
    )
}
