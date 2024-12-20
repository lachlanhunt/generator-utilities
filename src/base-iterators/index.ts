/**
 * @file Base utilities used to provide simple iteration of iterable objects
 * @author Lachlan Hunt <lachlan.hunt@lachy.id.au>
 */

export { isIterable } from "./isIterable";
export { iterate } from "./iterate";
export { reverse } from "./reverse";
export { safeIterate } from "./safeIterate";

export type { AnyIterable, GeneratorReturnType, Iterable, Predicate } from "./types";
