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

	public open() {
		this.opened = true;
	}

	public hide() {
		this.opened = false;
	}

	public setMarked(marked: boolean) {
		this.marked = marked;
	}

	public addTask(name: string) {
		const order: number = this.tasks.length;
		const newTask: Task = new Task(name, order);
		this.tasks.push(newTask);
		return this.tasks;
	}

	public deleteTask(order: number) {
		this.tasks = this.tasks.filter((task) => task.order != order);
		return this.tasks;
	}

	public decreaseTaskOrder(task: Task) {
		if (task.order === 0) return this.tasks;
		this.tasks.find((t) => t.order === task.order - 1)?.increaseOrder();
		task.decreaseOrder();
		return this.tasks.sort((prevTask, curTask) => prevTask.order - curTask.order);
	}

	public rename(title: string) {
		this.title = title;
	}
}
