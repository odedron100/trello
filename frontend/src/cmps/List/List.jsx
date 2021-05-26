import './List.scss'
import {utilService} from '../../services/util.service';
import { useEffect,useState,useRef } from 'react';
import {FormButton} from '../FormButton'
import { useDispatch } from 'react-redux';
import {saveList ,loadLists} from '../../store/actions/ListActions'
import { CardModal } from '../CardModal/CardModal';
import { CardList } from '../CardList/CardList';
import { HelpersModal } from '../HelpersModal/HelpersModal';

export const List = ({list}) => {
    const [currCard,setCurrCard] = useState(null);
    const [isOpenModal,setIsOpenModal] = useState(false);
    const [isOpenHelpersModal,setIsOpenHelpersModal] = useState(false);
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

    const openHelpersModal = () => {
        setIsOpenHelpersModal(true)
    }

    const cards = list.cards;
    return (
        <section className="list">
            <header>
                <div className="title">{list.title}</div>
                <div className="helpers" onClick={openHelpersModal}><i className="fas fa-ellipsis-h"></i></div>
                {isOpenHelpersModal && <HelpersModal list={list} setIsOpenModal={setIsOpenModal} setIsOpenHelpersModal={setIsOpenHelpersModal} isOpenHelpersModal={isOpenHelpersModal}/>}
            </header>
            <CardList cards={cards} editRef={editRef} openModal={openModal}/>
            <FormButton itemType="card" onSubmit={handleNewCardSubmit}/>
            {isOpenModal && <CardModal card={currCard} list={list} setIsOpenModal={setIsOpenModal} />}
        </section>
    )
}
