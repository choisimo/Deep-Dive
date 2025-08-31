// Enhanced simulation engine following the specification v2.0 - Event-based Architecture
import type { Agent, SimulationState, ScenarioConfig, UPDM, AgentEvent, SimulationEvent } from '@/types/simulation';
import { getParameterByVariableId, getAllCurrentParameters } from './variables';
import { getScenarioConfig } from './scenarios';
import { eventBus } from '@/services/EventBus';
import { personaUpdateService } from '@/services/PersonaUpdateService';

export class SimulationEngine {
  private state: SimulationState;
  private scenario: ScenarioConfig;

  constructor(scenarioId: string) {
    this.scenario = getScenarioConfig(scenarioId) || getScenarioConfig('empathic')!;
    this.state = this.initializeState();
    
    // 페르소나 업데이트 서비스 활성화
    personaUpdateService.setActive(true);
    console.log('🚀 [SimulationEngine] Initialized with event-based persona updates');
  }

  private initializeState(): SimulationState {
    // Generate agents based on scenario
    const agents = this.generateAgents();
    
    return {
      isRunning: false,
      currentStep: 0,
      totalSteps: 100,
      selectedScenario: this.scenario.id,
      agents,
      globalMetrics: {
        socialTrust: 65,
        resourceEfficiency: 70,
        individualAutonomy: 60,
        communityWellbeing: 68,
        totalHappiness: 66,
        privacyScore: 75,
        freedomIndex: 70
      },
      variableState: this.initializeVariableState()
    };
  }

  private generateAgents(): Agent[] {
    const agents: Agent[] = [];
    const agentCount = 24;
    
    for (let i = 0; i < agentCount; i++) {
      const agent: Agent = {
        id: `agent-${i + 1}`,
        type: Math.random() > 0.8 ? 'community' : 'individual',
        position: {
          x: Math.random() * 800 + 100,
          y: Math.random() * 600 + 100
        },
        updm: this.generateUPDM(`agent-${i + 1}`),
        philosophical_alignment: this.selectPhilosophy(),
        resources: {
          energy: Math.random() * 100,
          compute: Math.random() * 100,
          data: Math.random() * 100
        },
        connections: [],
        status: 'active',
        life_log: [],
        satisfaction_level: Math.random(),
        influence_network: {}
      };
      agents.push(agent);
    }

    // Generate connections
    this.generateConnections(agents);
    
    return agents;
  }

  private generateUPDM(userId: string): UPDM {
    const now = new Date().toISOString();
    return {
      userId,
      schemaVersion: '1.0',
      lastUpdated: now,
      dataSources: ['simulation_initialization'],
      personality_traits: {
        openness: {
          score: this.getInfluencedRandom(),
          evidence_snippets: [{
            event_id: 'init',
            text: '시뮬레이션 초기화 시 생성된 성격 특성',
            timestamp: now,
          }],
        },
        conscientiousness: {
          score: this.getInfluencedRandom(),
          evidence_snippets: [{
            event_id: 'init',
            text: '시뮬레이션 초기화 시 생성된 성격 특성',
            timestamp: now,
          }],
        },
        extraversion: {
          score: this.getInfluencedRandom(),
          evidence_snippets: [{
            event_id: 'init',
            text: '시뮬레이션 초기화 시 생성된 성격 특성',
            timestamp: now,
          }],
        },
        agreeableness: {
          score: this.getInfluencedRandom(),
          evidence_snippets: [{
            event_id: 'init',
            text: '시뮬레이션 초기화 시 생성된 성격 특성',
            timestamp: now,
          }],
        },
        neuroticism: {
          score: this.getInfluencedRandom(),
          evidence_snippets: [{
            event_id: 'init',
            text: '시뮬레이션 초기화 시 생성된 성격 특성',
            timestamp: now,
          }],
        },
      },
      value_system: {
        self_direction: this.getInfluencedRandom(),
        stimulation: this.getInfluencedRandom(),
        hedonism: this.getInfluencedRandom(),
        achievement: this.getInfluencedRandom(),
        power: this.getInfluencedRandom(),
        security: this.getInfluencedRandom(),
        conformity: this.getInfluencedRandom(),
        tradition: this.getInfluencedRandom(),
        benevolence: this.getInfluencedRandom(),
        universalism: this.getInfluencedRandom(),
      },
      application_specific_data: {
        simulation_context: 'social_future_modeling',
      },
    };
  }

