import SimpleDate from "../src/simple-date.ts";

Deno.bench(function simpleDate1() {
    const sd = new SimpleDate(new Date(2000, 0, 1, 1, 1, 1, 1));
    sd.format(({ year, month, date }) => `${year}/${month}/${date}`);
});

Deno.bench(function simpleDate2() {
    const sd = new SimpleDate(new Date(2000, 0, 1, 1, 1, 1, 1));
    sd.format(({ year, month, date }) => year + "/" + month + "/" + date);
});

Deno.bench(function builtinDate() {
    const d = new Date(2000, 0, 1, 1, 1, 1, 1);
    d.toLocaleDateString();
});
