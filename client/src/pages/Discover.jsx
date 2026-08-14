import React, { useState } from "react";
import { Search } from "lucide-react";
import { dummyConnectionsData } from "../assets/assets";
import UserCard from "../components/UserCard";

const Discover = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState(dummyConnectionsData);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setUsers([]);
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setUsers(dummyConnectionsData);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Discover People
          </h1>

          <p className="text-slate-500 mt-2">
            Find creators, developers, and friends to connect with.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

            <input
              type="text"
              placeholder="Discover people..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={handleSearch}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition"
            />
          </div>
        </div>

        {/* Users */}
        {
          loading ? (
            <Loading height="60vh" />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {users.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
          )
        }

      </div>
    </div>
  );
};

export default Discover;