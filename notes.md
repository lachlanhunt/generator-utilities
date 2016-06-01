##Comparison with Gentoo

Gentoo functions and the equivalent in this library.

| Gentoo | Lib |
|---|---|
| accum |   |
| compose | concat |
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
| loop |  |
| everyN | everyNth |
| reduce |  |
| range | range |
| takeWhile | takeWhile |
| chain | iterate, but all generators chainable by default |
