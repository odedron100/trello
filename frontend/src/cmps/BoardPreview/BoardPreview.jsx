import { Link } from 'react-router-dom'
import './BoardPreview.scss'

export const BoardPreview = (props) => {
    console.log('here')
    return (
        <Link to={'/board/' + props.board._id}>
            <section className="board-preview">
                <div>{props.board._id}</div>
            </section>
        </Link>
    )
}
