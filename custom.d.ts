declare global {
    interface Window {
        IntersectionObserver: typeof IntersectionObserver
        IntersectionObserverEntry: typeof IntersectionObserverEntry
        reactRevealNamespace: string
    }
}
