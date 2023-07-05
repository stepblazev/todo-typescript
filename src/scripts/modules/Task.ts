import { ITask } from '../models/ITask';

export class Task implements ITask {
	public completed: boolean = false;

	constructor(public name: string, public order: number) {}

	public increaseOrder() {
		this.order += 1;
	}

	public decreaseOrder() {
		this.order -= 1;
	}

	public setCompleted(completed: boolean) {
		this.completed = completed;
	}
}
