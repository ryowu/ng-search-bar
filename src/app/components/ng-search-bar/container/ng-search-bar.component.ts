import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { FilterUnit } from '../filter-unit';
import { SearchBarHelper } from '../helper';
import { SearchConfig } from '../types';

@Component({
	selector: 'ng-search-bar',
	templateUrl: './ng-search-bar.component.html',
	styleUrls: ['./ng-search-bar.component.scss'],
})
export class NgSearchBarComponent implements OnInit {
	private readonly helper: SearchBarHelper = new SearchBarHelper();
	@Output() onFilterChanged: EventEmitter<any> = new EventEmitter<any>();
	@Input() public set config(value: SearchConfig) {
		this.helper.config = value;
	}

	constructor() {}

	public get filterUnits(): FilterUnit[] {
		return this.helper.filterUnits;
	}

	public ngOnInit(): void {
		this.helper.$actionSource.subscribe((data) => {
			if (this.onFilterChanged) {
				this.onFilterChanged.emit(this.helper.buildFilterObject());
			}
		});
	}
}
