import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSearchBarComponent } from './components/ng-search-bar/container/ng-search-bar.component';
import { DataAreaComponent } from './pages/data-area/data-area.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NgSearchBarComponent,
		DataAreaComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatSliderModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
