import { Inngest } from "inngest";
import User from "../models/User.js"; // Make sure to import your User model!
import connectDB from "../configs/db.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "vibely-app" });

// Inngest function to save user data to the database
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    // Move event inside the first object!
    triggers: [{ event: "clerk/user.created" }], 
  },
  async ({ event }) => {
    await connectDB();
    // Destructure event from argument object
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    
    // Note: Clerk payload property name is email_addresses (two 's's, not 'addressess')
    const primaryEmail = email_addresses?.[0]?.email_address || "";
    let username = primaryEmail.split("@")[0];

    // Check availability of username
    const user = await User.findOne({ username });
    if (user) {
      username = username + Math.floor(Math.random() * 1000);
    }

    const userData = {
      _id: id,
      email: primaryEmail,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      username,
      profile_picture: image_url,
    };

    await User.create(userData);
  }
);

// Inngest function to update user data in database
const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    await connectDB();
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const primaryEmail = email_addresses?.[0]?.email_address || "";

    const updateUserData = {
      email: primaryEmail,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url,
    };

    await User.findByIdAndUpdate(id, updateUserData);
  }
);

// Inngest function to delete user data in database
const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// Export Inngest functions
export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
];