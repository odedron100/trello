import { BoardMenu } from '../BoardMenu/BoardMenu'
import './AppHeader.scss'

export const AppHeader = (props) => {

    return (
        <section className="app-header container">
            <header>
                <div className="filter">
                    <div className="home header-button"><i className="fas fa-home"></i></div>
                    <div className="boards header-button"><i className="fab fa-trello"></i> Boards</div>
                    <div className="input-container header-button">
                        <input className="search" placeholder="Jump to..."></input>
                    </div>
                    <span className="header-button"><i className="fas fa-search"></i></span>
                </div>
                <div className="logo header-button"><i className="fab fa-trello"></i> Trello</div>
                <div className="helpers">
                    <div className="add header-button"><i className="fas fa-plus"></i></div>
                    <div className="explanation header-button"><i className="fas fa-exclamation-circle"></i></div>
                    <div className="bell header-button"><i className="far fa-bell"></i></div>
                    <div className="acount header-button"><i className="fas fa-user-alt"></i></div>
                </div>
            </header>
            <footer>
                <BoardMenu/>
            </footer>
        </section>
    )
}
