export const applyStyles = (element: HTMLElement, ...styles: Partial<CSSStyleDeclaration>[]) => {
  const merged: Partial<CSSStyleDeclaration> = Object.assign({}, ...styles);
  for (const [prop, value] of Object.entries(merged)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (element.style as any)[prop] = value;
  }
};
