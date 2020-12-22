export const inOutSine = (time) => {
  return -(Math.cos(Math.PI * time) - 1) / 2
}

export default {
  inOutSine,
}
