import style from "./modale.module.css"


function Modal({ methodeOff }) {
    return (
        <div className={style.modalContainer}>
            <div id="confirmation" className={style.modal}>
                <span>Employee Created!</span>
                <div className={style.closeButtonContainer}>
                    <span className={`material-symbols-outlined ${style.icon}`}>
                        close
                    </span>
                    <input
                        type="button"
                        onClick={methodeOff}
                        className={style.closeButton}
                    />
                </div>
            </div>
        </div>
    )
}

export default Modal