/* eslint-disable no-prototype-builtins */
import wrapper from '@/HOC/wrapper'
import { animation, defaults } from '@/lib/defaultConfigs'

const lookup = {}

function make(reverse, { left, right, mirror, opposite }) {
    const checksum = (left ? 1 : 0) | (right ? 2 : 0) | (mirror ? 16 : 0) | (opposite ? 32 : 0) | (reverse ? 64 : 0)
    if (lookup.hasOwnProperty(checksum))
        return lookup[checksum]
    if (!mirror !== !(reverse && opposite)) // Boolean XOR
        [left, right] = [right, left]
    const dist = '100%'
    const x = left ? `-${dist}` : (right ? dist : '0')
    const rule = !reverse
        ? `from {
        transform: translate3d(${x}, 0, 0) skewX(-30deg);
        opacity: 0;
      }
      60% {
        transform: skewX(20deg);
        opacity: 1;
      }
      80% {
        transform: skewX(-5deg);
        opacity: 1;
      }
      to {
        transform: none;
        opacity: 1;
      }`
        : `from {
        opacity: 1;
      }
      to {
        transform: translate3d(${x}, 0, 0) skewX(30deg);
        opacity: 0;
      }
    `
    lookup[checksum] = animation(rule)
    return lookup[checksum]
}

function LightSpeed({
    children, _out, forever,
    timeout, duration = defaults.duration, delay = defaults.delay, count = defaults.count, ...props
} = defaults) {
    const effect = {
        make,
        duration: timeout === undefined ? duration : timeout,
        delay,
        forever,
        count,
        style: { animationFillMode: 'both' },
    }
    const _checksum = 0 + (props.left ? 1 : 0) + (props.right ? 10 : 0) + (props.mirror ? 10000 : 0) + (props.opposite ? 100000 : 0);
    // @ts-expect-error(some props are not allowed, this will be fixed later)
    return wrapper(props, effect, effect, children)
}

export default LightSpeed
