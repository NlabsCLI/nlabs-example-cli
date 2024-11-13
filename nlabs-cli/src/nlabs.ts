import fs from 'fs-extra';
import path from 'path';
import { Command } from 'commander';
import chalk from 'chalk';
import { createComponent } from './Core/Component.js';
import { createService } from './Core/Service.js';
import { createModule } from './Core/Module.js';
import { createModel } from './Core/Model.js';
import { createGuard } from './Core/Guard.js';

const program = new Command();
const baseAppPath = path.join(process.cwd(), 'src', 'app');

// Proje başlatma komutu
program
  .command('n <projectName>')
  .description('Yeni bir proje oluştur')
  .alias('new')
  .action((projectName: string) => {
    const projectPath = path.join(process.cwd(), projectName);
    const appPath = path.join(projectPath, 'src', 'app');

    if (fs.existsSync(projectPath)) {
      console.log(chalk.red(`Proje zaten mevcut: ${projectName}`));
      return;
    }

    fs.mkdirSync(appPath, { recursive: true });

    // index.html ve main.ts oluşturma
    const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
</head>
<body>
  <app-root></app-root>
</body>
</html>`;
    const mainTsContent = `import { AppComponent } from './app/app.component.js';

const app = new AppComponent();
app.render();`;

    fs.writeFileSync(path.join(projectPath, 'src', 'index.html'), indexHtmlContent);
    fs.writeFileSync(path.join(projectPath, 'src', 'main.ts'), mainTsContent);

    // app.component.ts, app.config.ts, app.routes.ts gibi ana dosyalar
    const appComponentContent = `import { Component } from '../Core/Component.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '${projectName}';
  render() {
    console.log('Rendering app component');
  }
}`;
    const appHtmlContent = `<h1>{{ title }}</h1>`;
    const appCssContent = `/* Styles for app component */`;
    const appConfigContent = `export const appConfig = {};`;
    const appRoutesContent = `export const routes = [];`;

    fs.writeFileSync(path.join(appPath, 'app.component.ts'), appComponentContent);
    fs.writeFileSync(path.join(appPath, 'app.component.html'), appHtmlContent);
    fs.writeFileSync(path.join(appPath, 'app.component.css'), appCssContent);
    fs.writeFileSync(path.join(appPath, 'app.config.ts'), appConfigContent);
    fs.writeFileSync(path.join(appPath, 'app.routes.ts'), appRoutesContent);

    console.log(chalk.green(`Proje oluşturuldu: ${projectName}`));
  });

// Generate komutları
program
  .command('g <type> <name>')
  .description('Yeni bir yapı (component, service, module, guard, model) oluştur')
  .alias('generate')
  .action((type: string, name: string) => {
    const targetPath = path.join(baseAppPath, name);

    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    switch (type) {
      case 'component':
      case 'c':
        createComponent(name, targetPath);
        break;
      case 'service':
      case 's':
        createService(name, targetPath);
        break;
      case 'module':
      case 'm':
        createModule(name, targetPath);
        break;
      case 'model':
      case 'mdl':
        createModel(name, targetPath);
        break;
      case 'guard':
      case 'g':
        createGuard(name, targetPath);
        break;
      default:
        console.log(chalk.red(`Bilinmeyen tür: ${type}. Geçerli türler: component, service, module, guard, model.`));
    }
  });

program.parse(process.argv);
