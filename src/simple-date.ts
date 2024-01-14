type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<Floor extends number, Ceil extends number> = Exclude<Enumerate<Ceil>, Enumerate<Floor>>;

type IntRangeInclude<Floor extends number, Ceil extends number> = IntRange<Floor, Ceil> | Ceil;

export function simpleDate(date: Date) {
    return {
        /**
         * Day of the month
         */
        get date() {
            return date.getDate() as IntRangeInclude<1, 31>;
        },
        /**
         * Day of the week
         */
        get day() {
            return date.getDay() as IntRangeInclude<0, 6>;
        },
        get year() {
            return date.getFullYear();
        },
        get hours() {
            return date.getHours() as IntRangeInclude<0, 23>;
        },
        get milliseconds() {
            return date.getMilliseconds() as IntRangeInclude<0, 999>;
        },
        get minutes() {
            return date.getMinutes() as IntRangeInclude<0, 59>;
        },
        get month() {
            return (date.getMonth() + 1) as IntRangeInclude<1, 12>;
        },
        get seconds() {
            return date.getSeconds() as IntRangeInclude<0, 59>;
        },
        get time() {
            return date.getTime();
        },
        get timezone() {
            return -(date.getTimezoneOffset() / 60);
        },
    };
}

export function simpleDateUTC(date: Date) {
    return {
        get day() {
            return date.getUTCDay() as IntRangeInclude<0, 6>;
        },
        get year() {
            return date.getUTCFullYear();
        },
        get hours() {
            return date.getUTCHours() as IntRangeInclude<0, 23>;
        },
        get milliseconds() {
            return date.getUTCMilliseconds() as IntRangeInclude<0, 999>;
        },
        get minutes() {
            return date.getUTCMinutes() as IntRangeInclude<0, 59>;
        },
        get month() {
            return (date.getUTCMonth() + 1) as IntRangeInclude<1, 12>;
        },
        get seconds() {
            return date.getUTCSeconds() as IntRangeInclude<0, 59>;
        },
        get time() {
            return date.getTime();
        },
        get timezone() {
            return 0;
        },
    };
}

export function format<T, U>(x: T, fn: (x: T) => U) {
    return fn(x);
}

export function padZero(x: number | string, maxLength: number) {
    return x.toString().padStart(maxLength, "0");
}
