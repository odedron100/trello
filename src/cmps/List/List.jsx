import './List.scss'
import { useEffect } from 'react';
import {FormButton} from '../FormButton'
import { useDispatch } from 'react-redux';
import {saveList ,loadLists} from '../../store/actions/ListActions'

export const List = ({list}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadLists())
    }, []);

    const handleNewCardSubmit = (newCard) => {
        let listToSave = {...list,cards:[...list.cards,newCard.title]}
        dispatch(saveList(listToSave))
    }

    return (
        <section className="list">
            <header>
                <div className="title">{list.title}</div>
                <div className="helpers"><i className="fas fa-ellipsis-h"></i></div>
            </header>
            <section className="cards">
                {list.cards.map((card) =>
                    <div className="card">{card}</div>
                )}
            </section>
            <FormButton itemType="card" onSubmit={handleNewCardSubmit} />
        </section>
    )
}
