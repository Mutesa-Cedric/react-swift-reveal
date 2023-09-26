import wrapper from "@/HOC/wrapper";
import { animation, defaults } from "@/lib/defaultConfigs";

const rule = `
    from {
        transform: scale3d(1, 1, 1);
    }

    10%, 20% {
        transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    }

    30%, 50%, 70%, 90% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }

    40%, 60%, 80% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
`;

let name: string | undefined;

function make() {
    return name || (name = animation(rule));
};

export default function Tada({
    children,
    _out,
    timeout,
    duration = defaults.duration,
    delay = defaults.delay,
    count = defaults.count,
    forever, ...props
} = defaults) {
    const effect = { make, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', } };
    // @ts-expect-error(some props are not allowed, this will be fixed later)
    return wrapper(props, effect, false, children, true);
};

