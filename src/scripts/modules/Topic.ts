import topicIcons from '../assets/topic-icons.json';
import { ITopic } from '../models/ITopic';
import { Task } from './Task';

export class Topic implements ITopic {
	public _root: HTMLElement = document.createElement('div');

	public id: number = Date.now();
	public tasks: Task[] = [];

	private opened: boolean = false;

	public get Opened(): boolean {
		return this.opened;
	}
	public set Opened(value: boolean) {
		this.opened = value;
		this.update();
	}

	private marked: boolean = false;

	public get Marked(): boolean {
		return this.marked;
	}
	public set Marked(value: boolean) {
		this.marked = value;
		this.update();
	}

	constructor(
		public title: string,
		private hideAllCallback: (id: number) => void,
		private deleteCallback: (id: number) => void
	) {
		this._root.classList.add('topic');
		this._root.setAttribute('data-topic-id', this.id.toString());
		this.render();
	}

	public addTask(name: string) {
		const order: number = this.tasks.length;
		const newTask: Task = new Task(
			name,
			order,
			() => {
				this.tasks.find((t) => t.order === order - 1)?.increaseOrder();
				this.tasks.sort((prevTask, curTask) => prevTask.order - curTask.order);
				this.renderTasks();
			},
			() => {
				this.tasks = this.tasks.filter((t) => t.order !== order);
			}
		);
		this.tasks.push(newTask);
	}

	private render() {
		this._root.innerHTML = ` 
            <div class="topic__header">
				<button class="topic__mark hoverable">
					${topicIcons.iconNotMarked} ${topicIcons.iconMarked}
				</button>
				<h3 class="topic__title">${this.title}</h3>
				<button class="topic__edit hoverable">${topicIcons.iconDelete}</button>
			</div>
			<div class="topic__more">
				<div class="topic__line ${this.opened ? 'opened' : ''}"></div>
				<button class="topic__show-more">${topicIcons.iconShowMore}</button>
			</div>
			<div class="tasks">
				<ul class="tasks__list"></ul>
				<button class="tasks__add hoverable">New task</button>
			</div>`;

		this.initEvents();
	}

	private initEvents() {
		const markBUTTON: HTMLElement = this._root.querySelector('.topic__mark') as HTMLElement;
		markBUTTON.addEventListener('click', () => {
			this.Marked = !this.Marked;
		});

		const editBUTTON: HTMLElement = this._root.querySelector('.topic__edit') as HTMLElement;
		editBUTTON.addEventListener('click', () => {
			if (!confirm(`Delete topic "${this.title}"?`)) return;
			this._root.remove();
			this.deleteCallback(this.id);
		});

		const moreBUTTON: HTMLElement = this._root.querySelector(
			'.topic__show-more'
		) as HTMLElement;
		moreBUTTON.addEventListener('click', () => {
			this.hideAllCallback(this.id);
			this.Opened = !this.Opened;
		});

		const addBUTTON: HTMLElement = this._root.querySelector('.tasks__add') as HTMLElement;
		addBUTTON.addEventListener('click', () => {
			const name = prompt('Enter task name:');
			if (!name) return;
			this.addTask(name);
		});
	}

	private update() {
		const _container = this._root;

		const markBUTTON = _container.querySelector('.topic__mark');
		const moreBUTTON = _container.querySelector('.topic__line');

		if (this.Opened) {
			_container.classList.contains('opened') || _container.classList.add('opened');
			moreBUTTON!.classList.contains('opened') || moreBUTTON!.classList.add('opened');
		} else {
			_container.classList.contains('opened') && _container.classList.remove('opened');
			moreBUTTON!.classList.contains('opened') && moreBUTTON!.classList.remove('opened');
		}

		if (this.Marked) {
			markBUTTON!.classList.contains('marked') || markBUTTON!.classList.add('marked');
		} else {
			markBUTTON!.classList.contains('marked') && markBUTTON!.classList.remove('marked');
		}
	}

	private renderTasks() {
		const _container = this._root.querySelector('.tasks__list');
		this.tasks.forEach((t) => _container!.append(t._root));
	}
}
