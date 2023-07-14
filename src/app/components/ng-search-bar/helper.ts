import { Subject, Subscription, debounceTime, merge } from 'rxjs';
import { FilterUnit } from './filter-unit';
import { SearchConfig } from './types';

export class SearchBarHelper {
	private sub: Subscription;
	private _config: SearchConfig;
	private _filterUnits: FilterUnit[] = [];
	public $actionSource: Subject<void> = new Subject<void>();

	constructor() {
		this._config = { autoRefresh: false, fields: [] };
		this.sub = new Subscription();
	}

	public get config(): SearchConfig {
		return this._config;
	}

	public set config(value: SearchConfig) {
		this.applyConfig(value);
		this.buildFilterUnits();
	}

	public get filterUnits(): FilterUnit[] {
		return this._filterUnits;
	}

	private buildDefaultFieldCss(): any {
		return {
			buttonChip: {
				dirty: 'btn btn-warning',
				default: 'btn btn-primary',
			},
		};
	}

	private applyConfig(value: SearchConfig) {
		this._config = { ...value };
		this._config.fields = this._config.fields.map((f) => {
			if (!f.css) {
				f.css = this.buildDefaultFieldCss();
			} else {
				if (!f.css.buttonChip) {
					f.css.buttonChip = {
						dirty: 'btn btn-warning',
						default: 'btn btn-primary',
					};
				}
			}
			if (!f.caption) {
				f.caption = f.name;
			}
			return f;
		});
	}

	private buildFilterUnits(): void {
		this._filterUnits = this._config.fields.map((f) => {
			const unit = new FilterUnit();
			unit.filterField = f;
			unit.autoEmitChange = this._config.autoRefresh || false;
			return unit;
		});

		let debounceTimeValue = this._config.autoRefreshDebounceTime || 200;
		if (debounceTimeValue > 5000) {
			debounceTimeValue = 5000;
		}
		const observables = this._filterUnits.map((unit) => unit.$actionSource);
		this.sub = merge(...observables)
			.pipe(debounceTime(debounceTimeValue))
			.subscribe(() => {
				this.$actionSource.next();
			});
	}

	public unsubscribe(): void {
		this.sub.unsubscribe();
		this.$actionSource.complete();
	}

	public buildFilterObject(): any {
		let result: any = {};
		const andArray: any[] = [];
		this.filterUnits.forEach((f) => {
			const unitResult = f.getFilterResultObject();
			if (unitResult) {
				andArray.push(unitResult);
			}
		});
		if (andArray.length > 0) {
			result['and'] = andArray;
		} else {
			result = null;
		}
		return result;
	}
}
