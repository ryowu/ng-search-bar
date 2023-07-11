export enum SearchFieldType {
	number = 'number',
	string = 'string',
}

export interface SearchField {
	name: string;
	type: SearchFieldType;
}

export interface NumberSearchField extends SearchField {
	min: number;
}

export interface TextSearchField extends SearchField {
	isCaseSensitive: boolean;
}

export interface SearchConfig {
	fields: (TextSearchField | NumberSearchField)[];
}
