import { MenuType, TreeViewData } from '../../../@types/menu';

export const buildTreeView = (data: MenuType[]): TreeViewData[] => {
  const idToNodeMap: { [key: string]: TreeViewData } = {};
  const roots: TreeViewData[] = [];

  // Create a map of all nodes by id
  data.forEach((item) => {
    idToNodeMap[item.id] = { id: item.id, name: item.name, children: [] };
  });

  // Build the tree structure
  data.forEach((item) => {
    const node = idToNodeMap[item.id];
    if (item.parentId) {
      const parent = idToNodeMap[item.parentId];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  // delete children property if empty
  const deleteEmptyChildren = (node: TreeViewData) => {
    if (node.children?.length === 0) {
      delete node.children;
    } else {
      node.children?.forEach(deleteEmptyChildren);
    }
  };
  roots.forEach(deleteEmptyChildren);
  return roots;
};

export const getNodeWithChildrenById = (
  tree: TreeViewData[],
  id: string,
): TreeViewData[] | null => {
  for (const node of tree) {
    if (node.id === id) {
      return [node]; // Return the node itself (including its children)
    }
    if (node.children && node.children.length > 0) {
      const found = getNodeWithChildrenById(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null; // Return null if no node is found with the given id
};

export const getNodeDepthById = (
  tree: TreeViewData[],
  id: string,
  currentDepth: number = 0,
): number | null => {
  for (const node of tree) {
    if (node.id === id) {
      return currentDepth;
    }
    if (node.children && node.children.length > 0) {
      const depth = getNodeDepthById(node.children, id, currentDepth + 1);
      if (depth !== null) {
        return depth;
      }
    }
  }
  return null;
};
