import { Component, OnInit } from '@angular/core';
import {
	SearchConfig,
	SearchFieldType,
} from 'src/app/components/ng-search-bar/types';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	public filterObject: any;

	public config: SearchConfig = {
		// autoRefresh: true,
		fields: [
			{
				name: 'name',
				type: SearchFieldType.String,
				isCaseSensitive: false,
			},
			{
				name: 'age',
				type: SearchFieldType.String,
				isCaseSensitive: true,
			},
			{
				name: 'department',
				type: SearchFieldType.String,
				isCaseSensitive: false,
			},
			{
				name: 'isActive',
				type: SearchFieldType.Boolean,
				caption: 'Is Active',
				checked: true,
			},
		],
	};
	constructor() {}

	public ngOnInit(): void {}

	public onFilterChanged(filter: any) {
		// Use the filterObject in your database query
		this.filterObject = filter;
	}
}
