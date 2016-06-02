##Comparison with Gentoo

Gentoo functions and the equivalent in this library.

| Gentoo | Lib |
|---|---|
| accum |   |
| compose | concat, interlace |
| dedupe  | dedupe |
| filter  | filter (no thisValue) |
| forEach | forEach (no thisValue) |
| lastValue |  |
| map | map |
| nthValue |  |
| partition |  |
| pluck |  |
| skip | drop |
| take (Returns an array) |  |
| limit | take |
| loop (records the output of an iterator, then starts repeating it) | repeat (takes a finite generator function or iterable and repeatedly iterates over it) |
| everyN | everyNth |
| reduce |  |
| range | range |
| takeWhile | takeWhile |
| chain | iterate, but all generators chainable by default |
