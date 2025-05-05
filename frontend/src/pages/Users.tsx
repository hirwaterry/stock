'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ColumnDef } from '@tanstack/react-table';

import Modal from 'react-modal';
import AddUser from '../components/AddUser';
import { Add01Icon, Cancel01Icon } from 'hugeicons-react';
import { DataTable } from '@/components/Table';

interface User {
  _id: string;
  username: string;
}

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <button
        className="flex items-center space-x-1 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Username</span>
        {column.getIsSorted() === 'asc' && <span>↑</span>}
        {column.getIsSorted() === 'desc' && <span>↓</span>}
      </button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue('username')}</div>,
  },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/users', {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-gray-300 px-3 w-[40vh] py-5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/80"
          />
          <button
            className="px-4 w-40 font-light flex gap-2 py-5 rounded-xl bg-gray-200 text-black"
            onClick={() => setIsModalOpen(true)}
          >
            <Add01Icon /> Add New
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
        </div>
      ) : (
        <div className="rounded-lg bg-white shadow-sm">
          <DataTable
            columns={columns}
            data={filteredUsers}
            onRowSelectionChange={setSelectedRows}
          />
          <div className="px-6 py-4">
            <p className="text-sm text-gray-600">
              {Object.keys(selectedRows).length} row(s) selected
            </p>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add User Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-gray-400/40 backdrop-blur-sm bg-opacity-50"
      >
        <div className="bg-white border relative p-6 rounded-xl shadow-lg">
          <AddUser />
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 absolute right-2 top-0 px-4 py-2 rounded text-black"
          >
            <Cancel01Icon />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Users;