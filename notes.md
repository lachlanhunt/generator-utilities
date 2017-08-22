##Comparison with Gentoo

Gentoo functions and the equivalent in this library.

| Gentoo | Lib |
|---|---|
| accum | (Not useful) |
| compose | concat, interlace |
| dedupe  | dedupe |
| filter  | filter (no thisValue) |
| forEach | forEach (no thisValue) |
| lastValue | (Not applicable to generators, must convert to finite array) |
| map | map |
| nthValue | .drop(n - 1).take(1) |
| partition |  |
| pluck | pluck |
| skip | drop |
| take (Returns an array) | .chunk(n).take(1) |
| limit | take |
| loop (records the output of an iterator, then starts repeating it) | repeat (takes a finite generator function or iterable and repeatedly iterates over it) |
| everyN | everyNth |
| reduce | N/A (Only works with finite sequences, outputs single value) |
| range | range |
| takeWhile | takeWhile |
| chain | iterate, but all generators chainable by default |
