# React-swiftReveal

React-swiftReveal is a React component library and animation framework for animating elements as they enter the viewport.

## Installation

with npm:

```bash
npm install react-swiftreveal
```

with yarn:

```bash
yarn add react-swiftreveal
```

with pnpm:

```bash
pnpm add react-swiftreveal
```

## Usage

```javascript
import { Fade } from "react-swiftreveal";

const App = () => {
  return (
    <Fade>
      <h1>hello world</h1>
    </Fade>
  );
};
```

or

```javascript
import { Fade } from "react-swiftreveal";

const App = () => {
  return (
    <Fade>
      <MyComponent /> //component to be animated
    </Fade>
  );
};
```

both examples will fade in the element as it enters the viewport.

## Available Animations

- Fade
- Bounce
- Slide
- Zoom
- Flip
- Rotate
- Roll
- LightSpeed

## Simple animations

- Flash
- Jello
- Pulse
- RubberBand
- Shake
- Swing
- Tada
- Wobble
- HeadShake
- Pop
- Spin
- Jump

