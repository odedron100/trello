

import { TaskPreview } from '../TaskPreview/TaskPreview'
import './TasksList.scss'

export const TasksList = (props) => {

    return (
        <div className="tasks-list">
            {Object.keys(props.checkList.tasks).map((taskId) =>
                <TaskPreview key={taskId} checkList={props.checkList} task={props.checkList.tasks[taskId]} updateTaskDone={props.updateTaskDone} taskCompletionRate={props.taskCompletionRate}/>
            )}
        </div>
    )
}
