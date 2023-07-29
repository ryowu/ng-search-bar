import { Component } from '@angular/core';
import { BasePanel } from '../base-panel';

@Component({
	selector: 'app-number-panel',
	templateUrl: './number-panel.component.html',
	styleUrls: ['./number-panel.component.scss'],
})
export class NumberPanelComponent extends BasePanel {}
