import wrapper from "../../HOC/wrapper";
import { animation, defaults } from "../../lib/defaultConfigs";
import type { IAnimationProps } from "../../types";


const rule = `
  0% {
    transform: translateX(0);
  }

  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    transform: translateX(0);
}
`;

let name: string | undefined;
function make() {
  return name || (name = animation(rule));
}


export default function HeadShake({ children,
  // eslint-disable-next-line unused-imports/no-unused-vars
  out,
  timeout,
  duration = defaults.duration,
  delay = defaults.delay,
  count = defaults.count,
  forever, ...props
}: IAnimationProps = defaults) {
  const effect = { make, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', } };
  //@ts-expect-error(some props are not allowed, this will be fixed later)
  return wrapper(props, effect, false, children, true);
}
