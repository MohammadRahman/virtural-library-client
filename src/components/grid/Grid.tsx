import React, { ReactNode } from 'react'
import cn from 'classnames'
import styles from './Grid.module.scss'

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type Spacing = 'sm' | 'md' | 'lg'
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between'
type AlignItems = 'flex-start' | 'center' | 'flex-end'
type FlexDirection = 'column' | 'row'

interface Props {
    children: ReactNode
    container?: boolean
    item?: boolean
    xs?: Cols
    sm?: Cols
    md?: Cols
    lg?: Cols
    spacing?: Spacing
    justifyContent?: JustifyContent
    alignItems?: AlignItems
    flexDirection?: FlexDirection
}
function Grid({
    children,
    container,
    item,
    xs,
    sm,
    md,
    lg,
    spacing,
    justifyContent,
    alignItems,
    flexDirection,
    ...props
}: Props) {
    const classNames = cn({
        [styles.Grid_container]: container,
        [styles.Grid_item]: item,
        [styles[`Grid_xs_${xs}`]]: xs,
        [styles[`Grid_sm_${sm}`]]: sm,
        [styles[`Grid_md_${md}`]]: md,
        [styles[`Grid_lg_${lg}`]]: lg,
        [styles[`Grid_spacing_${spacing}`]]: spacing,
        [styles[`Grid_justifyContent_${justifyContent}`]]: justifyContent,
        [styles[`Grid_alignItems_${alignItems}`]]: alignItems,
    })

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <div className={classNames} {...props}>
            {children}
        </div>
    )
}

export default Grid
