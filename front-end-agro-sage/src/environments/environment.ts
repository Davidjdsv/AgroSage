// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Base anterior usada en el proyecto (se mantiene por compatibilidad)
  urlLocal: "http://172.18.0.148:8080",
  // Base de la API (ajusta si tu backend corre en otro puerto/host)
  apiBase: "http://172.18.0.148:8080",
  // Endpoints específicos
  apiAgricultores: "http://172.18.0.148:8080/AgroSage/Agricultores",
};

// urlLocal: "http://localhost:3306",
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
