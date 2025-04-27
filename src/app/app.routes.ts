import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EventsComponent } from './events/events.component';
import { CoachesComponent } from './coaches/coaches.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: MainPageComponent },
      { path: 'events', component: EventsComponent   },
      { path: 'coaches', component: CoachesComponent  },
      { path: 'about-us', component: AboutUsComponent  },
    ],
  },
];