import type { ReactNode } from "react"
import wrapper from "@/HOC/wrapper";
import { animation, defaults } from "@/lib/defaultConfigs";


interface PulseProps {
    children: ReactNode;
    out?: boolean;
    timeout?: number;
    duration?: number;
    delay?: number;
    count?: number;
    forever?: boolean;
    [key: string]: any;
}


// animation rules
const rule = `
	from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
}`;

let name: string | undefined;

function make() {
    return name || (name = animation(rule));
}

export default function Pulse({
    children,
    // out,
    timeout,
    duration = defaults.duration,
    delay = defaults.delay,
    count = defaults.count,
    forever, ...props
}: PulseProps) {
    const effect = { make, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', } };
    // @ts-expect-error(some props are not allowed, this will be fixed later)
    return wrapper(props, effect, false, children, true);
}
