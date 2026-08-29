import { useState } from "react";
import { useUsers, useUpdateUserRole, useDeleteUser } from "@/hooks/useUsers";
import useAuthStore from "@/features/auth/authStore";
import { Loader, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const ROLES = ["customer", "seller", "admin"];

const UsersTable = () => {
  const { data: users, isLoading, isError } = useUsers();
  const { mutate: updateRole } = useUpdateUserRole();
  const { mutate: deleteUser } = useDeleteUser();
  const currentUser = useAuthStore((state) => state.user);

  const handleRoleChange = (userId, newRole) => {
    updateRole(
      { id: userId, role: newRole },
      {
        onSuccess: () => toast.success("Role updated"),
        onError: (err) => {
          toast.error(err.response?.data?.message || "Failed to update role");
        },
      },
    );
  };

  const handleDelete = (userId) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    deleteUser(userId, {
      onSuccess: () => toast.success("User deleted"),
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to delete user");
      },
    });
  };

  return (
    <div>
      <h1 className="text-lg font-medium text-white mb-4">Users</h1>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div className="grid grid-cols-[1.5fr_1.5fr_1fr_auto] gap-3 px-4 py-3 border-b border-white/10 text-white/50 text-xs uppercase tracking-wide">
          <span>Username</span>
          <span>Email</span>
          <span>Role</span>
          <span className="text-right">Actions</span>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16 text-white/60">
            <Loader className="animate-spin mr-2" size={18} /> Loading users...
          </div>
        )}

        {isError && (
          <p className="text-red-400 text-center py-16">Failed to load users.</p>
        )}

        {!isLoading &&
          !isError &&
          users?.map((user) => {
            const isSelf = user._id === currentUser?._id;

            return (
              <div
                key={user._id}
                className="grid grid-cols-[1.5fr_1.5fr_1fr_auto] gap-3 items-center px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <span className="text-white/90 truncate">
                  {user.username}
                  {isSelf && <span className="text-white/30 text-xs ml-2">(you)</span>}
                </span>
                <span className="text-white/60 truncate">{user.email}</span>

                <select
                  value={user.role}
                  disabled={isSelf}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role} className="bg-neutral-900">
                      {role}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(user._id)}
                    disabled={isSelf}
                    aria-label="Delete user"
                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UsersTable;