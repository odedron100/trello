

import './ListsContainer.scss'
import {List} from '../List'

export const ListsContainer = ({lists}) => {
    console.log('lists', lists);
    return (
        <section className="lists-container">
            {lists.map((list) => <List list={list} key={list._id} />)}
        </section>
    )
}
