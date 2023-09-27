import wrapper from "../../HOC/wrapper";
import { animation, defaults } from "../../lib/defaultConfigs";

const rule = `
from, 50%, to {
    opacity: 1;
  }

  25%, 75% {
    opacity: 0;
}
`;

let name: string | undefined;

function make() {
    return name || (name = animation(rule));
}

export default function Flash(
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

