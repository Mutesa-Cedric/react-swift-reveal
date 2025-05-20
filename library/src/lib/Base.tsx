/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-mixed-operators */
"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { cascade, collapseend, disableSsr, fadeOutEnabled, globalHide, hideAll, namespace, observerMode, ssr } from './defaultConfigs'

declare global {
    interface EventListenerOptions {
        passive?: boolean
    }
}

const TransitionGroupContext = React.createContext<{ isMounting: boolean } | null>(null)

interface InOutEffect {
    make?: (isExiting: boolean, props: RevealProps) => string | undefined
    duration: number
    delay: number
    forever?: boolean
    count: number
    style: React.CSSProperties
    reverse?: boolean
    className?: string
}

interface RevealProps {
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

type Visibility = 'visible' | 'hidden' | 'collapse' | 'inherit' | 'initial' | 'unset'

interface RevealState {
    collapse?: {
        height?: number | string
        visibility?: Visibility
        transition?: string
        overflow?: string
    }
    style: React.CSSProperties
    hasAppeared?: boolean
    hasExited?: boolean
    className?: string
}

const defaultProps = {
    fraction: 0.2,
    refProp: 'ref',
}

const RevealBase: React.FC<RevealProps> = (props) => {
    const {
        when,
        refProp = defaultProps.refProp,
        fraction = defaultProps.fraction,
        children,
        inEffect,
        outEffect,
        ssrReveal,
        collapse,
        collapseEl,
        cascade: cascadeProp,
        disabled,
        onReveal,
        unmountOnExit,
        mountOnEnter,
        ...rest
    } = { ...defaultProps, ...props }

    const isOn = when !== undefined ? !!when : true;
    const parentGroup = React.useContext(TransitionGroupContext)


    const getInitialCollapseStyle = (props: RevealProps) => ({
        height: 0,
        visibility: props.when ? undefined : ('hidden' as Visibility),
    })
    const [state, setState] = useState<RevealState>({
        collapse: collapse ? getInitialCollapseStyle(props) : undefined,
        style: {
            opacity: (!isOn || ssrReveal) && outEffect ? 0 : undefined,
        },
    })

    const el = useRef<HTMLElement | null>(null)
    const isShownRef = useRef(false)
    const savedChildRef = useRef<React.ReactElement | false>(false)
    const childRef = useRef<((node: any) => void) | null>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const animationEndTimeoutRef = useRef<number | undefined>(undefined)
    const onRevealTimeoutRef = useRef<number | undefined>(undefined)
    const isListenerRef = useRef(false)


    const getDimensionValue = () => {
        if (!el.current)
            return 0
        return (
            el.current.offsetHeight
            + Number.parseInt(window.getComputedStyle(el.current).getPropertyValue('margin-top'), 10)
            + Number.parseInt(window.getComputedStyle(el.current).getPropertyValue('margin-bottom'), 10)
        )
    }

    const inViewport = useCallback(() => {
        if (!el.current || window.document.hidden)
            return false
        const h = el.current.offsetHeight
        const delta = window.pageYOffset - getTop(el.current)
        const tail = Math.min(h, window.innerHeight) * (globalHide ? fraction : 0)
        return delta > tail - window.innerHeight && delta < h - tail
    }, [fraction])

    const getTop = (el: HTMLElement): number => {
        while (el.offsetTop === undefined)
            el = el.parentNode as HTMLElement

        let top = el.offsetTop
        for (; el.offsetParent; top += el.offsetTop)
            el = el.offsetParent as HTMLElement

        return top
    }

    const resize = useCallback(() => {
        if (!el.current || !isOn)
            return
        if (inViewport()) {
            unlisten()
            isShownRef.current = isOn
            setState({
                hasExited: !isOn,
                hasAppeared: true,
                collapse: undefined,
                style: { opacity: isOn || !outEffect ? 1 : 0 },
            })
            onReveal && onReveal()
        }
    }, [isOn, outEffect, onReveal])

    const handleObserve = useCallback(([entry]: IntersectionObserverEntry[]) => {
        if (entry.intersectionRatio > 0) {
            observerRef.current?.disconnect()
            observerRef.current = null
            reveal(true)
        }
    }, [])

    const observe = useCallback((props: RevealProps, update = false) => {
        if (!el.current)
            return
        if (observerMode) {
            if (observerRef.current) {
                if (update)
                    observerRef.current.disconnect()
                else return
            }
            else if (update) {
                return
            }

            observerRef.current = new IntersectionObserver(handleObserve, { threshold: props.fraction })
            observerRef.current.observe(el.current)
        }
    }, [handleObserve])

    const reveal = useCallback((_event?: Event | boolean) => {
        const inView = typeof _event === 'boolean' ? _event : false
        if (!globalHide)
            hideAll()
        if (!el.current)
            return

        if (ssr)
            disableSsr()

        if (isOn && isShownRef.current && props.spy !== undefined) {
            isShownRef.current = false
            setState({ style: {} })
            setTimeout(() => reveal(false), 200)
        }
        else if (inView || inViewport() || props.force) {
            animate()
        }
        else {
            observerMode ? observe(props) : listen()
        }
    }, [isOn, props, inViewport, observe])

    const listen = useCallback(() => {
        if (!observerMode && !isListenerRef.current) {
            isListenerRef.current = true
            window.addEventListener('scroll', () => reveal(false), { passive: true })
            window.addEventListener('orientationchange', () => reveal(false), { passive: true })
            window.document.addEventListener('visibilitychange', () => reveal(false), { passive: true })
            window.document.addEventListener('collapseend', (_event: Event) => reveal(false), { passive: true })
            window.addEventListener('resize', resize, { passive: true })
        }
    }, [reveal, resize])

    const unlisten = () => {
        if (!observerMode && isListenerRef.current) {
            window.removeEventListener('scroll', reveal, { passive: true })
            window.removeEventListener('orientationchange', reveal, { passive: true })
            window.document.removeEventListener('visibilitychange', reveal, { passive: true })
            window.document.removeEventListener('collapseend', reveal, { capture: false })
            window.removeEventListener('resize', resize, { passive: true })
            isListenerRef.current = false
        }
        if (onRevealTimeoutRef.current)
            window.clearTimeout(onRevealTimeoutRef.current)

        if (animationEndTimeoutRef.current)
            window.clearTimeout(animationEndTimeoutRef.current)
    }

    const animate = useCallback(() => {
        if (!el.current)
            return
        unlisten()
        if (isShownRef.current === isOn)
            return
        isShownRef.current = isOn

        const leaving = !isOn && outEffect
        const effect = props[leaving ? 'outEffect' : 'inEffect'] as InOutEffect
        let animationName = ('style' in effect && effect.style.animationName) || undefined

        let newState: Partial<RevealState>
        if (!props.collapseOnly) {
            if ((outEffect || isOn) && effect.make)
                animationName = effect.make(!isOn, props)

            newState = {
                hasAppeared: true,
                hasExited: false,
                collapse: undefined,
                style: {
                    ...effect.style,
                    animationDuration: `${effect.duration}ms`,
                    animationDelay: `${effect.delay}ms`,
                    animationIterationCount: effect.forever ? 'infinite' : effect.count,
                    opacity: 1,
                    animationName,
                },
                className: effect.className,
            }
        }
        else {
            newState = { hasAppeared: true, hasExited: false, style: { opacity: 1 } }
        }

        setState(prevState =>
            props.collapse
                ? getCollapsedState({ ...prevState, ...newState }, props, effect as InOutEffect)
                : { ...prevState, ...newState },
        )

        if (leaving) {
            savedChildRef.current = React.cloneElement(getChild())
            animationEnd(invisible, props.cascade, effect)
        }
        else {
            savedChildRef.current = false
        }

        onReveal && isOn && (
            props.wait
                ? (onRevealTimeoutRef.current = window.setTimeout(onReveal, props.wait))
                : onReveal()
        )
    }, [isOn, props, outEffect])

    const invisible = () => {
        if (!el.current)
            return
        savedChildRef.current = false
        if (!isShownRef.current) {
            setState({
                hasExited: true,
                collapse: collapse ? { ...state.collapse, visibility: 'hidden' } : undefined,
                style: { opacity: 0 },
            })
            if (!observerMode && collapse)
                window.document.dispatchEvent(new Event(String(collapseend)))
        }
    }

    const animationEnd = (callback: () => void, cascade: boolean | undefined, effect: InOutEffect) => {
        if (effect.forever)
            return
        const handler = () => {
            if (!el.current)
                return
            animationEndTimeoutRef.current = undefined
            callback()
        }
        animationEndTimeoutRef.current = window.setTimeout(
            handler,
            effect.delay + (effect.duration + (cascade ? effect.duration : 0)) * effect.count,
        )
    }

    const getCollapsedState = (state: RevealState, props: RevealProps, inOut: InOutEffect) => {
        const total = inOut.duration + (props.cascade ? inOut.duration : 0)
        const height = isOn ? getDimensionValue() : 0
        let duration, delay

        if (props.collapseOnly) {
            duration = inOut.duration / 3
            delay = inOut.delay
        }
        else {
            const delta1 = total >> 2
            const delta2 = delta1 >> 1
            duration = delta1
            delay = inOut.delay + (isOn ? 0 : total - delta1 - delta2)
            state.style.animationDuration = `${total - delta1 + (isOn ? delta2 : -delta2)}ms`
            state.style.animationDelay = `${inOut.delay + (isOn ? delta1 - delta2 : 0)}ms`
        }

        state.collapse = {
            height,
            transition: `height ${duration}ms ease ${delay}ms`,
            overflow: props.collapseOnly ? 'hidden' : undefined,
        }

        return state
    }

    const getChild = () => {
        if (savedChildRef.current && !disabled)
            return savedChildRef.current
        if (typeof children === 'object') {
            const child = React.Children.only(children as React.ReactElement)
            return ('type' in child && typeof child.type === 'string') || refProp !== 'ref'
                ? child
                : <div>{child}</div>
        }
        return <div>{children}</div>
    }

    const cascadeChildren = (children: React.ReactNode) => {
        let newChildren
        if (typeof children === 'string') {
            newChildren = children.split('').map((ch, index) => (
                <span key={index} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                    {ch}
                </span>
            ))
        }
        else {
            newChildren = React.Children.toArray(children)
        }

        const { duration, reverse } = props[isOn || !outEffect ? 'inEffect' : 'outEffect'] as InOutEffect
        const count = newChildren.length
        const total = duration * 2

        let i = reverse ? count : 0
        return newChildren.map(child =>
            typeof child === 'object' && child
                ? React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
                    style: {
                        ...(child as React.ReactElement<{ style?: React.CSSProperties }>).props.style,
                        ...state.style,
                        animationDuration: `${Math.round(cascade(reverse ? i-- : i++, 0, count, duration, total))}ms`,
                    },
                })
                : child,
        )
    }

    const saveRef = useCallback((node: HTMLElement | null) => {
        if (childRef.current)
            childRef.current(node)
        if (props.innerRef)
            props.innerRef(node)
        if (el.current !== node) {
            el.current = node && 'offsetHeight' in node ? node : null
            observe(props, true)
        }
    }, [props, observe])

    useEffect(() => {
        if (!el.current || disabled)
            return

        if (!props.collapseOnly) {
            if ('make' in inEffect)
                inEffect.make?.(false, props)
            if (when !== undefined && outEffect && 'make' in outEffect)
                outEffect.make?.(true, props)
        }

        const appear = parentGroup && !parentGroup.isMounting
            ? !('enter' in props && props.enter === false)
            : props.appear

        if (isOn && ((when !== undefined || props.spy !== undefined) && !appear)
            || (ssr && !fadeOutEnabled && !props.ssrFadeout && outEffect && !ssrReveal
                && getTop(el.current) < window.pageYOffset + window.innerHeight)
        ) {
            isShownRef.current = true
            setState({
                hasAppeared: true,
                collapse: collapse ? { height: getDimensionValue() } : state.collapse,
                style: { opacity: 1 },
            })
            onReveal && onReveal()
        }
        else if (ssr && (fadeOutEnabled || props.ssrFadeout) && outEffect
            && getTop(el.current) < window.pageYOffset + window.innerHeight) {
            setState({ style: { opacity: 0, transition: 'opacity 1000ms 1000ms' } })
            setTimeout(() => reveal(true), 2000)
        }
        else if (isOn) {
            props.force ? animate() : reveal()
        }

        return () => {
            unlisten()
            ssr && disableSsr()
        }
    }, [])

    useEffect(() => {
        if (when !== undefined)
            isShownRef.current = !!when

        if (fraction !== props.fraction)
            observe(props, true)

        if (!isOn && props.onExited && 'exit' in props && props.exit === false) {
            props.onExited()
            return
        }
        if (disabled)
            return
        if (props.collapse && !collapse) {
            setState({
                style: {},
                collapse: getInitialCollapseStyle(props),
            })
            isShownRef.current = false
        }
        if (when !== props.when || props.spy !== undefined)
            reveal()

        if (onRevealTimeoutRef.current && !isOn) {
            window.clearTimeout(onRevealTimeoutRef.current)
            onRevealTimeoutRef.current = undefined
        }
    }, [when, fraction, props, isOn, disabled, collapse, reveal])

    let mount = true
    if (!state.hasAppeared)
        mount = !mountOnEnter || isOn
    else
        mount = !unmountOnExit || !state.hasExited || isOn

    const child = getChild()
    if (React.isValidElement(child) && typeof (child as any).ref === 'function')
        childRef.current = (child as any).ref

    const newChildren = cascadeProp && !disabled && child.props.children && state.style.animationName
        ? cascadeChildren(child.props.children)
        : child.props.children

    const newStyle = disabled
        ? child.props.style
        : { ...child.props.style, ...state.style }

    const newClass = disabled
        ? child.props.className
        : `${outEffect ? namespace : ''}${state.className ? ` ${state.className}` : ''}${child.props.className ? ` ${child.props.className}` : ''}`

    const newProps = {
        ...rest.props,
        className: newClass || undefined,
        style: newStyle,
        [refProp]: saveRef,
    } as React.HTMLAttributes<HTMLElement> & { style?: React.CSSProperties }

    const element = React.cloneElement(child, newProps, mount ? newChildren : undefined)

    return collapse !== undefined
        ? collapseEl
            ? React.cloneElement(collapseEl, {
                style: { ...collapseEl.props.style, ...(disabled ? undefined : state.collapse) },
                children: element,
            })
            : <div style={disabled ? undefined : state.collapse} children={element} />
        : element
}

export default RevealBase
