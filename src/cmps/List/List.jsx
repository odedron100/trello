

import './List.scss'

export const List = ({list}) => {

    return (
        <section className="list">
            <div className="title">{list.title}</div>
            {list.cards.map((card) =>
                <div className="card">{card}</div>
            )}
        </section>
    )
}
