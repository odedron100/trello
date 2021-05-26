

import './CardPreview.scss'

export const CardPreview = (props) => {

    return (
        <section key={props.cardId} className="card" onClick={((e) => props.openModal(e, props.cards[props.cardId]))}>
            <div className="card-labels">
                {props.cards[props.cardId].color.map((label) =><div className="card-label" key={label} style={{backgroundColor: label}}></div>)}
            </div>
            <div className="main-card">
                <div>{props.cards[props.cardId].title}</div>
                <span><i className="far fa-edit" ref={props.editRef}></i></span>
            </div>
            <footer>
                {props.cards[props.cardId].description && <div className="card-description"> <i className="fas fa-align-right"></i> </div>}
                {props.cards[props.cardId].isWatch && <div className="card-isWatch"> <i className="far fa-eye"></i> </div>}
            </footer>
        </section>
    )
}
