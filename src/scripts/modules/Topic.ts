import { ITopic } from '../models/ITopic';
import { Task } from './Task';

export class Topic implements ITopic {
	public id: number = Date.now();
	public title: string = '';
	public marked: boolean = false;
	public opened: boolean = false;
	public tasks: Task[] = [];

	constructor(title: string) {
		this.title = title;
	}

	open() {
		this.opened = true;
	}

	hide() {
		this.opened = false;
	}

	setMarked(marked: boolean) {
		this.marked = marked;
	}

	addTask(name: string) {
		const order: number = this.tasks.length;
		const newTask: Task = new Task(name, order);
		this.tasks.push(newTask);
		return this.tasks;
	}

	deleteTask(order: number) {
		this.tasks = this.tasks.filter((task) => task.order != order);
		return this.tasks;
	}

	decreaseTaskOrder(order: number) {
		if (order === 0) return this.tasks;
		this.tasks.forEach((t) => {
			if (t.order === order) {
				t.decreaseOrder();
			} else if (t.order === order - 1) {
				t.increaseOrder();
			}
		});
		return this.tasks;
	}

	rename(title: string) {
		this.title = title;
	}
}
