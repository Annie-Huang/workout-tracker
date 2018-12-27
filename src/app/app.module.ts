import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Third party imports
import { NgxLoadingModule } from 'ngx-loading';
import {NgbDateAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';

// App imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { EntryEditorComponent } from './entry-editor/entry-editor.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import {WorkoutsApiService} from './services/workouts-api.service';
import {DateStringAdapterService} from './services/date-string-adapter.service';
import { PerformanceTargetsModalComponent } from './performance-targets-modal/performance-targets-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkoutsComponent,
    EntryEditorComponent,
    NavMenuComponent,
    PerformanceTargetsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    WorkoutsApiService,
    { provide: NgbDateAdapter, useClass: DateStringAdapterService}
  ],
  entryComponents: [
    PerformanceTargetsModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
