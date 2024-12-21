import { FC } from 'react';
import { useMenuStore } from '@/store/reducers/menu';
import toast from 'react-hot-toast';

const MenusForm: FC = () => {
  const { createMenu, putMenu, detail, setDetail, deleteMenu } = useMenuStore();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (detail.id) {
      putMenu(detail).then(() => {
        setDetail({
          id: '',
          name: '',
          parentId: null,
          parentName: '',
          depth: 0,
        });
        toast.success('Menu updated!');
      });
      return;
    }
    createMenu(detail).then(() => {
      setDetail({ id: '', name: '', parentId: null, parentName: '', depth: 0 });
      toast.success('Menu created!');
    });
  };
  return (
    <form
      className="bg-white rounded-lg shadow p-8 space-y-4 w-[48%]"
      onSubmit={onSubmit}
    >
      <div>
        <label htmlFor="menu-id" className="block text-gray-600 mb-1">
          Menu ID
        </label>
        <input
          id="menu-id"
          type="text"
          className="w-full border rounded-lg p-2 text-gray-600"
          value={detail.id}
          disabled
        />
      </div>
      <div>
        <label htmlFor="menu-depth" className="block text-gray-600 mb-1">
          Depth
        </label>
        <input
          id="menu-depth"
          type="number"
          className="w-full border rounded-lg p-2 text-gray-600"
          value={detail.depth}
          disabled
        />
      </div>
      <div>
        <label htmlFor="parent-data" className="block text-gray-600 mb-1">
          Parent Data
        </label>
        <input
          id="parent-data"
          type="text"
          className="w-full border rounded-lg p-2 text-gray-600"
          value={detail.parentName ?? ''}
          disabled
        />
      </div>
      <div>
        <label htmlFor="menu-name" className="block text-gray-600 mb-1">
          Name
        </label>
        <input
          id="menu-name"
          type="text"
          className="w-full border rounded-lg p-2 text-gray-600"
          value={detail.name}
          onChange={(e) => {
            setDetail({ ...detail, name: e.target.value });
          }}
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {detail.id ? 'Save' : 'Create'}
        </button>
        <button
          type="button"
          className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
          onClick={() =>
            deleteMenu(detail.id).then(() => {
              setDetail({
                id: '',
                name: '',
                parentId: null,
                parentName: '',
                depth: 0,
              });
              toast.success('Menu deleted!');
            })
          }
          disabled={!detail.id}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default MenusForm;
