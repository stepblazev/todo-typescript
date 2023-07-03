import { ITask } from '../models/ITask';

export class Task implements ITask {
	public completed: boolean = false;

	constructor(public name: string, public order: number) {}

	increaseOrder() {
		this.order += 1;
	}

	decreaseOrder() {
		this.order -= 1;
	}

	setCompleted(completed: boolean) {
		this.completed = completed;
	}
}
