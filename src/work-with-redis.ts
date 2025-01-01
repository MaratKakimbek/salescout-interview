// Write a script that:
// 1. Connects to Redis.
// 2. Saves the keys with their values.
// 3. Reads and outputs values for a given key.

// Use redis library

import { createClient } from 'redis';

// Create a client to interact with Redis
const redisClient = createClient({
    url: 'redis://localhost:6379', // Update with your Redis server's URL if different
});

// Connect to Redis
async function connectToRedis() {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
}

// Set a key-value pair in Redis
async function setKeyValue(key: string, value: string) {
    try {
        await redisClient.set(key, value);
        console.log(`Key "${key}" set with value: "${value}"`);
    } catch (error) {
        console.error('Error setting key-value pair:', error);
    }
}

// Get the value of a key from Redis
async function getKeyValue(key: string): Promise<string | null> {
    try {
        const value = await redisClient.get(key);
        return value;
    } catch (error) {
        console.error('Error getting value for key:', error);
        return null;
    }
}

// Main function to manage Redis operations
async function manageRedis(): Promise<void> {
    await connectToRedis();

    // Set some keys and values
    await setKeyValue('name', 'John Doe');
    await setKeyValue('age', '30');
    await setKeyValue('city', 'New York');

    // Get values for a specific key
    const name = await getKeyValue('name');
    const age = await getKeyValue('age');
    const city = await getKeyValue('city');

    // Output the values
    console.log(`name: ${name}`);
    console.log(`age: ${age}`);
    console.log(`city: ${city}`);

    // Disconnect after operations
    await redisClient.quit();
}

// Example usage
manageRedis().then(() => {
    console.log('Redis operations completed.');
}).catch((error) => {
    console.error('Error in Redis operations:', error);
});

module.exports = { manageRedis };
