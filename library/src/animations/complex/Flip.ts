/* eslint-disable no-prototype-builtins */
import wrapper from "../../HOC/wrapper";
import { animation, defaults } from "../../lib/defaultConfigs";
import type { IAnimationProps } from "../../types";

interface Props extends IAnimationProps {
  x?: boolean;
  y?: boolean;
}


const lookup = {}
function make(reverse, { left, right, top, bottom, x, y, mirror, opposite }) {
  const checksum = (left ? 1 : 0) | (right || y ? 2 : 0) | (top || x ? 4 : 0) | (bottom ? 8 : 0) | (mirror ? 16 : 0) | (opposite ? 32 : 0) | (reverse ? 64 : 0)
  if (lookup.hasOwnProperty(checksum))
    return lookup[checksum]
  if (!mirror !== !(reverse && opposite)) // Boolean XOR
    [left, right, top, bottom, x, y] = [right, left, bottom, top, y, x]
  let rule
  if (x || y || left || right || top || bottom) {
    const
      xval = x || top || bottom ? `${bottom ? '-' : ''}1` : '0'
    const yval = y || right || left ? `${left ? '-' : ''}1` : '0'
    if (!reverse) {
      rule = `from {
          transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, 90deg);
          animation-timing-function: ease-in;
          opacity: 0;
        }
        40% {
          transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, -20deg);
          animation-timing-function: ease-in;
        }
        60% {
          transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, 10deg);
          opacity: 1;
        }
        80% {
          transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, -5deg);
        }
        to {
          transform: perspective(400px);
        }`
    }
    else {
      rule = `from {
          transform: perspective(400px);
        }
        30% {
          transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, -15deg);
          opacity: 1;
        }
        to {
          transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, 90deg);
          opacity: 0;
        }`
    }
  }
  else {
    rule = `from {
          transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
          animation-timing-function: ease-out;
          opacity: ${!reverse ? '0' : '1'};
        }
        40% {
          transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
          animation-timing-function: ease-out;
        }
        50% {
          transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
          animation-timing-function: ease-in;
        }
        to {
          transform: perspective(400px);
          animation-timing-function: ease-in;
          opacity: ${reverse ? '0' : '1'};
        }`
  }
  lookup[checksum] = animation(rule)
  return lookup[checksum]
}

function Flip({
  children,
  // eslint-disable-next-line unused-imports/no-unused-vars
  out,
  forever,
  timeout,
  duration = defaults.duration,
  delay = defaults.delay,
  count = defaults.count, ...props
}: Props = defaults) {
  const effect = {
    make,
    duration: timeout === undefined ? duration : timeout,
    delay,
    forever,
    count,
    style: { animationFillMode: 'both', backfaceVisibility: 'visible' },
  }

  //   @ts-expect-error(some props are not allowed, this will be fixed later)
  return wrapper(props, effect, effect, children)
}

export default Flip
