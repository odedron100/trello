

import './BackgroundModal.scss'

export const BackgroundModal = (props) => {

    const isVisible = props.modalOpen === 'background' ? 'visible-background background-modal' : 'background-modal'
    return (
        <section className={isVisible}>
             <header>
                    <button className="close-menu" onClick={props.closeItemModal}><i className="fas fa-times"></i></button>
                    <h1 className="title">Background</h1>
                </header>
                <div className="backgrounds">
                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="" onClick={props.changeBackground}/>
                    <img src="https://images.unsplash.com/photo-1520987623799-101883d6585a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmFja2dyb3VuZHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="" onClick={props.changeBackground}/>
                    <img src="https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhY2tncm91bmRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="" onClick={props.changeBackground}/>
                    <img src="https://images.unsplash.com/photo-1504941214544-9c1c44559ab4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGJhY2tncm91bmRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="" onClick={props.changeBackground}/>
                </div>
        </section>
    )
}
