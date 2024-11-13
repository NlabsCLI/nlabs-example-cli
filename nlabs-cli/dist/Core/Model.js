import fs from 'fs-extra';
import path from 'path';
export const createModel = (modelName, destination) => {
    const modelPath = path.join(destination, `${modelName}.model.ts`);
    const modelContent = `export class ${modelName} { id: string = ""; }`;
    fs.writeFileSync(modelPath, modelContent);
    console.log(`Model ${modelName} created successfully.`);
};
