import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { SearchConfig } from '../types';
import { FilterUnit } from '../filter-unit';
import { SearchBarHelper } from '../helper';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ng-search-bar',
	templateUrl: './ng-search-bar.component.html',
	styleUrls: ['./ng-search-bar.component.scss'],
})
export class NgSearchBarComponent implements OnInit {
	private readonly helper: SearchBarHelper = new SearchBarHelper();

	// @ViewChildren('dropdownHandle')
	// public dropdownHandles!: NgbDropdown[];
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
			// if (
			// 	data &&
			// 	this.dropdownHandles &&
			// 	this.helper.config.closePopoverAfterFilterApply
			// ) {
			// 	this.dropdownHandles.forEach((d) => {
			// 		d.close();
			// 	});
			// }

			const filterObject = this.helper.buildFilterObject();

			if (this.onFilterChanged) {
				this.onFilterChanged.emit(filterObject);
			}
		});
	}
}
