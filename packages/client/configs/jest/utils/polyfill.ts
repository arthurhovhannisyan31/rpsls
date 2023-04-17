const requestAnimationFrame = (cb: () => void): void => {
  setTimeout(cb, 0)
}
// @ts-ignore
global.requestAnimationFrame = requestAnimationFrame

export default requestAnimationFrame
