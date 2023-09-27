import wrapper from "../../HOC/wrapper";
import { animation, defaults } from "../../lib/defaultConfigs";
import type { IAnimationProps } from "../../types";

const rule = `
  from, to {
    transform: translate3d(0, 0, 0);
  }

  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-10px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    transform: translate3d(10px, 0, 0);
  }
`;


const name = animation(rule);

export default function Shake({
  children,
  // eslint-disable-next-line unused-imports/no-unused-vars
  out,
  timeout,
  duration = defaults.duration,
  delay = defaults.delay,
  count = defaults.count,
  forever, ...props
}: IAnimationProps = defaults) {
  const effect = { make: () => name, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', } };
  // @ts-expect-error(some props are not allowed, this will be fixed later)
  return wrapper(props, effect, false, children);
};
