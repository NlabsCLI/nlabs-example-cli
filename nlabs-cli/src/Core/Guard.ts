import fs from 'fs-extra';
import path from 'path';

export const createGuard = (guardName: string, destination: string) => {
  const guardPath = path.join(destination, `${guardName}.guard.ts`);
  const guardContent = `export class ${guardName}Guard {}`;

  fs.writeFileSync(guardPath, guardContent);
  console.log(`Guard ${guardName} created successfully.`);
};
