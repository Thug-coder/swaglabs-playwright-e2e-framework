import { get } from "node:http";

const getEnv = (name: string): string => {
    const value = process.env[name];

    if (!value) {
        throw new Error(
            `Missing environment variable: ${name}`
        );
    }

    return value;
};

export const env = {
    baseUrl: getEnv('BASE_URL'),
    inventoryURL: getEnv('INVENTORY_URL'),

    credentials: {
        standardUser: getEnv('STANDARD_USER'),
        standardPassword: getEnv('STANDARD_PASSWORD'),
        lockedUser: getEnv('LOCKED_USER'),
    },
};