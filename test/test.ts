import { assertEquals } from "std/testing/asserts.ts";
import SimpleDate from "../src/simple-date.ts";

Deno.test(function YMD() {
    // Date.UTC(year, month, day, hour, minute, second, millisecond)
    const sd = new SimpleDate(new Date(2000, 0, 1, 1, 1, 1, 1));
    assertEquals(
        sd.format(({ year, month, date }) => `${year}/${month}/${date}`),
        "2000/1/1"
    );
});

Deno.test(function hms() {
    const sd = new SimpleDate(new Date(2000, 0, 1, 1, 1, 1, 1));
    assertEquals(
        sd.format(({ hours, minutes, seconds }) => `${hours}/${minutes}/${seconds}`),
        "1/1/1"
    );
});
