import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Users } from 'lucide-react';

interface CommunityNodeData {
  label: string;
  color: string;
  memberCount: number;
}

const CommunityNode = memo(({ data }: { data: CommunityNodeData }) => {
  return (
    <div className={`relative bg-gradient-card rounded-2xl border-2 border-${data.color}/30 shadow-depth p-6 min-w-[160px]`}>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-depth-primary !border-0"
      />
      
      <div className="flex flex-col items-center space-y-3">
        <div className={`w-12 h-12 rounded-xl bg-${data.color}/10 flex items-center justify-center`}>
          <Users className={`w-6 h-6 text-${data.color}`} />
        </div>
        
        <div className="text-center">
          <h3 className="font-semibold text-depth-primary text-sm mb-1">
            {data.label}
          </h3>
          <p className="text-xs text-muted-foreground">
            구성원 {data.memberCount}명
          </p>
        </div>
        
        <div className={`w-full h-1 bg-${data.color}/20 rounded-full`}>
          <div className={`h-full bg-${data.color} rounded-full`} style={{ width: '75%' }} />
        </div>
      </div>
    </div>
  );
});

CommunityNode.displayName = 'CommunityNode';

export default CommunityNode;