import { Task } from './task';

export interface Topic {
	title: string;
	marked: boolean;
	opened: boolean;
	tasks: Task[];
}
