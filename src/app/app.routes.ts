import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EventsComponent } from './events/events.component';
import { CoachesComponent } from './coaches/coaches.component';
import { TeamsComponent } from './teams/teams.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SportDetailsComponent } from './sport-details/sport-details.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventResultsComponent } from './events/event-results/event-results.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: MainPageComponent },
      { path: 'events', component: EventsComponent },
      { path: 'coaches', component: CoachesComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'sport-details', component: SportDetailsComponent },
      { path: 'event-details', component: EventDetailsComponent },
      { path: 'event-results', component: EventResultsComponent },
    ],
  },
];
