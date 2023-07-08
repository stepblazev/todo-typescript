import topicIcons from '../assets/topic-icons.json';
import { ITask } from '../models/ITask';

export class Task implements ITask {
	public _root: HTMLElement = document.createElement('li');

	private completed: boolean = false;

	public get Completed() {
		return this.completed;
	}

	public set Completed(value: boolean) {
		this.completed = value;
		this.update();
	}

	constructor(public name: string) {
		this.render();
	}

	private render() {
		this._root.innerHTML = `
			${topicIcons.iconWait} ${topicIcons.iconChecked}
			<span>${this.name}</span>
			<div class="tasks__controls">
				<button class="tasks__delete">${topicIcons.iconDelete}</button>
			</div>`;

		this.initEvents();
	}

	private initEvents() {
		this._root.addEventListener('click', () => {
			this.Completed = !this.Completed;
		});
		this._root.querySelector('.tasks__delete')?.addEventListener('click', () => {
			// DELETING THE TASK
		});
	}

	private update() {
		this.completed
			? this._root.classList.add('checked')
			: this._root.classList.remove('checked');
	}
}
