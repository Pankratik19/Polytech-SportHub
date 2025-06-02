import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EventsComponent } from './events/events.component';
import { CoachesComponent } from './coaches/coaches.component';
import { TeamsComponent } from './teams/teams.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SportDetailsComponent } from './sport-details/sport-details.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { TableResultsComponent } from './events/event-results/table/table-results.component';
import { TournamentGridComponent } from './events/event-results/tournament/tournament-grid.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: MainPageComponent },
      { path: 'events', component: EventsComponent },
      { path: 'coaches', component: CoachesComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'sport-details/:id', component: SportDetailsComponent },
      { path: 'event-details/:id', component: EventDetailsComponent },
      { path: 'table-results/:id', component: TableResultsComponent },
      { path: 'tournament-results', component: TournamentGridComponent },
    ],
  },
];
