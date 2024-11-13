import fs from 'fs-extra';
import path from 'path';

// Bileşen oluşturma fonksiyonu
export const createComponent = (componentName: string, destination: string) => {
  const componentDir = path.join(destination, componentName);
  fs.mkdirSync(componentDir, { recursive: true });

  const componentTsContent = `// src/app/${componentName}/${componentName}.component.ts
import { Component } from '../Core/Component';

@Component({
  selector: 'app-${componentName.toLowerCase()}',
  templateUrl: './${componentName}.component.html',
  styleUrl: './${componentName}.component.css'
})
export class ${componentName}Component {
  title = '${componentName} works!';
  render() {
    console.log(\`${componentName} component is rendering\`);
  }
}`;

  const componentHtmlContent = `<p>${componentName} works!</p>`;
  const componentCssContent = `/* Styles for ${componentName} component */`;

  fs.writeFileSync(path.join(componentDir, `${componentName}.component.ts`), componentTsContent);
  fs.writeFileSync(path.join(componentDir, `${componentName}.component.html`), componentHtmlContent);
  fs.writeFileSync(path.join(componentDir, `${componentName}.component.css`), componentCssContent);

  console.log(`Component ${componentName} created successfully at ${componentDir}.`);
};

// Özelleştirilmiş Component dekoratörü
export function Component(metadata: { selector: string; templateUrl: string; styleUrl?: string }) {
  return function (constructor: Function) {
    // Dekoratörün sınıfa metadata'yı eklemesini sağlıyoruz
    constructor.prototype.selector = metadata.selector;
    constructor.prototype.templateUrl = metadata.templateUrl;
    constructor.prototype.styleUrl = metadata.styleUrl;

    // render işlevini sınıfa ekliyoruz
    constructor.prototype.render = function () {
      console.log(`Rendering component with selector: ${metadata.selector}`);
    };
  };
}
