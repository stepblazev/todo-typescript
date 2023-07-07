import topicIcons from '../assets/topic-icons.json';
import { ITopic } from '../models/ITopic';
import { Task } from './Task';

export class Topic implements ITopic {
	public _root: HTMLElement = document.createElement('div');

	public tasks: Task[] = [];

	private opened: boolean = false;
	private marked: boolean = false;

	public get Opened() {
		return this.opened;
	}

	public set Opened(value: boolean) {
		this.opened = value;
		this.update();
	}

	public get Marked() {
		return this.marked;
	}

	public set Marked(value: boolean) {
		this.marked = value;
		this.update();
	}

	constructor(public title: string) {
		this.render();
	}

	private render() {
		this._root.classList.add('topic');
		this._root.innerHTML = ` 
            <div class="topic__header">
				<button class="topic__mark hoverable">
					${topicIcons.iconNotMarked} ${topicIcons.iconMarked}
				</button>
				<h3 class="topic__title">${this.title}</h3>
				<button class="topic__edit hoverable">${topicIcons.iconDelete}</button>
			</div>
			<div class="topic__more">
				<div class="topic__line"></div>
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
			// DELETING THE TOPIC
		});

		const moreBUTTON: HTMLElement = this._root.querySelector(
			'.topic__show-more'
		) as HTMLElement;
		moreBUTTON.addEventListener('click', () => {
			this.Opened = !this.Opened;
		});

		const addBUTTON: HTMLElement = this._root.querySelector('.tasks__add') as HTMLElement;
		addBUTTON.addEventListener('click', () => {
			const name: string | null = prompt('Enter task name:');
			if (!name) return;

			const exists: Task | undefined = this.tasks.find(
				(task) => task.name.toLowerCase() === name.toLowerCase()
			);
			if (exists) return alert('Task with the same name already exists');

			const newTask: Task = new Task(name);
			this.tasks.push(newTask);
			this.renderTasks();
		});
	}

	private renderTasks() {
		const _taskContainer = this._root.querySelector('.tasks__list');
		this.tasks.forEach((task, index) => {
			task._root.querySelector('.tasks__delete')!.addEventListener('click', () => {
				this.tasks.splice(index, 1);
			});

			task._root.querySelector('.tasks__order')!.addEventListener('click', () => {
				if (index === 0) return;
				[this.tasks[index], this.tasks[index - 1]] = [
					this.tasks[index - 1],
					this.tasks[index],
				];
			});
			_taskContainer!.append(task._root);
		});
	}

	private update() {
		console.log('update');

		const _topic = this._root;

		const markBUTTON = _topic.querySelector('.topic__mark');
		const moreBUTTON = _topic.querySelector('.topic__line');

		if (this.opened) {
			_topic.classList.add('opened');
			moreBUTTON!.classList.add('opened');
		} else {
			_topic.classList.remove('opened');
			moreBUTTON!.classList.remove('opened');
		}

		if (this.marked) {
			markBUTTON!.classList.add('marked');
		} else {
			markBUTTON!.classList.remove('marked');
		}
	}
}
