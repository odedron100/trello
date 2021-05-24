import './ListsContainer.scss'
import {List} from '../List'
import { NewListButton } from '../NewListButton/NewListButton';

export const ListsContainer = ({lists}) => {
    console.log('lists', lists);
    return (
        <section className="lists-container">
            {Object.keys(lists).map((listId) => <List list={lists[listId]} key={listId} />)}
            <NewListButton />
        </section>
    )
}
