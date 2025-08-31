import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import AgentNode from './nodes/AgentNode';
import CommunityNode from './nodes/CommunityNode';
import type { Agent } from '@/types/simulation';

interface AgentNetworkFlowProps {
  agents: Agent[];
  scenario: string;
  isRunning: boolean;
  onAgentSelect: (agentId: string) => void;
}

const nodeTypes = {
  agent: AgentNode,
  community: CommunityNode,
};

const getConnectionColor = (scenario: string) => {
  const colors = {
    empathic: 'hsl(var(--depth-primary))',
    optimized: 'hsl(var(--depth-secondary))',
    sovereign: 'hsl(var(--depth-tertiary))',
    duty: 'hsl(var(--depth-quaternary))'
  };
  return colors[scenario as keyof typeof colors] || 'hsl(var(--primary))';
};

const AgentNetworkFlow = ({ agents, scenario, isRunning, onAgentSelect }: AgentNetworkFlowProps) => {
  // Convert agents to React Flow nodes
  const convertAgentsToNodes = useCallback((agentList: Agent[]): Node[] => {
    const getDominantTrait = (agent: Agent) => {
      const traits = agent.updm.personality_traits;
      const scores = {
        openness: traits.openness.score,
        conscientiousness: traits.conscientiousness.score,
        extraversion: traits.extraversion.score,
        agreeableness: traits.agreeableness.score,
        neuroticism: traits.neuroticism.score
      };
      const dominant = Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b);
      return dominant[0] as 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';
    };

    const getTrustScore = (agent: Agent) => {
      const traits = agent.updm.personality_traits;
      return (traits.agreeableness.score + traits.conscientiousness.score) * 50;
    };

    const getInfluenceScore = (agent: Agent) => {
      const traits = agent.updm.personality_traits;
      return (traits.extraversion.score + (1 - traits.neuroticism.score)) * 50;
    };

    return agentList.map(agent => ({
      id: agent.id,
      type: agent.type === 'community' ? 'community' : 'agent',
      position: agent.position,
      data: {
        id: agent.id,
        type: agent.type,
        label: agent.id,
        status: agent.status,
        philosophy: agent.philosophical_alignment,
        connections: agent.connections.length,
        resources: agent.resources,
        scenario,
        isRunning,
        onSelect: () => onAgentSelect(agent.id),
        driver: getDominantTrait(agent),
        trust: getTrustScore(agent),
        influence: getInfluenceScore(agent),
      }
    }));
  }, [scenario, isRunning, onAgentSelect]);

  // Convert agent connections to React Flow edges
  const convertConnectionsToEdges = useCallback((agentList: Agent[]): Edge[] => {
    const edges: Edge[] = [];
    const processedConnections = new Set<string>();

    agentList.forEach(agent => {
      agent.connections.forEach(targetId => {
        const connectionKey = [agent.id, targetId].sort().join('-');
        if (!processedConnections.has(connectionKey)) {
          edges.push({
            id: connectionKey,
            source: agent.id,
            target: targetId,
            type: 'smoothstep',
            animated: isRunning,
            style: {
              stroke: getConnectionColor(scenario),
              strokeWidth: 2,
            }
          });
          processedConnections.add(connectionKey);
        }
      });
    });

    return edges;
  }, [scenario, isRunning]);

  const [nodes, setNodes, onNodesChange] = useNodesState(convertAgentsToNodes(agents));
  const [edges, setEdges, onEdgesChange] = useEdgesState(convertConnectionsToEdges(agents));

  // Update nodes and edges when agents change
  useEffect(() => {
    setNodes(convertAgentsToNodes(agents));
    setEdges(convertConnectionsToEdges(agents));
  }, [agents, convertAgentsToNodes, convertConnectionsToEdges, setNodes, setEdges]);

  // 시뮬레이션 실행 중 노드 상태 업데이트
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setNodes(prevNodes =>
        prevNodes.map(node => {
          if (node.type === 'agent') {
            return {
              ...node,
              data: {
                ...node.data,
                trust: Math.max(0, Math.min(100, (typeof node.data.trust === 'number' ? node.data.trust : 0) + (Math.random() - 0.5) * 5)),
                influence: Math.max(0, Math.min(100, (typeof node.data.influence === 'number' ? node.data.influence : 0) + (Math.random() - 0.5) * 3)),
              }
            };
          }
          return node;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, setNodes]);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--depth-primary))', strokeWidth: 2 }
    }, eds));
  }, [setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === 'agent') {
      onAgentSelect(node.id);
    }
  }, [onAgentSelect]);

  return (
    <div className="h-[600px] w-full bg-gradient-card rounded-2xl border shadow-card-custom overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="top-right"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#e5e7eb" />
        <Controls />
        <MiniMap 
          zoomable 
          pannable 
          className="!bg-white/80 !border-depth-primary/20"
        />
      </ReactFlow>
    </div>
  );
};

export default AgentNetworkFlow;