import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSearchBarComponent } from './components/ng-search-bar/container/ng-search-bar.component';

@NgModule({
	declarations: [AppComponent, HomeComponent, NgSearchBarComponent],
	imports: [BrowserModule, AppRoutingModule, NgbModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
