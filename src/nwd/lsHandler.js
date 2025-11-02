import fs from 'fs/promises';
import process from 'node:process';

export async function lsHandler() {
    const currentPath = process.cwd();
    const items = await fs.readdir(currentPath, { withFileTypes: true });
    const folders = [];
    const files = [];
    items.forEach((item) => {
      if (item.isDirectory()) {
        folders.push({ Name: item.name, Type: 'directory' });
      } else if (item.isFile()) {
        files.push({ Name: item.name, Type: 'file' });
      }
    })
    folders.sort((a, b) => a.Name.localeCompare(b.Name));
    files.sort((a, b) => a.Name.localeCompare(b.Name));
    const result = [...folders, ...files];
    console.table(result);
}
