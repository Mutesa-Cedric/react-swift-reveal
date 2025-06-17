'use client'

import { useEffect, useState } from 'react'

const animations = {
    bounce: `
    @keyframes bounce {
      from, 20%, 50%, 80%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        transform: translate3d(0, 0, 0);
      }
      40%, 43% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -30px, 0);
      }
      70% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -15px, 0);
      }
      90% {
        transform: translate3d(0, -4px, 0);
      }
    }
  `,
    flash: `
    @keyframes flash {
      from, 50%, to {
        opacity: 1;
      }
      25%, 75% {
        opacity: 0;
      }
    }
  `,
    headshake: `
    @keyframes headshake {
      0% {
        transform: translateX(0);
      }
      6.5% {
        transform: translateX(-6px) rotateY(-9deg);
      }
      18.5% {
        transform: translateX(5px) rotateY(7deg);
      }
      31.5% {
        transform: translateX(-3px) rotateY(-5deg);
      }
      43.5% {
        transform: translateX(2px) rotateY(3deg);
      }
      50% {
        transform: translateX(0);
      }
    }
  `,
    jello: `
    @keyframes jello {
      from, 11.1%, to {
        transform: none;
      }
      22.2% {
        transform: skewX(-12.5deg) skewY(-12.5deg);
      }
      33.3% {
        transform: skewX(6.25deg) skewY(6.25deg);
      }
      44.4% {
        transform: skewX(-3.125deg) skewY(-3.125deg);
      }
      55.5% {
        transform: skewX(1.5625deg) skewY(1.5625deg);
      }
      66.6% {
        transform: skewX(-0.78125deg) skewY(-0.78125deg);
      }
      77.7% {
        transform: skewX(0.390625deg) skewY(0.390625deg);
      }
      88.8% {
        transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
      }
    }
  `,
    jump: `
    @keyframes jump {
      from, 20%, 53%, 80%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        transform: translate3d(0, 0, 0);
      }
      40%, 43% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -30px, 0);
      }
      70% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -15px, 0);
      }
      90% {
        transform: translate3d(0, -4px, 0);
      }
    }
  `,
    pop: `
    @keyframes pop {
      from {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      to {
        transform: scale(1);
      }
    }
  `,
    pulse: `
    @keyframes pulse {
      from {
        transform: scale3d(1, 1, 1);
      }
      50% {
        transform: scale3d(1.05, 1.05, 1.05);
      }
      to {
        transform: scale3d(1, 1, 1);
      }
    }
  `,
    rubberband: `
    @keyframes rubberband {
      from {
        transform: scale3d(1, 1, 1);
      }
      30% {
        transform: scale3d(1.25, 0.75, 1);
      }
      40% {
        transform: scale3d(0.75, 1.25, 1);
      }
      50% {
        transform: scale3d(1.15, 0.85, 1);
      }
      65% {
        transform: scale3d(.95, 1.05, 1);
      }
      75% {
        transform: scale3d(1.05, .95, 1);
      }
      to {
        transform: scale3d(1, 1, 1);
      }
    }
  `,
    shake: `
    @keyframes shake {
      from, to {
        transform: translate3d(0, 0, 0);
      }
      10%, 30%, 50%, 70%, 90% {
        transform: translate3d(-10px, 0, 0);
      }
      20%, 40%, 60%, 80% {
        transform: translate3d(10px, 0, 0);
      }
    }
  `,
    spin: `
    @keyframes spin {
      from {
        transform: rotate(360deg);
        animation-timing-function: linear;
      }
      to {
        transform: rotate(0deg);
      }
    }
  `,
    swing: `
    @keyframes swing {
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
    }
  `,
    tada: `
    @keyframes tada {
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
    }
  `,
    wobble: `
    @keyframes wobble {
      from {
        transform: none;
      }
      15% {
        transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
      }
      30% {
        transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
      }
      45% {
        transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
      }
      60% {
        transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
      }
      75% {
        transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
      }
      to {
        transform: none;
      }
    }
  `,
    fade: `
    @keyframes fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
    flip: `
    @keyframes flip {
      from {
        transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
        animation-timing-function: ease-out;
        opacity: 0;
      }
      40% {
        transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
        animation-timing-function: ease-out;
      }
      50% {
        transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
        animation-timing-function: ease-in;
      }
      to {
        transform: perspective(400px);
        animation-timing-function: ease-in;
        opacity: 1;
      }
    }
  `,
    lightspeed: `
    @keyframes lightspeed {
      from {
        transform: translate3d(100%, 0, 0) skewX(-30deg);
        opacity: 0;
      }
      60% {
        transform: skewX(20deg);
        opacity: 1;
      }
      80% {
        transform: skewX(-5deg);
        opacity: 1;
      }
      to {
        transform: none;
        opacity: 1;
      }
    }
  `,
    roll: `
    @keyframes roll {
      from {
        opacity: 0;
        transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }
  `,
    rotate: `
    @keyframes rotate {
      from {
        opacity: 0;
        transform-origin: center;
        transform: rotate3d(0, 0, 1, -200deg);
      }
      to {
        opacity: 1;
        transform-origin: center;
        transform: none;
      }
    }
  `,
    slide: `
    @keyframes slide {
      from {
        transform: translate3d(-100%, 0, 0);
      }
      to {
        transform: none;
      }
    }
  `,
    zoom: `
    @keyframes zoom {
      from {
        opacity: 0;
        transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
        animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
      }
      60% {
        opacity: 1;
        transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
      }
    }
  `
}

type AnimationType = keyof typeof animations

interface AnimationDemoProps {
    type: AnimationType
    children: React.ReactNode
}

export function AnimationDemo({ type, children }: AnimationDemoProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        // Add the animation styles
        const style = document.createElement('style')
        style.textContent = animations[type]
        document.head.appendChild(style)
        return () => {
            document.head.removeChild(style)
        }
    }, [type])

    return (
        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{
                padding: '1rem',
                margin: '1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '0.5rem',
                animation: isClient ? `${type} 1s ease infinite` : 'none'
            }}>
                {children}
            </div>
        </div>
    )
} 