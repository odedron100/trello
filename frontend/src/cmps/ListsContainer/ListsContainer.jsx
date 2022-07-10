import './ListsContainer.scss'
import {List} from '../List'
import { NewListButton } from '../NewListButton/NewListButton';

export const ListsContainer = ({lists}) => {
    console.log('lists', lists);
    return (
        <section className="lists-container">
            {Object.keys(lists).map((listId) => <List lists={lists} list={lists[listId]} key={listId} />)}
            <NewListButton />
        </section>
    )
}
