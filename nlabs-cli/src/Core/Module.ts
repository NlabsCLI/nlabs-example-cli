import fs from 'fs-extra';
import path from 'path';

export const createModule = (moduleName: string, destination: string) => {
  const modulePath = path.join(destination, `${moduleName}.module.ts`);
  const moduleContent = `export class ${moduleName}Module {}`;

  fs.writeFileSync(modulePath, moduleContent);
  console.log(`Module ${moduleName} created successfully.`);
};
