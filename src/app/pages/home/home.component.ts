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
	public config: SearchConfig = { fields: [] };
	constructor() {}

	public ngOnInit(): void {
		this.config.fields.push({
			name: 'Name',
			type: SearchFieldType.string,
			isCaseSensitive: false,
		});
		this.config.fields.push({
			name: 'Category',
			type: SearchFieldType.string,
			isCaseSensitive: true,
		});
		this.config.fields.push({
			name: 'Location',
			type: SearchFieldType.string,
			isCaseSensitive: false,
		});
	}
}
