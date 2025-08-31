// Core data types matching the technical specification

export interface Variable {
  id: string;
  name: string;
  category: 'technology' | 'resource' | 'psychology' | 'philosophy';
  description: string;
  created_at: string;
}

export interface Parameter {
  id: string;
  variable_id: string;
  effective_date: string;
  metrics: Record<string, any>; // JSONB equivalent
  source: string;
  created_at: string;
}

// Technology Vector Metrics
export interface TechnologyMetrics {
  trl: number; // 1-9
  accessibility: number; // 0.0-1.0
  social_impact: number; // 0.0-1.0
  resource_dependency: {
    energy?: number;
    compute?: number;
    data?: number;
  };
}

// Psychological Driver Metrics
export interface PsychologyMetrics {
  base_value: number; // 0.0-1.0
  satisfaction_level: number; // 0.0-1.0
  tech_stimulus_map: Record<string, number>;
}

// Philosophical Lens Metrics
export interface UtilitarianismMetrics {
  objective_function: string;
  happiness_factors: Record<string, number>;
}

export interface DeontologyMetrics {
  constraints: string[];
  penalty_factor: number;
}

export interface ExistentialismMetrics {
  objective_function: string;
  choice_metrics: string[];
}

export interface CommunitarianismMetrics {
  objective_function: string;
  balance_weights: {
    individual: number;
    community: number;
  };
}

// Dynamic Agent Model (DAM) - 에코 엔진 통합 확장
export interface PersonalityTraits {
  openness: {
    score: number;
    evidence_snippets: Array<{
      event_id: string;
      text: string;
      timestamp: string;
    }>;
  };
  conscientiousness: {
    score: number;
    evidence_snippets: Array<{
      event_id: string;
      text: string;
      timestamp: string;
    }>;
  };
  extraversion: {
    score: number;
    evidence_snippets: Array<{
      event_id: string;
      text: string;
      timestamp: string;
    }>;
  };
  agreeableness: {
    score: number;
    evidence_snippets: Array<{
      event_id: string;
      text: string;
      timestamp: string;
    }>;
  };
  neuroticism: {
    score: number;
    evidence_snippets: Array<{
      event_id: string;
      text: string;
      timestamp: string;
    }>;
  };
}

export interface SchwartzValueSystem {
  self_direction: number;      // 자율성
  stimulation: number;         // 자극
  hedonism: number;           // 쾌락주의
  achievement: number;         // 성취
  power: number;              // 권력
  security: number;           // 안전
  conformity: number;         // 순응
  tradition: number;          // 전통
  benevolence: number;        // 자선
  universalism: number;       // 보편주의
}

// Legacy UPDM interface for compatibility
export interface UPDM {
  userId: string;
  schemaVersion: string;
  lastUpdated: string;
  dataSources: string[];
  personality_traits: PersonalityTraits;
  value_system: SchwartzValueSystem;
  application_specific_data?: Record<string, any>;
}

export interface SocialRelationship {
  agentId: string;
  relationship_type: 'cooperative' | 'competitive' | 'neutral' | 'antagonistic';
  interaction_count: number;
  trust_level: number;
  influence_weight: number;
}

export interface SimulationEvent {
  event_id: string;
  timestamp: string;
  event_type: 'policy_support' | 'technology_adoption' | 'social_interaction' | 'resource_allocation' | 'conflict_resolution' | 'community_participation';
  details: string;
  impact_tags: string[];
  participants?: string[];
  outcome?: 'positive' | 'negative' | 'neutral';
  magnitude?: number; // 0.0-1.0, impact 강도
}

// Legacy AgentEvent interface for compatibility
export interface AgentEvent {
  id: string;
  agent_id: string;
  action: string;
  context: string;
  impact_metrics: Record<string, number>;
  philosophical_reasoning: string;
  timestamp: string;
  affected_agents: string[];
}

export interface AgentSimulationState {
  current_status: 'active' | 'inactive' | 'terminated' | 'transitioning';
  satisfaction_level: number; // 0.0-1.0
  social_graph: SocialRelationship[];
  event_log: SimulationEvent[];
  resource_state: Record<string, number>;
  position: { x: number; y: number };
  connections: string[];
  philosophical_alignment: string;
}

// Dynamic Agent Model (DAM) - 완전한 동적 에이전트 모델
export interface DynamicAgentModel {
  agentId: string;
  schemaVersion: string;
  lastUpdated: string;
  agentType: 'individual' | 'community' | 'institution';
  
  // 에코 엔진 UPDM 영역
  personality_traits: PersonalityTraits;
  value_system: SchwartzValueSystem;
  
  // 딥 다이브 확장 영역
  simulation_state: AgentSimulationState;
}

// 레거시 Agent 인터페이스 (DAM으로 대체될 예정)
export interface Agent {
  id: string;
  type: 'individual' | 'community' | 'institution';
  position: { x: number; y: number };
  updm: UPDM;
  philosophical_alignment: string;
  resources: Record<string, number>;
  connections: string[];
  status: 'active' | 'inactive' | 'transitioning';
  life_log: AgentEvent[];
  satisfaction_level: number;
  influence_network: Record<string, number>;
}

// 이벤트 버스 메시지 타입
export interface EventBusMessage {
  messageId: string;
  topic: string;
  timestamp: string;
  agentId: string;
  event: SimulationEvent;
  metadata?: Record<string, any>;
}

// 페르소나 업데이트 요청
export interface PersonaUpdateRequest {
  agentId: string;
  events: SimulationEvent[];
  update_reason: string;
  confidence_score: number; // 0.0-1.0, 업데이트의 확실성
}

// 페르소나 업데이트 결과
export interface PersonaUpdateResult {
  agentId: string;
  updated_traits: Partial<PersonalityTraits>;
  updated_values: Partial<SchwartzValueSystem>;
  changes_summary: string;
  confidence_score: number;
}

// Global Simulation State
export interface SimulationState {
  isRunning: boolean;
  currentStep: number;
  totalSteps: number;
  selectedScenario: string;
  agents: Agent[];
  globalMetrics: {
    socialTrust: number;
    resourceEfficiency: number;
    individualAutonomy: number;
    communityWellbeing: number;
    totalHappiness: number;
    privacyScore: number;
    freedomIndex: number;
  };
  variableState: Record<string, any>;
}

// Scenario Configuration
export interface ScenarioConfig {
  id: string;
  name: string;
  description: string;
  dominantPhilosophy: string;
  keyTechnologies: string[];
  globalRules: Record<string, any>;
  successMetrics: string[];
}