import './List.scss'
import {utilService} from '../../services/util.service';
import { useEffect,useState,useRef } from 'react';
import {FormButton} from '../FormButton'
import { useDispatch, useSelector } from 'react-redux';
import {saveBoard ,loadBoards} from '../../store/actions/BoardActions'
import { CardModal } from '../CardModal/CardModal';
import { CardList } from '../CardList/CardList';
import { HelpersModal } from '../HelpersModal/HelpersModal';

export const List = ({lists,list}) => {
    const [currCard,setCurrCard] = useState(null);
    const [isOpenModal,setIsOpenModal] = useState(false);
    const [isOpenHelpersModal,setIsOpenHelpersModal] = useState(false);
    const [isEditListTitle,setIsEditListTitle] = useState(false);
    const [newListTitle,setNewListTitle] = useState(list.title);
    const editRef = useRef(null);
    const board = useSelector(state => state.BoardReducer.currBoard)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadBoards())
    }, []);

    document.addEventListener('keydown',(e) => {
        if(isEditListTitle && e.keyCode === 13){
            updateListTitle();
            setIsEditListTitle(false)
        }
    })

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
        let boardToSave = {...board,lists:{...list,cards:{...list.cards,[cardId]:newCard}}}
        console.log('boardToSave', boardToSave);
        dispatch(saveBoard(boardToSave))
    }

    const openModal = (e,card) => {
        if (e.target === editRef.current) return;
        setIsOpenModal(true)
        setCurrCard(card);
    }

    const openHelpersModal = () => {
        setIsOpenHelpersModal(true)
    }

    const setEditListTitle = () => {
        setIsEditListTitle(true);
    }

    const editListTitle = (e) => {
        setNewListTitle(e.target.value);
    }

    const updateListTitle = () => {
        const newList = {...list, title:newListTitle}
        dispatch(saveBoard(newList))
    }
    const cards = list.cards;
    return (
        <section className="list">
            <header>
                 {isEditListTitle ? <input className="edit-title" type="text" value={newListTitle} onChange={editListTitle}/>
                : <div className="title" onClick={setEditListTitle}>{list.title}</div>}
                <div className="helpers" onClick={openHelpersModal}><i className="fas fa-ellipsis-h"></i></div>
                {isOpenHelpersModal && <HelpersModal list={list} setIsOpenModal={setIsOpenModal} setIsOpenHelpersModal={setIsOpenHelpersModal} isOpenHelpersModal={isOpenHelpersModal}/>}
            </header>
            {cards &&<CardList cards={cards} editRef={editRef} openModal={openModal}/>}
            <FormButton itemType="card" onSubmit={handleNewCardSubmit}/>
            {isOpenModal && <CardModal card={currCard} list={list} setIsOpenModal={setIsOpenModal} />}
        </section>
    )
}
