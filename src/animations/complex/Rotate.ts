/* eslint-disable no-prototype-builtins */
import wrapper from '@/HOC/wrapper'
import { animation, defaults } from '@/lib/defaultConfigs'

const lookup = {}
function make(reverse, { left, right, up, down, top, bottom, mirror, opposite }) {
  const checksum = (left ? 1 : 0) | (right ? 2 : 0) | (top || down ? 4 : 0) | (bottom || up ? 8 : 0) | (mirror ? 16 : 0) | (opposite ? 32 : 0) | (reverse ? 64 : 0);
  if (lookup.hasOwnProperty(checksum))
    return lookup[checksum]
  if (!mirror !== !(reverse && opposite)) // Boolean XOR
    [left, right, top, bottom, up, down] = [right, left, bottom, top, down, up]
  let angle = '-200deg'
  let origin = 'center'
  if ((down || top) && left)
    angle = '-45deg'
  if (((down || top) && right) || ((up || bottom) && left))
    angle = '45deg'
  if ((up || bottom) && right)
    angle = '-90deg'
  if (left || right)
    origin = `${left ? 'left' : 'right'} bottom`
  lookup[checksum] = animation(`
    ${!reverse ? 'from' : 'to'} { opacity: 0; transform-origin: ${origin}; transform: rotate3d(0, 0, 1, ${angle});}
    ${reverse ? 'from' : 'to'} { opacity: 1; transform-origin: ${origin}; transform: none;}
  `)
  return lookup[checksum]
}

function Rotate({
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
  // @ts-expect-error(some props are not allowed, this will be fixed later)
  return wrapper(props, effect, effect, children)
}

export default Rotate
