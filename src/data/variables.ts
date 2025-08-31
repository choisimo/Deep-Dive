// Core variables and parameters data following the specification
import type { 
  Variable, 
  Parameter, 
  TechnologyMetrics, 
  PsychologyMetrics,
  UtilitarianismMetrics,
  DeontologyMetrics,
  ExistentialismMetrics,
  CommunitarianismMetrics
} from '@/types/simulation';

// Core Variables
export const coreVariables: Variable[] = [
  // Technology Variables
  {
    id: 'tech-ai',
    name: 'AI',
    category: 'technology',
    description: 'Artificial Intelligence including LLM and AGI technologies',
    created_at: '2025-08-31T00:00:00Z'
  },
  {
    id: 'tech-bci',
    name: 'BCI',
    category: 'technology',
    description: 'Brain-Computer Interface technology',
    created_at: '2025-08-31T00:00:00Z'
  },
  {
    id: 'tech-quantum',
    name: 'Quantum Computing',
    category: 'technology',
    description: 'Quantum computing and quantum algorithms',
    created_at: '2025-08-31T00:00:00Z'
  },
  {
    id: 'tech-blockchain',
    name: 'Blockchain',
    category: 'technology',
    description: 'Decentralized and distributed ledger technologies',
    created_at: '2025-08-31T00:00:00Z'
  },
  {
    id: 'tech-bioeng',
    name: 'Bio-engineering',
    category: 'technology',
    description: 'Biotechnology and genetic engineering',
    created_at: '2025-08-31T00:00:00Z'
  },
  // Psychology Variables
  {
    id: 'psych-connection',
    name: 'Connection',
    category: 'psychology',
    description: 'Human need for social connection and belonging',
    created_at: '2025-08-31T00:00:00Z'
  },
  {
    id: 'psych-growth',
    name: 'Growth',
    category: 'psychology',
    description: 'Drive for personal growth and self-actualization',
    created_at: '2025-08-31T00:00:00Z'
  },
  {
    id: 'psych-safety',
    name: 'Safety',
    category: 'psychology',
    description: 'Need for security and control over environment',
    created_at: '2025-08-31T00:00:00Z'
  },
  {
    id: 'psych-pleasure',
    name: 'Pleasure',
    category: 'psychology',
    description: 'Pursuit of enjoyment and hedonic satisfaction',
    created_at: '2025-08-31T00:00:00Z'
  },
  // Philosophy Variables
  {
    id: 'phil-utilitarianism',
    name: 'Utilitarianism',
    category: 'philosophy',
    description: 'Maximizing overall happiness and utility',
    created_at: '2025-08-31T00:00:00Z'
  },
  {
    id: 'phil-deontology',
    name: 'Deontology',
    category: 'philosophy',
    description: 'Duty-based ethics with universal moral rules',
    created_at: '2025-08-31T00:00:00Z'
  },
  {
    id: 'phil-existentialism',
    name: 'Existentialism',
    category: 'philosophy',
    description: 'Individual freedom and authentic choice',
    created_at: '2025-08-31T00:00:00Z'
  },
  {
    id: 'phil-communitarianism',
    name: 'Communitarianism',
    category: 'philosophy',
    description: 'Balance between individual and community wellbeing',
    created_at: '2025-08-31T00:00:00Z'
  }
];

// Current Parameters (2025-08-31)
export const currentParameters: Parameter[] = [
  // AI Technology
  {
    id: 'param-ai-2025',
    variable_id: 'tech-ai',
    effective_date: '2025-08-31',
    metrics: {
      trl: 8,
      accessibility: 0.7,
      social_impact: 0.85,
      resource_dependency: {
        energy: 0.9,
        compute: 1.0,
        data: 0.95
      }
    } as TechnologyMetrics,
    source: 'Expert estimation based on current LLM capabilities',
    created_at: '2025-08-31T00:00:00Z'
  },
  // BCI Technology
  {
    id: 'param-bci-2025',
    variable_id: 'tech-bci',
    effective_date: '2025-08-31',
    metrics: {
      trl: 6,
      accessibility: 0.3,
      social_impact: 0.6,
      resource_dependency: {
        energy: 0.6,
        compute: 0.8
      }
    } as TechnologyMetrics,
    source: 'Neuralink and similar BCI research progress',
    created_at: '2025-08-31T00:00:00Z'
  },
  // Connection Psychology
  {
    id: 'param-connection-2025',
    variable_id: 'psych-connection',
    effective_date: '2025-08-31',
    metrics: {
      base_value: 0.8,
      satisfaction_level: 0.6,
      tech_stimulus_map: {
        'tech-ai': 0.7,
        'tech-blockchain': 0.5,
        'tech-bci': 0.8
      }
    } as PsychologyMetrics,
    source: 'Social psychology research on human connection needs',
    created_at: '2025-08-31T00:00:00Z'
  },
  // Growth Psychology  
  {
    id: 'param-growth-2025',
    variable_id: 'psych-growth',
    effective_date: '2025-08-31',
    metrics: {
      base_value: 0.75,
      satisfaction_level: 0.55,
      tech_stimulus_map: {
        'tech-ai': 0.8,
        'tech-bci': 0.9,
        'tech-bioeng': 0.85
      }
    } as PsychologyMetrics,
    source: 'Maslow hierarchy and self-actualization research',
    created_at: '2025-08-31T00:00:00Z'
  },
  // Utilitarianism Philosophy
  {
    id: 'param-util-2025',
    variable_id: 'phil-utilitarianism',
    effective_date: '2025-08-31',
    metrics: {
      objective_function: 'maximize(total_happiness)',
      happiness_factors: {
        resource_equality: 0.6,
        pleasure_satisfaction: 0.4,
        safety_level: 0.5,
        growth_fulfillment: 0.3
      }
    } as UtilitarianismMetrics,
    source: 'Bentham and Mill utilitarian ethics',
    created_at: '2025-08-31T00:00:00Z'
  },
  // Deontology Philosophy
  {
    id: 'param-deont-2025',
    variable_id: 'phil-deontology',
    effective_date: '2025-08-31',
    metrics: {
      constraints: [
        'privacy_score > 0.9',
        'freedom_index > 0.8',
        'human_dignity > 0.95'
      ],
      penalty_factor: 0.5
    } as DeontologyMetrics,
    source: 'Kantian categorical imperative principles',
    created_at: '2025-08-31T00:00:00Z'
  },
  // Communitarianism Philosophy
  {
    id: 'param-comm-2025',
    variable_id: 'phil-communitarianism',
    effective_date: '2025-08-31',
    metrics: {
      objective_function: 'optimize(balance(individual_growth, community_wellbeing))',
      balance_weights: {
        individual: 0.5,
        community: 0.5
      }
    } as CommunitarianismMetrics,
    source: 'Communitarian philosophy research',
    created_at: '2025-08-31T00:00:00Z'
  }
];

// Helper functions
export const getVariablesByCategory = (category: Variable['category']) => {
  return coreVariables.filter(v => v.category === category);
};

export const getParameterByVariableId = (variableId: string, date: string = '2025-08-31') => {
  return currentParameters.find(p => p.variable_id === variableId && p.effective_date === date);
};

export const getAllCurrentParameters = () => {
  return currentParameters.filter(p => p.effective_date === '2025-08-31');
};