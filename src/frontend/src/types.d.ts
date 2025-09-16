import React from 'react';

export {};

declare global {
  interface Element {
    style: CSSStyleDeclaration;
    classList: DOMTokenList;
  }
}