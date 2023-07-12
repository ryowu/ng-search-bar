export enum SearchFieldType {
	number = 'number',
	string = 'string',
}

export interface SearchField {
	name: string;
	type: SearchFieldType;
	css?: {
		buttonChip?: {
			dirty: string;
			default: string;
		};
	};
}

export interface NumberSearchField extends SearchField {
	min: number;
}

export interface TextSearchField extends SearchField {
	textValue?: string;
	isCaseSensitive: boolean;
}

export interface SearchConfig {
	autoRefresh?: boolean;
	fields: (TextSearchField | NumberSearchField)[];
}
