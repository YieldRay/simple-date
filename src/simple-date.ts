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

type SimpleDateFnParts = {
    [key in keyof SimpleDateParts]: () => SimpleDateParts[key];
};

export function toDateFnParts(date: Date) {
    return {
        date: () => date.getDate() as IntRangeInclude<1, 31>,
        day: () => date.getDay() as IntRangeInclude<0, 6>,
        year: () => date.getFullYear(),
        hours: () => date.getHours() as IntRangeInclude<0, 23>,
        milliseconds: () => date.getMilliseconds() as IntRangeInclude<0, 999>,
        minutes: () => date.getMilliseconds() as IntRangeInclude<0, 59>,
        month: () => (date.getMonth() + 1) as IntRangeInclude<1, 12>,
        seconds: () => date.getSeconds() as IntRangeInclude<0, 59>,
        time: () => date.getTime(),
        timezone: () => -(date.getTimezoneOffset() / 60),
    } as SimpleDateFnParts;
}

export function defineDateProperties<T>(obj: T, date: Date) {
    return Object.defineProperties(
        obj,
        Object.fromEntries(
            Object.entries(toDateFnParts(date)).map(([prop, get]) => [
                prop,
                {
                    enumerable: true,
                    get,
                },
            ])
        )
    ) as T & SimpleDateParts;
}

/**
 * a `SimpleDate` class, creating a object that owns `SimpleDateParts`
 * @example
 * console.log({...new SimpleDate()})
 */
export default class SimpleDate implements SimpleDateParts {
    #date: Date;

    /**
     * this constructor simply collect all parameters and apply them to a `Date()` contsructor
     */

    // deno-lint-ignore ban-ts-comment
    //@ts-ignore
    constructor();
    constructor(value: Date);
    constructor(value: number);
    constructor(dateString: string);
    constructor(
        year: number,
        monthIndex: number,
        date?: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        ms?: number
    );
    constructor(...args: ConstructorParameters<DateConstructor>) {
        const d = new Date(...args);
        this.#date = d;
        defineDateProperties(this, d);
    }

    get date(): IntRangeInclude<1, 31> {
        return this.date;
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
