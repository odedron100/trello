import './List.scss'

export const List = ({list}) => {

    return (
        <section className="list">
            <header>
                <div className="title">{list.title}</div>
                <div className="helpers"><i className="fas fa-ellipsis-h"></i></div>
            </header>
            <button className="create-new-card">+ Add new card</button>
            {list.cards.map((card) =>
                <div className="card">{card}</div>
            )}
        </section>
    )
}
