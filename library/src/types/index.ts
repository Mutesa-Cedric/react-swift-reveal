export interface IAnimationProps {
    children?: React.ReactNode;
    out?: boolean;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
    mirror?: boolean;
    opposite?: boolean;
    timeout?: number;
    duration?: number;
    delay?: number;
    count?: number;
    forever?: boolean;
    distance?: string;
    big?: boolean;
    // [key: string]: any;
}


// export interface SimpleAnimationProps {
//     duration?: number;
//     timeout?: number;
//     delay?: number;
//     count?: number;
//     forever?: boolean;
//     children?: React.ReactNode;
// }
