import './List.scss'
import {utilService} from '../../services/util.service';
import { useEffect,useState,useRef } from 'react';
import {FormButton} from '../FormButton'
import { useDispatch } from 'react-redux';
import {saveList ,loadLists} from '../../store/actions/ListActions'
import { CardModal } from '../CardModal/CardModal';

export const List = ({list}) => {
    const [currCard,setCurrCard] = useState(null);
    const [isOpenModal,setIsOpenModal] = useState(false);
    const editRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadLists())
    }, []);


    const handleNewCardSubmit = (newItem) => {
        const cardId = utilService.makeId()
        const newCard = {
            id:cardId,
            title: newItem.title,
            description:'',
            color:[],
            isWatch:false,
            currList: list._id,
            checkLists:[]
        }
        let listToSave = {...list,cards:{...list.cards,[cardId]:newCard}}
        dispatch(saveList(listToSave))
    }

    const openModal = (e,card) => {
        if (e.target === editRef.current) return;
        setIsOpenModal(true)
        setCurrCard(card);
    }

    const cards = list.cards;
    return (
        <section className="list">
            <header>
                <div className="title">{list.title}</div>
                <div className="helpers"><i className="fas fa-ellipsis-h"></i></div>
            </header>
            <section className="cards">
                {console.log('cards', cards)}
                {Object.keys(cards).map((cardId) => {
                    return(
                        <section key={cardId} className="card" onClick={((e) => openModal(e, cards[cardId]))}>
                            <div className="card-labels">
                                {cards[cardId].color.map((label) =><div className="card-label" key={label} style={{backgroundColor: label}}></div>)}
                            </div>
                            <div className="main-card">
                                <div>{cards[cardId].title}</div>
                                <span><i className="far fa-edit" ref={editRef}></i></span>
                            </div>
                            <footer>
                                {cards[cardId].description && <div className="card-description"> <i className="fas fa-align-right"></i> </div>}
                                {cards[cardId].isWatch && <div className="card-isWatch"> <i className="far fa-eye"></i> </div>}
                            </footer>
                        </section>
                    )
                })}
            </section>
            <FormButton itemType="card" onSubmit={handleNewCardSubmit} />
            {isOpenModal && <CardModal card={currCard} list={list} setIsOpenModal={setIsOpenModal} />}
        </section>
    )
}
