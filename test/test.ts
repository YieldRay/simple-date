import { assertEquals } from "std/assert/assert_equals.ts";
import { simpleDate, format, padZero } from "./../src/simple-date.ts";

Deno.test(function YMD() {
    // Date.UTC(year, month, day, hour, minute, second, millisecond)
    const sd = simpleDate(new Date(2000, 0, 1, 1, 1, 1, 1));
    assertEquals(
        format(sd, ({ year, month, date }) => `${year}/${padZero(month, 2)}/${padZero(date, 2)}`),
        "2000/01/01"
    );
});

Deno.test(function hms() {
    const sd = simpleDate(new Date(2000, 0, 1, 1, 1, 1, 1));
    assertEquals(
        format(sd, ({ hours, minutes, seconds }) => `${hours}/${minutes}/${seconds}`),
        "1/1/1"
    );
});

Deno.test(function hms() {
    const sd = simpleDate(new Date(2000, 0, 1, 1, 1, 1, 1));
    assertEquals(
        format(sd, ({ hours, minutes, seconds }) => `${hours}/${minutes}/${seconds}`),
        "1/1/1"
    );
});
