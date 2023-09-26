import wrapper from '@/HOC/wrapper';
import { animation, defaults } from '@/lib/defaultConfigs';

const rule = `
    from {
        transform: rotate(360deg);
        animation-timing-function: linear;
    }

    to {
    transform: rotate(0deg);
    }
`;

let name: string | undefined;
function make() {
    return name || (name = animation(rule));
}


export default function Spin({ children,
    _out,
    timeout,
    duration = defaults.duration,
    delay = defaults.delay, count = defaults.count,
    forever, ...props } = defaults) {
    const effect = { make, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', } };
    // @ts-expect-error(some props are not allowed. this will be fixed later)
    return wrapper(props, effect, false, children, true);
}
