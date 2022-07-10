import { BoardPreview } from '../BoardPreview/BoardPreview'
import './BoardList.scss'

export const BoardList = (props) => {

    console.log('props.boards', props.boards);
    return (
        <section className="board-list">
            {Object.keys(props.boards).map((boardId) => {
                return(
                    <BoardPreview key={boardId} board={props.boards[boardId]}/>
                )
            })}
        </section>
    )
}
