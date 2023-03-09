import React, { ReactNode } from 'react'
import styles from './Modal.module.scss'

interface Props {
    onClose: () => void
    children: ReactNode
}
function Modal({ onClose, children }: Props) {
    return (
        <div className={styles.Modal}>
            <div className={styles.Modal_overlay} onClick={onClose} />
            <div className={styles.Modal_content}>{children}</div>
        </div>
    )
}

export default Modal