export const transformXY = (x, y, w, h) => {
    return [ x / w, 1 - (y / w) ]
}