  private getInfluencedRandom(): number {
    // Generate random value influenced by scenario philosophy
    let baseValue = Math.random();
    
    // Modify based on scenario philosophy
    switch (this.scenario.dominantPhilosophy) {
      case 'phil-communitarianism':
        baseValue = Math.min(1, baseValue + 0.2); // Higher community-oriented traits
        break;
      case 'phil-existentialism':
        baseValue = Math.max(0.3, baseValue); // Higher individuality
        break;
      case 'phil-deontology':
        baseValue = 0.4 + (baseValue * 0.4); // More conservative, rule-based
        break;
      case 'phil-utilitarianism':
        baseValue = 0.3 + (baseValue * 0.5); // Moderate values with utilitarian bias
        break;
    }
    
    return Math.max(0, Math.min(1, baseValue));
  }

  private selectPhilosophy(): string {
    // 70% chance of dominant philosophy, 30% others
    if (Math.random() < 0.7) {
      return this.scenario.dominantPhilosophy;
    }
    
    const philosophies = ['phil-utilitarianism', 'phil-deontology', 'phil-existentialism', 'phil-communitarianism'];
    return philosophies[Math.floor(Math.random() * philosophies.length)];
  }

  private generateConnections(agents: Agent[]) {
    agents.forEach(agent => {
      const connectionCount = Math.floor(Math.random() * 4) + 1;
      const possibleConnections = agents.filter(a => a.id !== agent.id);
      
      for (let i = 0; i < connectionCount && i < possibleConnections.length; i++) {
        const targetIndex = Math.floor(Math.random() * possibleConnections.length);
        const targetAgent = possibleConnections[targetIndex];
        
        if (!agent.connections.includes(targetAgent.id)) {
          agent.connections.push(targetAgent.id);
          // Mutual connection
          if (!targetAgent.connections.includes(agent.id)) {
            targetAgent.connections.push(agent.id);
          }
        }
        
        possibleConnections.splice(targetIndex, 1);
      }
    });
  }

  private initializeVariableState() {
    const parameters = getAllCurrentParameters();
    const state: Record<string, any> = {};
    
    parameters.forEach(param => {
      state[param.variable_id] = param.metrics;
    });
    
    return state;
  }

  public step(): void {
    if (this.state.currentStep >= this.state.totalSteps) {
      return;
    }

    // Update agent behaviors based on psychological profiles and philosophy
    this.updateAgentBehaviors();
    
    // Update global metrics based on scenario rules
    this.updateGlobalMetrics();
    
    // Apply technology effects
    this.applyTechnologyEffects();
    
    this.state.currentStep++;
  }

  private updateAgentBehaviors() {
    this.state.agents.forEach(agent => {
      // Update based on psychological satisfaction
      const satisfactionLevel = this.calculateSatisfaction(agent);
      
      // Agents with low satisfaction might change behavior or connections
      if (satisfactionLevel < 0.4) {
        this.adjustAgentBehavior(agent);
      }
      
      // Update resources based on connections and technology access
      this.updateAgentResources(agent);
    });
  }

  private calculateSatisfaction(agent: Agent): number {
    // Calculate satisfaction based on UPDM personality traits and values
    const traits = agent.updm.personality_traits;
    const values = agent.updm.value_system;
    
    // Base satisfaction from personality alignment with environment
    let satisfaction = 0;
    let weightSum = 0;
    
    // Factor in how well the agent's values align with scenario outcomes
    Object.entries(values).forEach(([value, weight]) => {
      const valueParam = getParameterByVariableId(`phil-${value}`);
      if (valueParam) {
        const environmentSatisfaction = (valueParam.metrics as any).satisfaction_level || 0.5;
        satisfaction += environmentSatisfaction * weight;
        weightSum += weight;
      }
    });
    
    // Factor in personality-based satisfaction
    const personalitySatisfaction = (
      traits.openness.score * 0.2 +
      traits.conscientiousness.score * 0.2 +
      traits.extraversion.score * 0.15 +
      traits.agreeableness.score * 0.25 +
      (1 - traits.neuroticism.score) * 0.2
    );
    
    satisfaction += personalitySatisfaction * 0.3;
    weightSum += 0.3;
    
    return weightSum > 0 ? satisfaction / weightSum : agent.satisfaction_level;
  }

