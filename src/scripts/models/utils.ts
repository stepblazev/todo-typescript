type Enumerate<N extends number, ACC extends number[] = []> = ACC['length'] extends N
	? ACC[number]
	: Enumerate<N, [...ACC, ACC['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
