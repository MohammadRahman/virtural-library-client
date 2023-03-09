import React from 'react'
import styles from './CustomButton.module.scss'
import cn from 'classnames' 

type ButtonType = 'submit'|'button'
interface ButtonProps{
    name?: string,
    onClick?: any,
    type?: ButtonType,
    href?: string,
    className?:string
}
const CustomButton = ({name, onClick, type='button', href, className, ...rest}:ButtonProps) => {

     const classNames = cn(styles.Button, {
        [styles[`Button_${className}`]]: className,
    })
    const anchorClass = cn(styles.Button, {
        [styles[`Button_${className}`]]: href
    })

    if (href) {
        <a className={anchorClass} href={href}>{name}</a>
    }
  return (
      <button className={classNames} {...rest} onClick={onClick}>{name}</button>
  )
}

export default CustomButton