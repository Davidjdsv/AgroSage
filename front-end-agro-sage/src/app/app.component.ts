import { Component, OnInit } from '@angular/core'; 
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuController, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonAvatar } from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons';
import { 
    homeOutline, homeSharp, 
    leafOutline, leafSharp, 
    barChartOutline, barChartSharp, 
    settingsOutline, settingsSharp, 
    chatbubbleEllipsesOutline, chatbubbleEllipsesSharp,
    helpCircleOutline, helpCircleSharp, // Nuevo: Ayuda
    documentTextOutline, documentTextSharp, // Nuevo: Legal
    logOutOutline, logOutSharp, // Nuevo: Cerrar Sesión
    // ... (otros iconos) ...
    mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, lockClosedOutline, cardOutline, personCircle, sendOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,// Importar IonAvatar para el perfil
  ],
})
export class AppComponent implements OnInit {
  
  // === Estructura de Páginas Mejorada ===
  public appPages = {
    main: [
      { title: 'Inicio', url: '/app/home', icon: '/app/home' },
      { title: 'Chat con GaIA 🍃', url: '/app/chat-agent', icon: 'chatbubble-ellipses' },
      { title: 'Mis Cultivos', url: '/app/cultivos', icon: 'leaf' },
    ],
    utility: [
      { title: 'Cerrar Sesión', url: '/logout', icon: 'log-out' }, // Añadido ejemplo de cerrar sesión
    ]
  };
  
  public isLoginPage: boolean = true; 

  constructor(
    private router: Router, 
    private menuCtrl: MenuController 
  ) {
    // Registro de todos los iconos, incluyendo los nuevos de utilidades
    addIcons({
        homeOutline, homeSharp, leafOutline, leafSharp, barChartOutline, barChartSharp, settingsOutline, settingsSharp, chatbubbleEllipsesOutline, chatbubbleEllipsesSharp,
        helpCircleOutline, helpCircleSharp, documentTextOutline, documentTextSharp, logOutOutline, logOutSharp, // Nuevos
        mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, lockClosedOutline, cardOutline, personCircle, sendOutline,
    });
  }

  // ... (ngOnInit y getMenuCondition sin cambios) ...
  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.urlAfterRedirects.includes('/login'); 
      if (this.isLoginPage) {
        this.menuCtrl.close();
      }
    });
  }

  getMenuCondition(): boolean | string {
    if (this.isLoginPage) {
      return false;
    }
    return 'md'; 
  }
}