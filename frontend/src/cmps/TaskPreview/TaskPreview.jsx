

import './TaskPreview.scss'

export const TaskPreview = (props) => {

    return (
        <div className="task" key={props.task.id}>
            {console.log('props.task',props.task )}
            <div className="task-info">
                {console.log('props.task.isDone', props.task.isDone)}
                { props.task.isDone ? <input type="checkBox" checked onChange={((e) => props.updateTaskDone(e,props.checkList.id,props.task.id))}/> :
                <input type="checkBox" onChange={((e) => props.updateTaskDone(e,props.checkList.id,props.task.id))}/>}
                <div className="task-title">{props.task.title}</div>
            </div>
            <div className="helpers">
                <button><i className="far fa-clock"></i></button>
                <button><i className="far fa-user"></i></button>
                <button><i className="fas fa-ellipsis-h"></i></button>
            </div>
        </div>
    )
}
