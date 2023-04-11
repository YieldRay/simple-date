type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<Floor extends number, Ceil extends number> = Exclude<Enumerate<Ceil>, Enumerate<Floor>>;

type IntRangeInclude<Floor extends number, Ceil extends number> = IntRange<Floor, Ceil> | Ceil;

export interface SimpleDateParts {
    date: IntRangeInclude<1, 31>;
    day: IntRangeInclude<0, 6>;
    year: number;
    hours: IntRangeInclude<0, 23>;
    milliseconds: IntRangeInclude<0, 999>;
    minutes: IntRangeInclude<0, 59>;
    month: IntRangeInclude<1, 12>;
    seconds: IntRangeInclude<0, 59>;
    time: number;
    timezone: number;
}

/**
 * a `SimpleDate` class, creating a object that owns `SimpleDateParts`
 * @example
 * console.log({...new SimpleDate()})
 */
export default class SimpleDate implements SimpleDateParts {
    /**
     * simply a Date object, do not change it, though changing it has no effect
     */
    innerDate: Date;

    /**
     * the constructor simply collect all parameters and apply them to a Date contsructor
     */

    constructor(...args: ConstructorParameters<typeof Date>) {
        const $date$ = new Date(...args);
        this.innerDate = $date$;
        Object.defineProperties(this, {
            date: {
                enumerable: true,
                get() {
                    return $date$.getDate() as IntRangeInclude<1, 31>;
                },
            },
            day: {
                enumerable: true,
                get() {
                    return $date$.getDay() as IntRangeInclude<0, 6>;
                },
            },
            year: {
                enumerable: true,
                get() {
                    return $date$.getFullYear();
                },
            },
            hours: {
                enumerable: true,
                get() {
                    return $date$.getHours() as IntRangeInclude<0, 23>;
                },
            },
            milliseconds: {
                enumerable: true,
                get() {
                    return $date$.getMilliseconds() as IntRangeInclude<0, 999>;
                },
            },
            minutes: {
                enumerable: true,
                get() {
                    return $date$.getMilliseconds() as IntRangeInclude<0, 59>;
                },
            },
            month: {
                enumerable: true,
                get() {
                    return ($date$.getMonth() + 1) as IntRangeInclude<1, 12>;
                },
            },
            seconds: {
                enumerable: true,
                get() {
                    return $date$.getSeconds() as IntRangeInclude<0, 59>;
                },
            },
            time: {
                enumerable: true,
                get() {
                    return $date$.getTime();
                },
            },
            timezone: {
                enumerable: true,
                get() {
                    return -($date$.getTimezoneOffset() / 60);
                },
            },
        });
    }

    get date(): IntRangeInclude<1, 31> {
        return this.day;
    }
    get day(): IntRangeInclude<1, 6> {
        return this.day;
    }
    get year(): number {
        return this.year;
    }
    get hours(): IntRangeInclude<0, 23> {
        return this.hours;
    }
    get milliseconds(): IntRangeInclude<0, 999> {
        return this.milliseconds;
    }
    get minutes(): IntRangeInclude<0, 59> {
        return this.minutes;
    }
    get month(): IntRangeInclude<1, 12> {
        return this.month;
    }
    get seconds(): IntRangeInclude<0, 59> {
        return this.seconds;
    }
    get time(): number {
        return this.time;
    }
    get timezone(): number {
        return this.timezone;
    }

    format<T>(fn: (self: this) => T) {
        return fn(this);
    }
}
