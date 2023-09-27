/* eslint-disable no-prototype-builtins */
import wrapper from "../../HOC/wrapper";
import { animation, defaults } from "../../lib/defaultConfigs";

const lookup = {};
function make(reverse, { left, right, up, down, top, bottom, big, mirror, opposite, }) {
    const checksum = ((left ? 1 : 0) | (right ? 2 : 0) | (top || down ? 4 : 0) | (bottom || up ? 8 : 0) | (mirror ? 16 : 0) | (opposite ? 32 : 0) | (reverse ? 64 : 0) | (big ? 128 : 0));
    if (lookup.hasOwnProperty(checksum))
        return lookup[checksum];
    const transform = left || right || up || down || top || bottom;
    let x, y;
    if (transform) {
        if (!mirror !== !(reverse && opposite)) // Boolean XOR
            [left, right, top, bottom, up, down] = [right, left, bottom, top, down, up];
        const dist = big ? '2000px' : '100%';
        x = left ? `-${dist}` : (right ? dist : '0');
        y = down || top ? `-${dist}` : (up || bottom ? dist : '0');
    }
    lookup[checksum] = animation(
        `${!reverse ? 'from' : 'to'} {${transform ? ` transform: translate3d(${x}, ${y}, 0);` : ''}}
     ${reverse ? 'from' : 'to'} {transform: none;} `
    );
    return lookup[checksum];
}

export default function Slide({ children, _out, forever,
    timeout, duration = defaults.duration, delay = defaults.delay, count = defaults.count, ...props } = defaults) {
    const effect = {
        make,
        duration: timeout === undefined ? duration : timeout,
        delay,
        forever,
        count,
        style: { animationFillMode: 'both', },
        reverse: props.left,
    };
    // @ts-expect-error(some props are not allowed, this will be fixed later)
    return wrapper(props, effect, effect, children);
}
