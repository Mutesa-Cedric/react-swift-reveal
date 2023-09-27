import wrapper from "../../HOC/wrapper";
import { animation, defaults } from "../../lib/defaultConfigs";

const rule = `
    20% {
        transform: rotate3d(0, 0, 1, 15deg);
    }

    40% {
        transform: rotate3d(0, 0, 1, -10deg);
    }

    60% {
        transform: rotate3d(0, 0, 1, 5deg);
    }

    80% {
        transform: rotate3d(0, 0, 1, -5deg);
    }

    to {
        transform: rotate3d(0, 0, 1, 0deg);
    }
`;

let name: string | undefined;

function make() {
    return name || (name = animation(rule));
};

export default function Swing(
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

