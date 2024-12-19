'use client';

import { useState } from 'react';
import Dropdown from '../dropdown';
import { TreeNode, TreeView } from '../tree-view';

const TreeMenu = () => {
  const menuItems = [
    'Systems',
    'System Code',
    'Code Registration',
    'Properties',
    'Menus',
    'Menu Registration',
  ];
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const treeData: TreeNode[] = [
    {
      id: '1',
      name: 'Root Folder',
      children: [
        {
          id: '1-1',
          name: 'Child Folder 1',
          children: [
            { id: '1-1-1', name: 'File 1-1' },
            { id: '1-1-2', name: 'File 1-2' },
          ],
        },
        {
          id: '1-2',
          name: 'Child Folder 2',
          children: [
            {
              id: '1-2-1',
              name: 'Nested Folder',
              children: [{ id: '1-2-1-1', name: 'File 1-2-1-1' }],
            },
          ],
        },
      ],
    },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-8 w-[48%]">
      <div className="flex flex-col mb-6">
        <Dropdown
          items={menuItems}
          onSelect={(d) => setSelectedMenu(d)}
          selected={selectedMenu}
        />
      </div>

      <div className="flex my-4 space-x-4">
        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
          Expand All
        </button>
        <button className="px-4 py-2 border border-gray-400 text-gray-600 rounded-lg hover:bg-gray-100">
          Collapse All
        </button>
      </div>

      <div className="ml-0">
        <TreeView data={treeData} />
      </div>
    </div>
  );
};

export default TreeMenu;
