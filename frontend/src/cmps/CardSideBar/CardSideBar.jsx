import { useRef } from 'react';
import { LabelsModal } from '../LabelsModal';
import { CheckListModal } from '../CheckListModal/CheckListModal';
import { utilService } from '../../services/util.service';
import {saveList} from '../../store/actions/ListActions';
import { useDispatch } from 'react-redux';
import './CardSideBar.scss'

export const CardSideBar = (props) => {
    const dispatch = useDispatch();
    const sideBarModalRef = useRef(null);

    const openSideBarModal = (e,value) => {
        props.setWhichSideBarModalOpen(value)
    }

    const updateLabelsCard = (e,value) => {
        const newList = {...props.list};
        const cards = newList.cards;
        if(!cards[props.cardToSave.id].color.includes(value)){
            cards[props.cardToSave.id].color = [...cards[props.cardToSave.id].color, value]
        }

        dispatch(saveList(newList))
    }

     const watchCard = (e) => {
        const newList = {...props.list};
        const cards = newList.cards
        cards[props.cardToSave.id].isWatch = !cards[props.cardToSave.id].isWatch
        dispatch(saveList(newList))
    }

    const addCheckList = (title) => {
        const newList = {...props.list};
        const cards = newList.cards;
        const checkList = {
            id:utilService.makeId(),
            title,
            tasks:{}
        }
        cards[props.cardToSave.id].checkLists.push(checkList);
        dispatch(saveList(newList))
    }

    return (
        <div className="side-bar">
            <header className="side-bar-title">ADD TO CARD</header>
            <div className="labels item" onClick={((e) => openSideBarModal(e,'labels'))}><i className="fas fa-tag"></i> labels </div>
            {props.whichSideBarModalOpen === 'labels' && <LabelsModal sideBarModalRef={sideBarModalRef}  updateLabelsCard={updateLabelsCard} />}
            <div className="watch item" onClick={watchCard}><i className="far fa-eye"></i> Watch </div>
            <div className="todo-list item" onClick={((e) => openSideBarModal(e,'checkList'))}><i className="far fa-calendar-check"></i> Checklist </div>
            {props.whichSideBarModalOpen === 'checkList' && <CheckListModal sideBarModalRef={sideBarModalRef} addCheckList={addCheckList} />}
            <div className="delete item" onClick={props.removeCard}><i className="far fa-trash-alt"></i> Delete Card </div>
        </div>
    )
}
