import { useRef,useEffect,useCallback, useState } from 'react';
import {saveList} from '../../store/actions/ListActions';
import './CardModal.scss';
import { useDispatch,useSelector } from 'react-redux';
import { LabelsModal } from '../LabelsModal';
import { CheckListModal } from '../CheckListModal/CheckListModal';
import { utilService } from '../../services/util.service';

export const CardModal = (props) => {
    const dispatch = useDispatch();
    const cardModalContaiinerRef = useRef(null);
    const cardModalRef = useRef(null);
    const sideBarModalRef = useRef(null);
    const [cardToSave,setCardToSave] = useState(props.card);
    const [newTaskTitleToAdd,setNewTaskTitleToAdd] = useState(null)
    const [whichSideBarModalOpen,setWhichSideBarModalOpen] = useState('');
    const lists = useSelector(state => state.listReducer.lists)

    const handleDocumentClick = useCallback((e) => {
        if(e.path[0] === cardModalRef.current
            || e.path[1] === cardModalRef.current
            || e.path[2] === cardModalRef.current
            || e.target === cardModalRef.current){
            setWhichSideBarModalOpen('')
        }

        if (e.target === cardModalRef.current) {
            return;
        }


            if (e.target === cardModalContaiinerRef.current) {
                props.setIsOpenModal(false);
            }
        }, [cardModalRef, cardModalContaiinerRef]);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    });

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

    const openSideBarModal = (e,value) => {
        setWhichSideBarModalOpen(value)
    }

    const updateLabelsCard = (e,value) => {
        const newList = {...props.list};
        const cards = newList.cards;
        if(!cards[cardToSave.id].color.includes(value)){
            cards[cardToSave.id].color = [...cards[cardToSave.id].color, value]
        }

        dispatch(saveList(newList))
    }

    const removeCard = (e) => {
        const newList = {...props.list};
        const cards = newList.cards
        delete cards[cardToSave.id]
        dispatch(saveList(newList))
        props.setIsOpenModal(false)
    }

     const watchCard = (e) => {
        const newList = {...props.list};
        const cards = newList.cards
        cards[cardToSave.id].isWatch = !cards[cardToSave.id].isWatch
        dispatch(saveList(newList))
    }

    const addCheckList = (title) => {
        const newList = {...props.list};
        const cards = newList.cards;
        const checkList = {
            id:utilService.makeId(),
            title,
            tasks:[]
        }
        cards[cardToSave.id].checkLists.push(checkList);
        dispatch(saveList(newList))
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
        cardCheckLists[checkListToUpdateIdx].tasks.push(taskToAdd)
        dispatch(saveList(newList))

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

        console.log('e.target.value', e.target.value);
        console.log('lists', lists);
        console.log('newListId', newListId);
        // const newListIdx = lists.findIndex(list => {
        //     return list._id === newListId
        // })
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
                <div className="card-list">In list
                    <select className="card-list-select" name="card-list" onChange={changeCardList} value={cardToSave.currList}>
                        {Object.keys(lists).map((listIdx) =>
                            <option key={listIdx} value={lists[listIdx]._id}>{lists[listIdx].title}</option>
                        )}
                    </select>
                </div>
                <section className="main-container">
                    <main className="container">
                        <div className="description-container item-container">
                            <label htmlFor="description"> <span><i className="fas fa-align-right"></i> </span> Description</label>
                            <main>
                                <textarea name="description"  id="description" cols="30" rows="10" placeholder="Description..." value={cardToSave.description} onChange={((e) => changeCardDetails(e))}></textarea>
                                <button className="save-button save-button-trello" onClick={((e) => updateCard(e,cardToSave))} >SAVE</button>
                            </main>
                        </div>
                        {cardToSave.checkLists.map((checkList,idx) =>
                            <div key={idx} className="checkLists-container item-container">
                                <header>
                                    <label htmlFor="checkList"> <span> <i className="far fa-calendar-check"></i></span> {checkList.title}</label>
                                    <button className="delete-checkList">DELETE</button>
                                </header>
                                <div className="check-list-result">
                                    <div className="percentage"> 100 %</div>
                                    <div className="graph"></div>
                                </div>
                                <div className="tasks-list">
                                    {checkList.tasks.map((task) =>
                                        <div className="task" key={task.id}>
                                            <div className="task-info">
                                                <input type="checkBox" onChange={((e) => updateTaskDone(e,checkList.id,task.id))}/>
                                                <div className="task-title">{task.title}</div>
                                            </div>
                                            <div className="helpers">
                                                <button><i className="far fa-clock"></i></button>
                                                <button><i className="far fa-user"></i></button>
                                                <button><i className="fas fa-ellipsis-h"></i></button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="add-task">
                                    <input type="text" placeholder="Add new task..." onChange={updateNewTaskTitle}/>
                                    <button className="add-task-button" onClick={((e) => addTaskToCheckList(e,checkList.id))}>Add task</button>
                                </div>
                            </div>
                        )}
                    </main>
                    <div className="side-bar">
                        <header className="side-bar-title">ADD TO CARD</header>
                        <div className="labels item" onClick={((e) => openSideBarModal(e,'labels'))}><i className="fas fa-tag"></i> labels </div>
                        {whichSideBarModalOpen === 'labels' && <LabelsModal sideBarModalRef={sideBarModalRef}  updateLabelsCard={updateLabelsCard} />}
                        <div className="watch item" onClick={watchCard}><i className="far fa-eye"></i> Watch </div>
                        <div className="todo-list item" onClick={((e) => openSideBarModal(e,'checkList'))}><i className="far fa-calendar-check"></i> Checklist </div>
                        {whichSideBarModalOpen === 'checkList' && <CheckListModal sideBarModalRef={sideBarModalRef} addCheckList={addCheckList} />}
                        <div className="delete item" onClick={removeCard}><i className="far fa-trash-alt"></i> Delete Card </div>
                    </div>
                </section>
            </div>
        </section>
    )
}
