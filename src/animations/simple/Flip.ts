import wrapper from "@/HOC/wrapper";
import { animation, defaults } from "@/lib/defaultConfigs";

const rule = `
  0% {
    transform: perspective(400px) rotateY(0);
    animation-timing-function: ease-out;
  }

  40% {
    transform: perspective(400px) translateZ(150px) rotateY(170deg);
    animation-timing-function: ease-out;
  }

  50% {
    transform: perspective(400px) translateZ(150px) rotateY(190deg);
    animation-timing-function: ease-in;
  }

  80% {
    transform: perspective(400px) rotateY(360deg);
    animation-timing-function: ease-in;
  }

  100% {
    transform: perspective(400px) rotateY(360deg);
  }
`;


const name = animation(rule);

export default function FlipInY({
    children,
    _out,
    timeout,
    duration = defaults.duration,
    delay = defaults.delay,
    count = defaults.count,
    forever, ...props
} = defaults) {
    const effect = { make: () => name, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', } };
    // @ts-expect-error(some props are not allowed, this will be fixed later)
    return wrapper(props, effect, false, children, true);
};
