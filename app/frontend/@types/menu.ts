export type SidebarMenus = {
  title: string;
  href?: string;
  icon?: string;
  children?: SidebarMenus[];
};

export interface TreeViewData {
  id: number;
  name: string;
  children?: TreeViewData[];
}
