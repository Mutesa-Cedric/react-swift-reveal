/* eslint-disable no-prototype-builtins */
import wrapper from "../../HOC/wrapper";
import { animation, defaults } from "../../lib/defaultConfigs";
import type { IAnimationProps } from "../../types";

interface Props extends IAnimationProps {
    distance?: string;
    big?: boolean;
    context?: boolean;
}


const lookup = {};
function make(reverse, { distance, left, right, up, down, top, bottom, big, mirror, opposite, }) {
    const checksum = (distance ? distance.toString() : 0) + ((left ? 1 : 0) | (right ? 2 : 0) | (top || down ? 4 : 0) | (bottom || up ? 8 : 0) | (mirror ? 16 : 0) | (opposite ? 32 : 0) | (reverse ? 64 : 0) | (big ? 128 : 0));
    if (lookup.hasOwnProperty(checksum))
        return lookup[checksum];
    const transform = left || right || up || down || top || bottom;
    let x, y;
    if (transform) {
        if (!mirror !== !(reverse && opposite)) // Boolean XOR
            [left, right, top, bottom, up, down] = [right, left, bottom, top, down, up];
        const dist = distance || (big ? '2000px' : '100%');
        x = left ? `-${dist}` : (right ? dist : '0');
        y = down || top ? `-${dist}` : (up || bottom ? dist : '0');
    }
    lookup[checksum] = animation(
        `${!reverse ? 'from' : 'to'} {opacity: 0;${transform ? ` transform: translate3d(${x}, ${y}, 0);` : ''}}
     ${reverse ? 'from' : 'to'} {opacity: 1;transform: none;} `
    );
    return lookup[checksum];
}

function Fade({ children,
    // eslint-disable-next-line unused-imports/no-unused-vars
    out,
    forever,
    timeout,
    duration = defaults.duration,
    delay = defaults.delay,
    count = defaults.count,
    ...props }: Props = defaults,
    // context = false
) {
    const effect = {
        make,
        duration: timeout === undefined ? duration : timeout,
        delay,
        forever,
        count,
        style: { animationFillMode: 'both', },
        reverse: props.left,
    };
    // TODO : handle when context is true
    // return context ? wrapper(props, effect, effect, children) : effect;
    // @ts-expect-error(prop types to be fixed later)
    return wrapper(props, effect, effect, children);
}

export default Fade;
