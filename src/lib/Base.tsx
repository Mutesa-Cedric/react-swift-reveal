interface InOutEffect {
    make: (leaving: boolean, props: any) => string
    duration: number
    delay: number
    forever: boolean
    count: number
    style: object
    reverse: boolean
}

interface Props {
    collapse: boolean
    collapseEl: React.ReactElement
    cascade: boolean
    wait: number
    force: boolean
    disabled: boolean
    appear: boolean
    enter: boolean
    exit: boolean
    fraction: number
    refProp: string
    innerRef: (node: HTMLElement | null) => void
    onReveal: () => void
    unmountOnExit: boolean
    mountOnEnter: boolean
    inEffect: InOutEffect
    outEffect: InOutEffect | false
    ssrReveal: boolean
    collapseOnly: boolean
    ssrFadeout: boolean
}
