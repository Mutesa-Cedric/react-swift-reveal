// aliases and interfaces for the default values (functions and data structures) of this library
interface EffectMap {
    [effect: string]: number
}

type InsertRuleFunction = (rule: string) => number | undefined

type CascadeFunction = (i: number, start: number, end: number, duration: number, total: number) => number

interface AnimationFunction {
    (effect: string): string
}

type WindowRequestAnimationFrame = (cb: () => void) => NodeJS.Timeout | number

type SsrFadeoutFunction = (enable: boolean) => void

type HideAllFunction = () => void

// namespace for preventing name collisions with other libraries
export const namespace = 'react-swiftreveal'

// default values

export const defaults = { duration: 1000, delay: 0, count: 1 }
let ssr = true
let observerMode = false

let raf: WindowRequestAnimationFrame = cb => setTimeout(cb, 66)
const disableSsr: () => void = () => {
  ssr = false
}
let fadeOutEnabled = false
const ssrFadeout: SsrFadeoutFunction = (enable) => {
  fadeOutEnabled = enable
}
let globalHide = false
let ie10 = false
let collapseend: Event | undefined

// values for animation manangement
let counter = 1
const effectMap: EffectMap = {}
let sheet: CSSStyleSheet | null = null
// generate unique animation names
const name = `${namespace}-${Math.floor(Math.random() * 1000000000000000)}-`

// inserting new rules into the stylesheet
const insertRule: InsertRuleFunction = (rule) => {
  try {
    return sheet?.insertRule(rule, sheet.cssRules.length)
  }
  catch (e) {
    console.warn('react-swiftreveal - animation failed')
  }
}

// calculate animation timings based on logarithmic scale.
const cascade: CascadeFunction = (i, start, end, duration, total) => {
  const minv = Math.log(duration)
  const maxv = Math.log(total)
  const scale = (maxv - minv) / (end - start)
  return Math.exp(minv + scale * (i - start))
}

// generate unique names for animation effects.
const animation: AnimationFunction = (effect) => {
  if (!sheet)
    return ''
  const rule = `@keyframes ${name + counter}{${effect}}`
  const effectId = effectMap[effect]
  if (!effectId) {
    insertRule(rule)
    effectMap[effect] = counter
    return `${name}${counter++}`
  }
  return `${name}${effectId}`
}

//   hide all elements within a given namespace
const hideAll: HideAllFunction = () => {
  if (globalHide)
    return
  globalHide = true
  window.removeEventListener('scroll', hideAll, true)
  insertRule(`.${namespace} { opacity: 0; }`)
  window.removeEventListener('orientationchange', hideAll, true)
  window.document.removeEventListener('visibilitychange', hideAll)
}

// check if the code is being executed in the browser environment
if (typeof window !== 'undefined' && window.name !== 'nodejs' && window.document && typeof navigator !== 'undefined') {
  observerMode = 'IntersectionObserver' in window
        && 'IntersectionObserverEntry' in window
        && 'intersectionRatio' in window.IntersectionObserverEntry.prototype
        && (/\{\s*\[native code\]\s*\}/).test(`${IntersectionObserver}`)
  raf = window.requestAnimationFrame || raf
  ssr = window.document.querySelectorAll('div[data-reactroot]').length > 0
  if (navigator.appVersion.includes('MSIE 10'))
    ie10 = true
  if (ssr && 'performance' in window
        && 'timing' in window.performance
        && 'domContentLoadedEventEnd' in window.performance.timing
        && window.performance.timing.domLoading
        && Date.now() - window.performance.timing.domLoading < 300)
    ssr = false
  if (ssr)
    window.setTimeout(disableSsr, 1500)
  if (!observerMode) {
    collapseend = document.createEvent('Event')
    collapseend.initEvent('collapseend', true, true)
  }
  const element = document.createElement('style')
  document.head.appendChild(element)

  if (element.sheet && element.sheet.cssRules) {
    sheet = element.sheet
    window.addEventListener('scroll', hideAll, true)
    window.addEventListener('orientationchange', hideAll, true)
    window.document.addEventListener('visibilitychange', hideAll)
  }
}

// configure the behaviour of the library
export default function config({ ssrFadeout }: { ssrFadeout: boolean }): void {
  fadeOutEnabled = ssrFadeout
}
