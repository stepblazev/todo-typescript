import { IntRange } from './utils';

export interface Task {
	name: string;
	completed: boolean;
	order: IntRange<1, 10>;
}
