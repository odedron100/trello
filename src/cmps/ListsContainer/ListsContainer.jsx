import './ListsContainer.scss'
import {List} from '../List'
import { NewListButton } from '../NewListButton/NewListButton';

export const ListsContainer = ({lists}) => {
    return (
        <section className="lists-container">
            {lists.map((list) => <List list={list} key={list._id} />)}
            <NewListButton />
        </section>
    )
}
