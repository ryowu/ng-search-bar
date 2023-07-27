import { Component, Input } from '@angular/core';
import { FilterUnit } from '../../filter-unit';

@Component({
	selector: 'app-text-panel',
	templateUrl: './text-panel.component.html',
	styleUrls: ['./text-panel.component.scss'],
})
export class TextPanelComponent {
	@Input() public filterUnit: FilterUnit = new FilterUnit();
	@Input() public identifier: number = 0;
}
