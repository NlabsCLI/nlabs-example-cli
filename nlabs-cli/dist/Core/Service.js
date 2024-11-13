import fs from 'fs-extra';
import path from 'path';
export const createService = (serviceName, destination) => {
    const servicePath = path.join(destination, `${serviceName}.service.ts`);
    const serviceContent = `export class ${serviceName}Service {}`;
    fs.writeFileSync(servicePath, serviceContent);
    console.log(`Service ${serviceName} created successfully.`);
};
