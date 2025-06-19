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
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminSportsComponent } from './admin/admin-sports/admin-sports.component';
import { AdminEventsComponent } from './admin/admin-events/admin-events.component';
import { AdminEventsResultsComponent } from './admin/admin-events-results/admin-events-results.component';
import { AdminCoachesComponent } from './admin/admin-coaches/admin-coaches.component';
import { AdminTeamsComponent } from './admin/admin-teams/admin-teams.component';
import { AdminPlayersComponent } from './admin/admin-players/admin-players.component';

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
  {
    path: 'admin-main',
    component: AdminMainComponent,
    children: [
      { path: 'admin-sports', component: AdminSportsComponent },
      { path: 'admin-events', component: AdminEventsComponent },
      { path: 'admin-events-results', component: AdminEventsResultsComponent },
      { path: 'admin-coaches', component: AdminCoachesComponent },
      { path: 'admin-teams', component: AdminTeamsComponent },
      { path: 'admin-players', component: AdminPlayersComponent },
    ],
  },
];
