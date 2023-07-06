import topicIcons from '../assets/topic-icons.json';
import { ITask } from '../models/ITask';

export class Task implements ITask {
	public _root: HTMLElement = document.createElement('li');

	private completed: boolean = false;

	public get Completed(): boolean {
		return this.completed;
	}
	public set Completed(value: boolean) {
		this.completed = value;
		this.update();
	}

	constructor(
		public name: string,
		public order: number,
		private orderCallback: () => void,
		private deleteCallback: () => void
	) {
		this.render();
	}

	public increaseOrder() {
		this.order += 1;
	}

	public decreaseOrder() {
		this.order -= 1;
	}

	public setCompleted(completed: boolean) {
		this.completed = completed;
	}

	private render() {
		this._root.innerHTML = `
			${topicIcons.iconWait} ${topicIcons.iconChecked}
			<span>${this.name}</span>
			<div class="tasks__controls">
				<button class="tasks__order">${topicIcons.iconOrder}</button>
				<button class="tasks__delete">${topicIcons.iconDelete}</button>
			</div>`;

		this.initEvents();
	}

	private initEvents() {
		this._root.addEventListener('click', () => {
			this.Completed = !this.Completed;
		});

		this._root.querySelector('.tasks__order')?.addEventListener('click', () => {
			if (this.order === 0) return;
			this.decreaseOrder();
			this.orderCallback();
		});

		this._root.querySelector('.tasks__delete')?.addEventListener('click', () => {
			this._root.remove();
			this.deleteCallback();
		});
	}

	private update() {
		if (this.Completed) {
			this._root.classList.contains('checked') || this._root.classList.add('checked');
		} else {
			this._root.classList.contains('checked') && this._root.classList.remove('checked');
		}
	}
}
