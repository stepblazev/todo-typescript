import { ITopic } from './ITopic';

export interface ITodoStore {
	topics: ITopic[];

	getSearched: (search: string, marked: boolean) => ITopic[];
	addTopic: (title: string) => HTMLElement;
	deleteAll: () => void;
	hideAll: () => void;
}
