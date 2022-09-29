import "zone.js";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { FdWebComponentTabsModule, TabsModule } from "@fundamental-ngx/core/tabs";
import { ButtonWebComponentModule } from "@fundamental-ngx/core/button";
import { Injector, NgModule, Type } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BaseWebComponentModule } from "@fundamental-ngx/core/web-components";
import { ThemeDefinition, ThemingModule, ThemingService } from "@fundamental-ngx/core";
import { RouterModule } from "@angular/router";

const themes: ThemeDefinition[] = [
  {
    id: 'sap_horizon',
    name: 'Morning Horizon',
    theming: {
        themeFontPath: 'dist/sap_horizon_fonts.css',
        themingBasePath: `dist/sap_horizon_dark/css_variables.css`,
        themePath: `dist/fundamental-styles/theming/sap_horizon_dark.css`,
    }
},
{
    id: 'sap_horizon_dark',
    name: 'Evening Horizon',
    theming: {
        themeFontPath: 'dist/sap_horizon_fonts.css',
        themingBasePath: `dist/sap_horizon_dark/css_variables.css`,
        themePath: `dist/fundamental-styles/theming/sap_horizon_dark.css`,
    }
},
]

// import styles from '@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3/css_variables.css';

@NgModule({
  imports: [BrowserModule, RouterModule, ThemingModule.withConfig({
    changeThemeOnQueryParamChange: false,
    customThemes: themes,
    excludeDefaultThemes: true,
    defaultTheme: 'sap_horizon'
  })],
  declarations: [],
  // bootstrap: [AppComponent],
  exports: [TabsModule]
})
export class RootModule extends BaseWebComponentModule {
  declarations: Type<any>[] = [];
  constructor(injector: Injector) {
    super(injector);
    const themingService = injector.get(ThemingService);

    themingService.init();
  }
}

platformBrowserDynamic().bootstrapModule(FdWebComponentTabsModule);
platformBrowserDynamic().bootstrapModule(ButtonWebComponentModule);
platformBrowserDynamic().bootstrapModule(RootModule);

document.querySelectorAll('fdw-tab').forEach((item) => {
  item.addEventListener('opened', () => {
    console.log('Tab has been opened');
  });
});

const button = document.querySelector('fdw-button');

button.addEventListener('click', () => {
  console.log(button.__fdInjector);
});

console.log({RootModule});
