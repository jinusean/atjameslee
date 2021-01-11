export const getRandom = (min, max, integer = true) => {
  let val = Math.random() * (max - min) + min
  if (integer) {
    val = Math.round(val)
  }
  return val
}
