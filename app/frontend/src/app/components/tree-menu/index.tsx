'use client';

import { useEffect, useState } from 'react';
import Dropdown from '../dropdown';
import { NodeApi, TreeApi } from 'react-arborist';
import { TreeViewData } from '../../../../@types/menu';
import TreeView from '../tree-view';
import { useMenuStore } from '@/store/reducers/menu';
import {
  buildTreeView,
  getNodeDepthById,
  getNodeWithChildrenById,
} from '@/shared/utils/tree';

const TreeMenu = () => {
  const { fetchMenus, menus, setDetail } = useMenuStore();
  const [tree, setTree] = useState<TreeApi<TreeViewData> | null | undefined>(
    null,
  );
  const [selectedMenu, setSelectedMenu] = useState<TreeViewData | null>(null);
  const [menuItems, setMenuItems] = useState<TreeViewData[]>([]);
  const [treeViewData, setTreeViewData] = useState<TreeViewData[]>([]);

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      setTreeViewData(
        getNodeWithChildrenById(buildTreeView(menus), selectedMenu.id) ?? [],
      );
    } else {
      setTreeViewData([]);
    }
  }, [selectedMenu?.id, menus]);

  useEffect(() => {
    setMenuItems(
      menus
        .filter((d) => !d.parentId)
        .map((menu) => ({
          id: menu.id,
          name: menu.name,
        })),
    );
  }, [menus]);

  const onNodeSelect = (node: NodeApi<TreeViewData>) => {
    const nodeId = node?.data.id;
    const nodeData = menus.find((m) => m.id === nodeId);
    const parentData = menus.find((m) => m.id === nodeData?.parentId);
    setDetail({
      id: nodeData?.id as string,
      name: nodeData?.name as string,
      parentName: parentData?.name as string,
      depth:
        getNodeDepthById(buildTreeView(menus), nodeData?.id as string) ?? 0,
      parentId: nodeData?.parentId ?? null,
    });
  };

  const onDropdownSelect = (d: TreeViewData | null) => {
    if (d) setSelectedMenu(d);
    else {
      setSelectedMenu(null);
      setDetail({
        id: '',
        name: '',
        parentName: '',
        depth: 0,
        parentId: null,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8 w-[48%]">
      <div className="flex flex-col mb-6">
        <Dropdown<TreeViewData>
          items={menuItems}
          onSelect={(d) => onDropdownSelect(d)}
          selected={selectedMenu?.name}
          renderItem={(item) => item.name}
        />
      </div>

      <div className="flex my-4 space-x-4">
        <button
          onClick={() => tree?.openAll()}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          Expand All
        </button>
        <button
          onClick={() => tree?.closeAll()}
          className="px-4 py-2 border border-gray-400 text-gray-600 rounded-lg hover:bg-gray-100"
        >
          Collapse All
        </button>
      </div>

      <div className="ml-0">
        <TreeView
          data={treeViewData}
          setTreeRef={(t) => setTree(t)}
          onNodeSelect={onNodeSelect}
          onBlueButtonClicked={(node) => {
            setDetail({
              id: '',
              name: '',
              parentName: node.name,
              depth:
                (getNodeDepthById(buildTreeView(menus), node?.id) ?? 0) + 1,
              parentId: node.id,
            });
          }}
        />
      </div>
    </div>
  );
};

export default TreeMenu;
