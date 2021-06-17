

import { useEffect, useRef, useState } from 'react';
import { TasksList } from '../TasksList/TasksList'
import './CheckLists.scss'

export const CheckLists = (props) => {
    const [isAddTaskModalOpen,setIsAddTaskModalOpen] = useState(false)
    const addTaskModalRef = useRef(null);

    useEffect(() => {
        taskCompletionRate();
        return () => {

        }
    });

    //  const handleDocumentClick = useCallback((e) => {
    //      console.log('e.path[0]', e.path[0] === addTaskModalRef.current);
    //      console.log('e.path[1]', e.path[1] === addTaskModalRef.current);
    //      console.log('e.target', e.target === addTaskModalRef.current);
    //     if ( e.target === addTaskModalRef.current) {
    //         return;
    //     }
    //     else{
    //         setIsAddTaskModalOpen(false)
    //     }
    // }, [addTaskModalRef]);

    // useEffect(() => {
    //     document.addEventListener('click', handleDocumentClick);
    //     return () => {
    //         document.removeEventListener('click', handleDocumentClick);
    //     }
    // });

    const openAddTaskModal = () => {
        setIsAddTaskModalOpen(true);
    }

    const taskCompletionRate = () => {
        const tasks = props.checkList.tasks;
        let sum = 0;
        let numberOfTasks = 0;
        if(Object.keys(tasks).length > 0){
            Object.keys(tasks).forEach(taskId => {
                numberOfTasks++
                if(tasks[taskId].isDone) {
                    sum ++
                }
            });
            const width = Math.floor((sum / numberOfTasks * 100)) + '%';
            return width
        }else{
            return 0 + '%';
        }
    }

    const onRemoveCheckList = () => {
        props.removeCheckList(props.checkList.id)
    }

    return (
            <div className="checkLists-container item-container" >
                <header>
                    <label htmlFor="checkList"> <span> <i className="far fa-calendar-check"></i></span> {props.checkList.title}</label>
                    <button className="delete-checkList" onClick={onRemoveCheckList}>DELETE</button>
                </header>
                <div className="check-list-result">
                    <div className="percentage"> {taskCompletionRate()}</div>
                    <div className="graph">
                        <div className="done-tasks-graph" style={{width:taskCompletionRate()}}></div>
                    </div>
                </div>
                <TasksList checkList={props.checkList} updateTaskDone={props.updateTaskDone} taskCompletionRate={props.taskCompletionRate} />
                <div className="add-task">
                    {!isAddTaskModalOpen ? <button className="add-task-modal-button" onClick={openAddTaskModal}>Add task</button>
                    :
                    <div className="add-task-modal" ref={addTaskModalRef}>
                        <textarea type="text" placeholder="Add new task..." value={props.newTaskTitleToAdd} onChange={props.updateNewTaskTitle}/>
                        <button className="add-task-button submit-button-trello" onClick={((e) => props.addTaskToCheckList(e,props.checkList.id))}>Add task</button>
                    </div>}
                </div>
            </div>
    )
}
