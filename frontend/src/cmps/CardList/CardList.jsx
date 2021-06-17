

import { CardPreview } from '../CardPreview/CardPreview'
import './CardList.scss'

export const CardList = (props) => {

    return (
         <section className="card-list">
                {Object.keys(props.cards).map((cardId) => {
                    return(
                        <CardPreview key={cardId} cards={props.cards} cardId={cardId} editRef={props.editRef} openModal={props.openModal}/>
                    )
                })}
            </section>
    )
}
