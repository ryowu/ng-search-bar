import { Component, Input } from '@angular/core';
import { FilterUnit } from '../../filter-unit';

@Component({
	selector: 'app-number-panel',
	templateUrl: './number-panel.component.html',
	styleUrls: ['./number-panel.component.scss'],
})
export class NumberPanelComponent {
	@Input() public filterUnit: FilterUnit = new FilterUnit();
	@Input() public identifier: number = 0;
}
