import { Inngest } from "inngest";
import User from "../models/User.js";

// Create Inngest Client
export const inngest = new Inngest({
  id: "vibely-app",
});

// Sync New User from Clerk
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    trigger: {
      event: "clerk/user.created",
    },
  },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      image_url,
    } = event.data;

    let username = email_addresses[0].email_address.split("@")[0];

    // Check username availability
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      username = `${username}${Math.floor(Math.random() * 1000)}`;
    }

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      username,
      profile_picture: image_url,
    };

    await User.create(userData);
  }
);

// Sync Updated User from Clerk
const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    trigger: {
      event: "clerk/user.updated",
    },
  },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      image_url,
    } = event.data;

    const updatedUserData = {
      email: email_addresses[0].email_address,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url,
    };

    await User.findByIdAndUpdate(id, updatedUserData);
  }
);

// Sync Deleted User from Clerk
const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
    trigger: {
      event: "clerk/user.deleted",
    },
  },
  async ({ event }) => {
    const { id } = event.data;

    await User.findByIdAndDelete(id);
  }
);

// Export Functions
export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
];