export type SidebarMenus = {
  title: string;
  href?: string;
  icon?: string;
  children?: SidebarMenus[];
};

export type TreeViewData = {
  id: string;
  name: string;
  children?: TreeViewData[];
};

export type NewMenu = {
  name: string;
  parentId: string;
};
export type MenuType = {
  id: string;
  name: string;
  parentId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
};

export type MenusFormValues = {
  id: string;
  depth: number;
  name: string;
  parentId: string | null;
  parentName: string | null;
  mustAddAfter?: boolean;
};
