# react-swift-reveal

React-swiftReveal is a React component library and animation framework for animating elements as they enter the viewport.

## Installation

with npm:

```bash
npm install react-swift-reveal
```

with yarn:

```bash
yarn add react-swift-reveal
```

with pnpm:

```bash
pnpm add react-swift-reveal
```

## Usage

```javascript
import { Fade } from "react-swift-reveal";

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
import { Fade } from "react-swift-reveal";

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

# Support

If you like this project, please consider supporting it by giving it a star.
