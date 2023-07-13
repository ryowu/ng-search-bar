import { FilterUnit } from './filter-unit';
import { SearchConfig } from './types';

export class SearchBarHelper {
	private _config: SearchConfig;
	private _filterUnits: FilterUnit[] = [];
	constructor() {
		this._config = { autoRefresh: false, fields: [] };
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
	}

	public buildFilterObject(): any {
		const result: any = { and: [] };
		this.filterUnits.forEach((f) => {
			const unitResult = f.getFilterResultObject();
			if (unitResult) {
				result.and.push(unitResult);
			}
		});
		console.log(result);

		return result;
	}
}
