// Scenario configurations following the specification
import type { ScenarioConfig } from '@/types/simulation';

export const scenarioConfigs: Record<string, ScenarioConfig> = {
  empathic: {
    id: 'empathic',
    name: '공감과 연결의 시대',
    description: 'Empathic Renaissance - 감성 컴퓨팅과 탈중앙화 소셜 플랫폼이 주도하는 공동체 중심 사회',
    dominantPhilosophy: 'phil-communitarianism',
    keyTechnologies: ['tech-ai', 'tech-blockchain'],
    globalRules: {
      community_weight: 0.7,
      individual_weight: 0.5,
      trust_requirement: 0.8,
      empathy_amplification: 1.2
    },
    successMetrics: ['socialTrust', 'communityWellbeing', 'resourceEfficiency']
  },
  optimized: {
    id: 'optimized',
    name: '효율과 최적화의 시대',
    description: 'Optimized Society - 중앙화된 초거대 AI가 관리하는 효율 중심 사회',
    dominantPhilosophy: 'phil-utilitarianism',
    keyTechnologies: ['tech-ai', 'tech-quantum'],
    globalRules: {
      efficiency_priority: 0.9,
      centralized_control: 0.8,
      optimization_target: 'total_happiness',
      individual_privacy: 0.4
    },
    successMetrics: ['resourceEfficiency', 'totalHappiness', 'socialTrust']
  },
  sovereign: {
    id: 'sovereign',
    name: '개인 주권의 시대',
    description: 'Sovereign Individual - 탈중앙화 AI와 영지식 증명으로 개인 자율성을 극대화한 사회',
    dominantPhilosophy: 'phil-existentialism',
    keyTechnologies: ['tech-blockchain', 'tech-bci'],
    globalRules: {
      individual_sovereignty: 0.9,
      decentralization_level: 0.8,
      privacy_protection: 0.95,
      community_support: 0.3
    },
    successMetrics: ['individualAutonomy', 'freedomIndex', 'privacyScore']
  },
  duty: {
    id: 'duty',
    name: '의무와 규칙의 시대',
    description: 'Duty-Based Society - 보편적 도덕 규칙과 인간 존엄성을 최우선으로 하는 사회',
    dominantPhilosophy: 'phil-deontology',
    keyTechnologies: ['tech-ai', 'tech-bioeng'],
    globalRules: {
      moral_constraints: 0.95,
      human_dignity_protection: 0.98,
      rule_compliance: 0.9,
      efficiency_sacrifice: 0.7
    },
    successMetrics: ['privacyScore', 'freedomIndex', 'communityWellbeing']
  }
};

export const getScenarioConfig = (scenarioId: string): ScenarioConfig | undefined => {
  return scenarioConfigs[scenarioId];
};

export const getAllScenarios = (): ScenarioConfig[] => {
  return Object.values(scenarioConfigs);
};