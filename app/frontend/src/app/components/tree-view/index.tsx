import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

export type TreeNode = {
  id: string;
  name: string;
  children?: TreeNode[];
};

export const TreeView: React.FC<{ data: TreeNode[] }> = ({ data }) => {
  return (
    <div className="flex flex-col">
      {data.map((node) => (
        <TreeNodeComponent key={node.id} node={node} />
      ))}
    </div>
  );
};

const TreeNodeComponent: React.FC<{ node: TreeNode }> = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const chevronStyle = 'w-4 h-4 text-gray-700';

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 focus:outline-none hover:cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsExpanded(!isExpanded);
          }
        }}
        role="treeitem"
        tabIndex={0}
        aria-selected={isExpanded}
        aria-expanded={isExpanded}
      >
        {hasChildren ? (
          <button className="focus:outline-none">
            {isExpanded ? (
              <FaChevronDown className={chevronStyle} />
            ) : (
              <FaChevronRight className={chevronStyle} />
            )}
          </button>
        ) : (
          <div className="w-4" /> // Placeholder for alignment
        )}
        <div className="flex items-center">
          <span className="ml-2 text-gray-700">{node.name}</span>
        </div>
      </div>

      {/* Connecting lines */}
      {hasChildren && <div className="absolute top-0 left-2 h-full" />}

      {/* Children */}
      {isExpanded && hasChildren && (
        <div className="pl-2">
          <TreeView data={node.children!} />
        </div>
      )}
    </div>
  );
};

// Example Data
