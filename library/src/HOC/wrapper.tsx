"use client"

import React from 'react';

import RevealBase from '../lib/Base';
import type { IAnimationProps, InOutEffect } from '../types';


export default function wrapper(props: IAnimationProps, inEffect: InOutEffect, outEffect: InOutEffect, children: string | number | boolean |
  React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined) {
  // check if children is a single element
  if (React.Children.count(children) < 2)
    return <RevealBase {...props} inEffect={inEffect} outEffect={outEffect} children={children} />
  // map through elements if children is an array
  children = React.Children.map(children, child =>
    <RevealBase {...props} inEffect={inEffect} outEffect={outEffect} children={child} />,
  )
  return 'Fragment' in React ? <React.Fragment>{children}</React.Fragment> : <span>{children}</span>
}
