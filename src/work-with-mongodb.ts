// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library

import mongoose, { Schema, model, Document } from 'mongoose';

type DuplicatedUsers = {
    email: string;
};

interface IUser extends Document {
    name: string;
    email: string;
}

// Connect to MongoDB
async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/usersDb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Define the User Schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

// Create the User model
const User = model<IUser>('User', userSchema);

// Add new users
async function addUser(name: string, email: string) {
    try {
        const newUser = new User({ name, email });
        await newUser.save();
        console.log(`User ${name} added successfully`);
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Find users with duplicate emails
async function findDuplicateEmails(): Promise<DuplicatedUsers[]> {
    const duplicates = await User.aggregate([
        { $group: { _id: "$email", count: { $sum: 1 } } },
        { $match: { count: { $gt: 1 } } },
        { $project: { email: "$_id", _id: 0 } }
    ]);

    return duplicates;
}

// Main function to manage users
async function manageUsers(): Promise<DuplicatedUsers[]> {
    await connectToDB();

    // Example: Adding new users
    await addUser('John Doe', 'john@example.com');
    await addUser('Jane Smith', 'jane@example.com');
    await addUser('John Doe', 'john@example.com'); // Adding duplicate email

    // Find duplicate emails
    const duplicates = await findDuplicateEmails();

    return duplicates;
}

// Example usage
manageUsers().then(duplicates => {
    if (duplicates.length > 0) {
        console.log('Duplicate users found:', duplicates);
    } else {
        console.log('No duplicate users found');
    }
});

module.exports = { manageUsers };
