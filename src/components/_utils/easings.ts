// copy from ant-design-vue/components/_utils/easings.ts

export function easeInOutCubic(t: number, b: number, c: number, d: number) {
  // time, scrolledTop, y, duration
  const cc = c - b
  t /= d / 2
  if (t < 1)
    return (cc / 2) * t * t * t + b

  return (cc / 2) * ((t -= 2) * t * t + 2) + b
}
