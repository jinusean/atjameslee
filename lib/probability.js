/**
 * Returns a number between min and max inclusive
 * @param min = min value inclusive
 * @param max = max value inclusive
 * @param integer = integers only
 * @returns {*}
 */
export const getRandom = (min, max, integer = true) => {
  let val = Math.random() * (max - min) + min
  if (integer) {
    val = Math.round(val)
  }
  return val
}
