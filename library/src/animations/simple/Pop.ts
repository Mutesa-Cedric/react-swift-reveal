import wrapper from "@/HOC/wrapper";
import { animation, defaults } from "@/lib/defaultConfigs";

const rule = `
  from {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  to {
    transform: scale(1);
  }
`;


let name: string | undefined;

function make() {
    return name || (name = animation(rule));
};

export default function Pop(
    {
        children,
        _out,
        timeout,
        duration = defaults.duration,
        delay = defaults.delay,
        count = defaults.count,
        forever, ...props
    } = defaults
) {
    const effect = { make, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', } };
    // @ts-expect-error(some props are not allowed, this will be fixed later)
    return wrapper(props, effect, false, children, true);
};
