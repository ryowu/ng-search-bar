import { Component, Input, OnInit } from '@angular/core';
import { SearchConfig, SearchField } from '../types';

@Component({
	selector: 'app-ng-search-bar',
	templateUrl: './ng-search-bar.component.html',
	styleUrls: ['./ng-search-bar.component.scss'],
})
export class NgSearchBarComponent implements OnInit {
	@Input() public config: SearchConfig;

	constructor() {
		this.config = { fields: [] };
	}

	public ngOnInit(): void {}

	public getTypeName(field: SearchField): string {
		return field.type as string;
	}
}
