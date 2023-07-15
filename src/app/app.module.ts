import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSearchBarComponent } from './components/ng-search-bar/container/ng-search-bar.component';
import { DataAreaComponent } from './pages/data-area/data-area.component';

@NgModule({
	declarations: [AppComponent, HomeComponent, NgSearchBarComponent, DataAreaComponent],
	imports: [BrowserModule, AppRoutingModule, NgbModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
