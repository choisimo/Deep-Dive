import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { User, Brain, Heart, Shield, Zap } from 'lucide-react';

interface AgentNodeData {
  label: string;
  driver: 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';
  philosophy: string;
  trust: number;
  influence: number;
}

const driverIcons = {
  openness: Brain,
  conscientiousness: Shield,
  extraversion: User,
  agreeableness: Heart,
  neuroticism: Zap,
};

const driverColors = {
  openness: 'text-blue-500',
  conscientiousness: 'text-green-500',
  extraversion: 'text-orange-500',
  agreeableness: 'text-pink-500',
  neuroticism: 'text-purple-500',
};

const getPhilosophyColor = (philosophy: string) => {
  if (philosophy.includes('utilitarian')) return 'border-blue-400';
  if (philosophy.includes('deontological')) return 'border-green-400';
  if (philosophy.includes('existential')) return 'border-yellow-400';
  if (philosophy.includes('communitarian')) return 'border-purple-400';
  return 'border-gray-400';
};

const AgentNode = memo(({ data }: { data: AgentNodeData }) => {
  const DriverIcon = driverIcons[data.driver];
  
  return (
    <div className={`relative bg-white rounded-xl border-2 ${getPhilosophyColor(data.philosophy)} shadow-lg p-3 min-w-[120px] hover:shadow-xl transition-shadow`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-depth-primary !border-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-depth-primary !border-0"
      />
      
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-1">
          <User className="w-4 h-4 text-depth-primary" />
          <span className="text-xs font-medium text-depth-primary">{data.label}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <DriverIcon className={`w-3 h-3 ${driverColors[data.driver]}`} />
          <span className="text-xs text-muted-foreground capitalize">{data.driver}</span>
        </div>
        
        <div className="w-full space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">신뢰도</span>
            <span className="font-medium">{Math.round(data.trust || 0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
          <div 
            className="bg-depth-primary h-1 rounded-full transition-all duration-300"
            style={{ width: `${data.trust || 0}%` }}
          />
          </div>
        </div>
        
        <div className="w-full space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">영향력</span>
            <span className="font-medium">{Math.round(data.influence || 0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
          <div 
            className="bg-depth-secondary h-1 rounded-full transition-all duration-300"
            style={{ width: `${data.influence || 0}%` }}
          />
          </div>
        </div>
      </div>
    </div>
  );
});

AgentNode.displayName = 'AgentNode';

export default AgentNode;