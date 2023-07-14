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
	public config: SearchConfig = {
		// autoRefresh: true,
		fields: [
			{
				name: 'Name',
				type: SearchFieldType.String,
				isCaseSensitive: false,
			},
			{
				name: 'Category',
				type: SearchFieldType.String,
				isCaseSensitive: true,
			},
			{
				name: 'Location',
				type: SearchFieldType.String,
				isCaseSensitive: false,
			},
			{
				name: 'Enabled',
				type: SearchFieldType.Boolean,
				caption: 'Enabled',
				checked: true,
			},
		],
	};
	constructor() {}

	public ngOnInit(): void {}

	public onFilterChanged(filterObject: any) {
		// Use the filterObject in your database query
	}
}
