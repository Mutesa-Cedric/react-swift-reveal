# react-swift-reveal

react-swift-reveal is a React component library and animation framework for animating elements as they enter the viewport or on scroll. you can learn more about the library [here(documention)](https://react-swift-reveal.vercel.app/) or view [stackblitz demo](https://stackblitz.com/edit/react-swift-reveal?file=src%2FApp.tsx)

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
import MyComponent from "./MyComponent"; // component to be animated

const App = () => {
  return (
    <Fade>
      <MyComponent /> //component to be animated
    </Fade>
  );
};
```

### with next.js app directory

```javascript
"use client";

import { Fade } from "react-swift-reveal";

const App = () => {
  return (
    <Fade>
      <h1>hello world</h1>
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