  private adjustAgentBehavior(agent: Agent) {
    // Low satisfaction agents might form new connections or change alignment
    if (Math.random() < 0.3) {
      // Find new connection
      const unconnected = this.state.agents.filter(a => 
        a.id !== agent.id && !agent.connections.includes(a.id)
      );
      
      if (unconnected.length > 0) {
        const newConnection = unconnected[Math.floor(Math.random() * unconnected.length)];
        agent.connections.push(newConnection.id);
        newConnection.connections.push(agent.id);
      }
    }
  }

  private updateAgentResources(agent: Agent) {
    // Resources affected by connections (network effects)
    const networkBonus = agent.connections.length * 0.1;
    
    Object.keys(agent.resources).forEach(resource => {
      agent.resources[resource] = Math.max(0, Math.min(100,
        agent.resources[resource] + (Math.random() - 0.45) * 2 + networkBonus
      ));
    });
  }

  private updateGlobalMetrics() {
    const rules = this.scenario.globalRules;
    const metrics = this.state.globalMetrics;
    
    // Calculate average agent satisfaction
    const avgSatisfaction = this.state.agents.reduce((sum, agent) => 
      sum + this.calculateSatisfaction(agent), 0) / this.state.agents.length;
    
    // Update metrics based on scenario rules and agent states
    switch (this.scenario.dominantPhilosophy) {
      case 'phil-communitarianism':
        metrics.socialTrust += (avgSatisfaction - 0.5) * 3;
        metrics.communityWellbeing += (avgSatisfaction - 0.5) * 4;
        metrics.individualAutonomy += (avgSatisfaction - 0.6) * 2;
        break;
        
      case 'phil-utilitarianism':
        metrics.totalHappiness += (avgSatisfaction - 0.5) * 4;
        metrics.resourceEfficiency += (avgSatisfaction - 0.5) * 3;
        metrics.privacyScore += (avgSatisfaction - 0.7) * 2;
        break;
        
      case 'phil-existentialism':
        metrics.individualAutonomy += (avgSatisfaction - 0.5) * 4;
        metrics.freedomIndex += (avgSatisfaction - 0.5) * 3;
        metrics.communityWellbeing += (avgSatisfaction - 0.6) * 1.5;
        break;
        
      case 'phil-deontology':
        metrics.privacyScore += (avgSatisfaction - 0.5) * 3;
        metrics.freedomIndex += (avgSatisfaction - 0.5) * 3;
        metrics.socialTrust += (avgSatisfaction - 0.5) * 2.5;
        break;
    }
    
    // Clamp values between 0 and 100
    Object.keys(metrics).forEach(key => {
      metrics[key as keyof typeof metrics] = Math.max(0, Math.min(100, 
        metrics[key as keyof typeof metrics]
      ));
    });
  }

  private applyTechnologyEffects() {
    // Get current technology states
    this.scenario.keyTechnologies.forEach(techId => {
      const techParam = getParameterByVariableId(techId);
      if (techParam) {
        const metrics = techParam.metrics as any;
        
        // Technology effects on global metrics
        if (metrics.accessibility > 0.7) {
          this.state.globalMetrics.resourceEfficiency += 0.5;
        }
        
        if (metrics.social_impact > 0.8) {
          this.state.globalMetrics.socialTrust += (Math.random() - 0.5) * 2;
        }
      }
    });
  }

  public getState(): SimulationState {
    return { ...this.state };
  }

  public setState(newState: Partial<SimulationState>) {
    this.state = { ...this.state, ...newState };
  }

  public changeScenario(scenarioId: string) {
    const newScenario = getScenarioConfig(scenarioId);
    if (newScenario) {
      this.scenario = newScenario;
      this.state = this.initializeState();
    }
  }
}