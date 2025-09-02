import { promises as fs } from 'fs';
import path from 'path';

async function updateSchema() {
  const filePath = path.resolve(process.cwd(), 'drizzle/schema.ts');
  try {
    const content = await fs.readFile(filePath, 'utf-8');

    // This regex finds lines like `fieldName: type()` for the specified types
    // and captures `fieldName` and the `type`.
    const regex = /([a-zA-Z0-9_]+):\s*(varchar|text|boolean|integer|json|jsonb)\(\)/g;
    
    let matchCount = 0;
    const newContent = content.replace(regex, (match, fieldName, type) => {
        matchCount++;
        return `${fieldName}: ${type}('${fieldName}')`;
    });

    if (matchCount > 0) {
      await fs.writeFile(filePath, newContent, 'utf-8');
      console.log(`Successfully updated ${matchCount} fields in ${filePath}`);
    } else {
      console.log('No fields to update in the schema file.');
    }
  } catch (error) {
    console.error('Error updating schema file:', error);
  }
}

updateSchema();