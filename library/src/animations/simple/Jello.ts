import wrapper from "../../HOC/wrapper";
import { animation, defaults } from "../../lib/defaultConfigs";
import type { IAnimationProps } from "../../types";


const rule = `
  from, 11.1%, to {
    transform: none;
  }

  22.2% {
    transform: skewX(-12.5deg) skewY(-12.5deg);
  }

  33.3% {
    transform: skewX(6.25deg) skewY(6.25deg);
  }

  44.4% {
    transform: skewX(-3.125deg) skewY(-3.125deg);
  }

  55.5% {
    transform: skewX(1.5625deg) skewY(1.5625deg);
  }

  66.6% {
    transform: skewX(-0.78125deg) skewY(-0.78125deg);
  }

  77.7% {
    transform: skewX(0.390625deg) skewY(0.390625deg);
  }

  88.8% {
    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
}
`;

let name: string | undefined;
function make() {
  return name || (name = animation(rule));
}


export default function Jello({
  children,
  // eslint-disable-next-line unused-imports/no-unused-vars
  out,
  timeout,
  duration = defaults.duration,
  delay = defaults.delay,
  count = defaults.count,
  forever, ...props
}: IAnimationProps = defaults) {
  const effect = { make, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', } };
  // @ts-expect-error(some props are not allowed, this will be fixed later)
  return wrapper(props, effect, false, children, true);
}
