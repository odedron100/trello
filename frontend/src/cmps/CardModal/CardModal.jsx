import { useRef,useEffect,useCallback, useState } from 'react';
import {saveList} from '../../store/actions/ListActions';
import './CardModal.scss';
import { useDispatch,useSelector } from 'react-redux';
import { utilService } from '../../services/util.service';
import { CardListChange } from '../CardListChange/CardListChange';
import { CardDescription } from '../CardDescription/CardDescription';
import {CheckLists} from '../CheckLists/CheckLists';
import { CardSideBar } from '../CardSideBar/CardSideBar';
import { CloseModals } from '../CloseModals/CloseModals';

export const CardModal = (props) => {
    const dispatch = useDispatch();
    const cardModalContaiinerRef = useRef(null);
    const cardModalRef = useRef(null);
    const [cardToSave,setCardToSave] = useState(props.card);
    const [newTaskTitleToAdd,setNewTaskTitleToAdd] = useState(null)
    const [whichSideBarModalOpen,setWhichSideBarModalOpen] = useState('');
    const lists = useSelector(state => state.listReducer.lists)

    const changeCardDetails = (e) => {
        const type = e.target.name
        const value = e.target.value
            setCardToSave({...cardToSave, [type]: value})
    }

    const updateCard = (e,cardToSave) => {
        const newList = {...props.list};
        const cards = newList.cards;
        cards[cardToSave.id] = cardToSave
        dispatch(saveList(newList))
    }

    const removeCard = (e) => {
        const newList = {...props.list};
        const cards = newList.cards
        delete cards[cardToSave.id]
        dispatch(saveList(newList))
        props.setIsOpenModal(false)
    }

    const addTaskToCheckList = (e,checkListId) => {
        const newList = {...props.list};
        const cards = newList.cards;
        const cardCheckLists = cards[cardToSave.id].checkLists

        const checkListToUpdateIdx = cardCheckLists.findIndex(checkListFromArray => {
            return checkListFromArray.id === checkListId
        })

        const taskToAdd = {
            id : utilService.makeId(),
            title:newTaskTitleToAdd,
            isDone: false
        }
        cardCheckLists[checkListToUpdateIdx].tasks[taskToAdd.id] = taskToAdd;
        dispatch(saveList(newList))
        setNewTaskTitleToAdd('');
    }

    const updateNewTaskTitle = (e) => {
        setNewTaskTitleToAdd(e.target.value);
    }

    const changeCardList = (e) =>{
        const listOfCard = {...props.list};
        const cards = listOfCard.cards
        const newListId = e.target.value;
        cards[cardToSave.id].currList = newListId

        removeCard(null,cardToSave.id)

        const newList = lists[newListId];
        newList.cards = {...newList.cards,[cardToSave.id]:cardToSave};
        dispatch(saveList(newList))
    }

    const updateTaskDone = (e,checkListId,taskId) => {
        const newList = {...props.list};
        const cards = newList.cards;
        const cardCheckLists = cards[cardToSave.id].checkLists

        const checkListToUpdateIdx = cardCheckLists.findIndex(checkListFromArray => {
            return checkListFromArray.id === checkListId
        })

        const currTaskIsDone = cardCheckLists[checkListToUpdateIdx].tasks[taskId].isDone;

        cardCheckLists[checkListToUpdateIdx].tasks[taskId].isDone = !currTaskIsDone
        dispatch(saveList(newList))
    }

    return (
        <section className="card-modal-container" ref={cardModalContaiinerRef}>
            <div className="card-modal" ref={cardModalRef}>
                <div  className="title-modal-container modal-header">
                    <label className="title-modal-label"><i className="fas fa-laptop"></i> Title</label>
                    <div className="title-modal">{props.card.title}</div>
                </div>
                <CardListChange changeCardList={changeCardList} cardToSave={props.list.cards[cardToSave.id]} lists={lists}/>
                <section className="main-container">
                    <main className="container">
                        <CardDescription cardToSave={props.list.cards[cardToSave.id]} changeCardDetails={changeCardDetails} updateCard={updateCard}/>
                        {props.list.cards[cardToSave.id].checkLists.map((checkList,idx) =>
                            <CheckLists checkList={checkList} key={idx} updateTaskDone={updateTaskDone} addTaskToCheckList={addTaskToCheckList} updateNewTaskTitle={updateNewTaskTitle} newTaskTitleToAdd={newTaskTitleToAdd}/>
                        )}
                    </main>
                        <CardSideBar removeCard={removeCard} cardToSave={props.list.cards[cardToSave.id]} whichSideBarModalOpen={whichSideBarModalOpen} setWhichSideBarModalOpen={setWhichSideBarModalOpen} list={props.list}/>
                </section>
                <CloseModals cardModalRef={cardModalRef} setWhichSideBarModalOpen={setWhichSideBarModalOpen} cardModalContaiinerRef={cardModalContaiinerRef} setIsOpenModal={props.setIsOpenModal}/>
            </div>
        </section>
    )
}
