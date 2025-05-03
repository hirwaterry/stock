import { useEffect, useState } from 'react';
import axios from 'axios';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/Table';


// Define the Item type based on API response
interface Item {
  _id: string;
  name: string;
  category: string;
  remaining: number;
}

// Define columns for DataTable (with checkbox and sorting)
export const columns: ColumnDef<Item>[] = [
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
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <button
        className="flex items-center space-x-1 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Name</span>
        {column.getIsSorted() === 'asc' && <span>↑</span>}
        {column.getIsSorted() === 'desc' && <span>↓</span>}
      </button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <button
        className="flex items-center space-x-1 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Category</span>
        {column.getIsSorted() === 'asc' && <span>↑</span>}
        {column.getIsSorted() === 'desc' && <span>↓</span>}
      </button>
    ),
    cell: ({ row }) => (
      <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
        {row.getValue('category')}
      </span>
    ),
  },
  {
    accessorKey: 'remaining',
    header: ({ column }) => (
      <button
        className="flex items-center space-x-1 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Remaining</span>
        {column.getIsSorted() === 'asc' && <span>↑</span>}
        {column.getIsSorted() === 'desc' && <span>↓</span>}
      </button>
    ),
    cell: ({ row }) => (
      <div className={row.getValue('remaining') < 0 ? 'text-red-500' : ''}>
        {row.getValue('remaining')}
      </div>
    ),
  },
];

function RemainingStock() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchRemainingStock = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/rem', { withCredentials: true });
        setItems(res.data);
      } catch (err) {
        setError('Failed to fetch remaining stock');
        console.error('Failed to fetch remaining stock:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRemainingStock();
  }, []);

  return (
    <div className="mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Remaining Items in Stock</h2>
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
            data={items}
            onRowSelectionChange={setSelectedRows}
          />
          {items.length === 0 ? (
            <p className="px-6 py-4 text-sm text-gray-600">No stock information available.</p>
          ) : (
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600">
                {Object.keys(selectedRows).length} row(s) selected
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RemainingStock;