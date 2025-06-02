declare global {
    interface EventListenerOptions {
        passive?: boolean
    }
}

export interface InOutEffect {
    make?: (isExiting: boolean, props: RevealProps) => string | undefined
    duration: number
    delay: number
    forever?: boolean
    count: number
    style: React.CSSProperties
    reverse?: boolean
    className?: string
}

export interface RevealProps {
    children: React.ReactNode
    collapse?: boolean
    collapseEl?: React.ReactElement<{ style?: React.CSSProperties, children?: React.ReactNode }>
    cascade?: boolean
    wait?: number
    force?: boolean
    disabled?: boolean
    appear?: boolean
    enter?: boolean
    exit?: boolean
    fraction?: number
    refProp?: string
    innerRef?: (node: HTMLElement | null) => void
    onReveal?: () => void
    unmountOnExit?: boolean
    mountOnEnter?: boolean
    inEffect: InOutEffect
    outEffect: InOutEffect | false
    ssrReveal?: boolean
    collapseOnly?: boolean
    ssrFadeout?: boolean
    when?: boolean
    spy?: any
    props?: any
    onExited?: () => void
}

export interface IAnimationProps {
    children?: React.ReactNode;
    out?: boolean;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
    mirror?: boolean;
    opposite?: boolean;
    timeout?: number;
    duration?: number;
    delay?: number;
    count?: number;
    forever?: boolean;
    distance?: string;
    big?: boolean;
    in?: boolean;
    when?: boolean;
}
