export {};

declare global {
  interface Element {
    style: CSSStyleDeclaration;
    classList: DOMTokenList;
  }
}