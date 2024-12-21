import React, { FC, useEffect, useRef, useState } from 'react';
import { NodeApi, NodeRendererProps, Tree, TreeApi } from 'react-arborist';
import { TreeViewData } from '../../../../@types/menu';
import clsx from 'clsx';
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md';
import { FaPlusCircle } from 'react-icons/fa';

type CustomNodeType = {
  onBlueButtonClicked?: (data: TreeViewData) => void;
  onNodeSelect?: (node: NodeApi<TreeViewData>) => void;
};
type TreeViewProps = {
  data: TreeViewData[];
  setTreeRef: (tree: TreeApi<TreeViewData>) => void;
  onNodeSelect?: (node: NodeApi<TreeViewData>) => void;
} & CustomNodeType;

const FolderArrow = ({ node }: { node: NodeApi<TreeViewData> }) => {
  return (
    <span
      className="w-5 flex text-2xl hover:cursor-pointer"
      onClick={() => node.isInternal && node.toggle()}
    >
      {node.isInternal ? (
        <>{node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}</>
      ) : null}
    </span>
  );
};

const Node = ({ node, style, dragHandle }: NodeRendererProps<TreeViewData>) => {
  return (
    <div
      ref={dragHandle}
      style={style}
      className={clsx(
        'relative rounded-lg flex items-center ml-5 h-full',
        node.state,
      )}
    >
      <FolderArrow node={node} />
      <span className={'flex overflow-hidden text-ellipsis'}>
        {node.data.name}
      </span>
    </div>
  );
};

const NodeWrapper = ({
  onBlueButtonClicked,
  onNodeSelect,
  ...nodeProps
}: NodeRendererProps<TreeViewData> & CustomNodeType) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.addEventListener('mouseover', (e) => setHover(true));
      nodeRef.current.addEventListener('mouseleave', (e) => setHover(false));
    }
  }, [nodeRef]);
  return (
    <div className="flex items-center" ref={nodeRef}>
      <div onClick={() => onNodeSelect && onNodeSelect(nodeProps.node)}>
        <Node {...nodeProps} />
      </div>
      {hover && (
        <FaPlusCircle
          className={`fill-[#253BFF] ml-2 hover:cursor-pointer`}
          onClick={() => {
            // should add new node under this node
            onBlueButtonClicked && onBlueButtonClicked(nodeProps.node.data);
          }}
        />
      )}
    </div>
  );
};

const TreeView: FC<TreeViewProps> = ({
  data,
  setTreeRef,
  onNodeSelect,
  onBlueButtonClicked,
}) => {
  const noDataCondition = data.length === 0 || !data;
  const [tree, setTree] = useState<TreeApi<TreeViewData> | null | undefined>(
    null,
  );

  useEffect(() => {
    setTreeRef && setTreeRef(tree as TreeApi<TreeViewData>);
  }, [tree]);

  if (noDataCondition) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <span className="text-2xl text-gray-400">No data available</span>
      </div>
    );
  }

  return (
    <Tree<TreeViewData>
      data={data}
      ref={(t) => setTree(t)}
      disableDrag
      disableDrop
      disableEdit
    >
      {(nodeProps: any) => (
        <NodeWrapper
          {...nodeProps}
          onBlueButtonClicked={onBlueButtonClicked}
          onNodeSelect={onNodeSelect}
        />
      )}
    </Tree>
  );
};

export default TreeView;
