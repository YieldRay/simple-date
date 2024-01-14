# simple-date

Simple code to format date, without timezone support.

Prefer [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat), if available.

## usage

```ts
import { simpleDate, format, padZero } from "./simple-date.ts";

console.log(
    format(
        simpleDate(new Date(2000, 0, 1, 1, 1, 1, 1)),
        ({ year, month, date }) => `${year}/${padZero(month, 2)}/${padZero(date, 2)}`
    )
);
```
