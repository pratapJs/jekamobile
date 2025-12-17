import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../data/db.json');

// Initialize DB if not exists
const initDB = async () => {
    try {
        await fs.access(DB_PATH);
    } catch {
        const initialData = {
            users: [],
            products: [],
            orders: [],
            services: []
        };
        await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
        await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
    }
};

const readDB = async () => {
    await initDB();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
};

const writeDB = async (data) => {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
};

export const db = {
    get: async (collection) => {
        const data = await readDB();
        return data[collection] || [];
    },
    getById: async (collection, id) => {
        const data = await readDB();
        return (data[collection] || []).find(item => item.id === id);
    },
    create: async (collection, item) => {
        const data = await readDB();
        if (!data[collection]) data[collection] = [];
        const newItem = { id: Date.now().toString(), ...item, createdAt: new Date() };
        data[collection].push(newItem);
        await writeDB(data);
        return newItem;
    },
    update: async (collection, id, updates) => {
        const data = await readDB();
        const list = data[collection] || [];
        const index = list.findIndex(item => item.id === id);
        if (index === -1) return null;
        list[index] = { ...list[index], ...updates, updatedAt: new Date() };
        await writeDB(data);
        return list[index];
    },
    delete: async (collection, id) => {
        const data = await readDB();
        const list = data[collection] || [];
        const index = list.findIndex(item => item.id === id);
        if (index === -1) return false;
        list.splice(index, 1);
        await writeDB(data);
        return true;
    }
};
