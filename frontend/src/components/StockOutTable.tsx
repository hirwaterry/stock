'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Add01Icon, Cancel01Icon } from 'hugeicons-react';
import Modal from 'react-modal';
import StockOutForm from '@/pages/StockOutForm';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './Table';

// Define the StockInRecord type based on API response
interface StockOutRecord {
  _id: string;
  product?: { name: string };
  quantity: number;
  date: string;
}

// Define columns for DataTable (with checkbox and sorting)
const columns: ColumnDef<StockOutRecord>[] = [
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
    accessorKey: 'product.name',
    header: ({ column }) => (
      <button
        className="flex items-center space-x-1 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Item</span>
        {column.getIsSorted() === 'asc' && <span>↑</span>}
        {column.getIsSorted() === 'desc' && <span>↓</span>}
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.original.product?.name || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <button
        className="flex items-center space-x-1 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Quantity</span>
        {column.getIsSorted() === 'asc' && <span>↑</span>}
        {column.getIsSorted() === 'desc' && <span>↓</span>}
      </button>
    ),
    cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <button
        className="flex items-center space-x-1 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Date</span>
        {column.getIsSorted() === 'asc' && <span>↑</span>}
        {column.getIsSorted() === 'desc' && <span>↓</span>}
      </button>
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue('date')).toLocaleString()}</div>
    ),
  },
];

function StockOutTable() {
  const [stockOutRecords, setStockOutRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  

  useEffect(() => {
    const fetchStockOut = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/stock/out', {
          withCredentials: true,
        });
        setStockOutRecords(res.data);
      } catch (err) {
        setError('Failed to fetch stock-out history');
      } finally {
        setLoading(false);
      }
    };

    fetchStockOut();
  }, []);

  // Filter records based on search input
  const filteredRecords = stockOutRecords.filter((record) =>
    record.product?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Stock In History</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-gray-300 px-3 w-[40vh] py-5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/80"
          />
          <button
            className="px-4 w-40 font-light flex gap-2 py-5 rounded-xl bg-gray-200 text-black hover:bg-gray-300"
            onClick={() => setIsModalOpen(true)}
          >
            <Add01Icon/> Stock In
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
        </div>
      ) : (
        <div className="rounded-lg bg-white shadow-sm">
          <DataTable
            columns={columns}
            data={filteredRecords}
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
        className="fixed inset-0 flex items-center justify-center z-50" // Tailwind classes for modal
        overlayClassName="fixed inset-0 bg-gray-400/40 backdrop-blur-sm bg-opacity-50" // Tailwind classes for overlay
      >
        <div className="bg-white border relative p-6 rounded-xl shadow-lg">
          <StockOutForm />
          <button onClick={() => setIsModalOpen(false)} className="mt-4 absolute right-2 top-0 px-4 py-2 rounded text-black"><Cancel01Icon/></button>
        </div>
      </Modal>
    </div>
  );
}

export default StockOutTable;
