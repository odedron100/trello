import { useState } from 'react'
import { BackgroundModal } from '../BackgroundModal/BackgroundModal';
import './BoardMenu.scss'

export const BoardMenu = (props) => {
    const [isBoardMenuOpen,setIsBoardMenuOpen] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);

    const setBoardMenu = () => {
        setIsBoardMenuOpen(true);
    }

    const closeMenu = () => {
        setIsBoardMenuOpen(false);
    }

    const openModal = (e,modal) => {
        setModalOpen(modal);
    }

    const closeItemModal = () => {
        setModalOpen(false);
    }
    const isVisible = isBoardMenuOpen ? 'visible board-menu-modal' : 'board-menu-modal'
    return (
        <section className="board-menu-container">
            <button className="board-menu-button header-button" onClick={setBoardMenu}>Show board menu</button>
            <div className={isVisible}>
                <header>
                    <button className="close-menu" onClick={closeMenu}><i className="fas fa-times"></i></button>
                    <h1 className="title">Menu</h1>
                </header>
                <main>
                    <div className="change-background item" onClick={((e) => openModal(e,'background'))}>Change background</div>
                    <BackgroundModal modalOpen={modalOpen} closeItemModal={closeItemModal}/>
                </main>
            </div>
        </section>
    )
}
