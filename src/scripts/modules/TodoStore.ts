import { ITodoStore } from '../models/ITodoStore';
import { Topic } from './Topic';

export class TodoStore implements ITodoStore {
	public topics: Topic[] = [];

	public getSearched(search: string, marked: boolean) {
		const searchResult = this.topics.filter(
			(topic) =>
				topic.title.toLowerCase().includes(search.toLowerCase()) &&
				(marked ? topic.Marked === true : true)
		);
		return searchResult;
	}

	public addTopic(title: string) {
		const newTopic: Topic = new Topic(
			title,
			(id: number) => {
				this.topics.forEach((topic) => {
					if (topic.id !== id) topic.Opened = false;
				});
			},
			(id: number) => {
				this.topics = this.topics.filter((t) => t.id !== id);
			}
		);
		this.topics.push(newTopic);
		return newTopic._root;
	}

	public deleteAll() {
		this.topics = [];
	}
}
