/**
 * Count from the specified start in increments of the specified step.
 *
 * @generator
 * @param [start=0] The number to start counting from
 * @param [step=1] The value to increment by each iteration. This may be positive or negative.
 * @yields numbers in the sequence
 */
export function* counter(start = 0, step = 1) {
    while (true) {
        yield start;
        start += step;
    }
}
