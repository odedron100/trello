import './List.scss'
import {FormButton} from '../FormButton'

export const List = ({list}) => {
    const handleNewCardSubmit = (newCard) => {
        console.log('newCard', newCard);
    }

    return (
        <section className="list">
            <header>
                <div className="title">{list.title}</div>
                <div className="helpers"><i className="fas fa-ellipsis-h"></i></div>
            </header>
            {/* <button className="create-new-card">+ Add new card</button> */}
            {list.cards.map((card) =>
                <div className="card">{card}</div>
            )}
            <FormButton itemType="card" onSubmit={handleNewCardSubmit} />
        </section>
    )
}
