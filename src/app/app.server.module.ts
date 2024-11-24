import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bootstrapApplication } from '@angular/platform-browser';  // Importar bootstrapApplication
import { AppComponent } from './app.component';  // Asegúrate de que AppComponent es un componente independiente
import { config } from './app.config.server';  // Configuración del servidor

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Sirve archivos estáticos
app.use(express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
  redirect: false,
}));

// Maneja todas las demás solicitudes para renderizar la aplicación Angular
app.use('/**', (req, res, next) => {
  angularApp.handle(req)
    .then((response) => response ? writeResponseToNodeResponse(response, res) : next())
    .catch(next);
});

// Arrancar la aplicación Angular con bootstrapApplication en vez de un NgModule
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  bootstrapApplication(AppComponent, config)  // Usamos bootstrapApplication() para arrancar la app.
    .catch((err) => console.error(err));

  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// El manejador de solicitudes que usa Angular CLI (dev-server y durante la construcción)
export const reqHandler = createNodeRequestHandler(app);

