import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  Brain, 
  Target,
  Zap,
  Users,
  BookOpen
} from "lucide-react";
import type { Agent, AgentEvent } from "@/types/simulation";

interface PersonaEvolutionTrackerProps {
  agent: Agent | null;
  onPersonaUpdate?: (agentId: string, updatedPersona: any) => void;
}

interface PersonaChange {
  trait: string;
  previousValue: number;
  newValue: number;
  change: number;
  timestamp: string;
  evidence: string;
}

const PersonaEvolutionTracker = ({ agent, onPersonaUpdate }: PersonaEvolutionTrackerProps) => {
  const [personaHistory, setPersonaHistory] = useState<PersonaChange[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate persona evolution analysis based on agent's life log
  const analyzePersonaEvolution = async () => {
    if (!agent) return;
    
    setIsAnalyzing(true);
    
    try {
      // Simulate persona analysis service processing life log events
      const recentEvents = agent.life_log.slice(-5); // Last 5 events
      const changes: PersonaChange[] = [];
      
      // Simulate how events influence personality traits
      recentEvents.forEach((event, index) => {
        // Example: Community-oriented actions increase agreeableness
        if (event.action.includes('cooperation') || event.action.includes('helping')) {
          const currentScore = agent.updm.personality_traits.agreeableness.score;
          const change = Math.random() * 0.05; // Small incremental change
          const newScore = Math.min(1, currentScore + change);
          
          changes.push({
            trait: 'agreeableness',
            previousValue: currentScore,
            newValue: newScore,
            change: change,
            timestamp: event.timestamp,
            evidence: `"${event.action}" - 협력적 행동이 우호성을 증가시켰습니다`
          });
        }

        // Risk-taking behavior affects neuroticism
        if (event.action.includes('risk') || event.action.includes('venture')) {
          const currentScore = agent.updm.personality_traits.neuroticism.score;
          const change = -Math.random() * 0.03; // Reduce neuroticism
          const newScore = Math.max(0, currentScore + change);
          
          changes.push({
            trait: 'neuroticism',
            previousValue: currentScore,
            newValue: newScore,
            change: change,
            timestamp: event.timestamp,
            evidence: `"${event.action}" - 위험 감수 행동으로 신경성이 감소했습니다`
          });
        }

        // Creative or innovative actions affect openness
        if (event.action.includes('creative') || event.action.includes('innovation')) {
          const currentScore = agent.updm.personality_traits.openness.score;
          const change = Math.random() * 0.04;
          const newScore = Math.min(1, currentScore + change);
          
          changes.push({
            trait: 'openness',
            previousValue: currentScore,
            newValue: newScore,
            change: change,
            timestamp: event.timestamp,
            evidence: `"${event.action}" - 창의적 활동이 개방성을 향상시켰습니다`
          });
        }
      });

      setPersonaHistory(prev => [...prev, ...changes].slice(-20)); // Keep last 20 changes
      
      // Notify parent component of persona updates
      if (changes.length > 0 && onPersonaUpdate) {
        onPersonaUpdate(agent.id, { changes });
      }
      
    } catch (error) {
      console.error('Persona evolution analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Auto-analyze when agent's life log changes
  useEffect(() => {
    if (agent && agent.life_log.length > 0) {
      const timer = setTimeout(() => {
        analyzePersonaEvolution();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [agent?.life_log.length]);

  if (!agent) {
    return (
      <Card className="p-6 bg-gradient-card border-0">
        <div className="text-center py-8">
          <Brain className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-depth-primary mb-2">
            페르소나 진화 추적
          </h3>
          <p className="text-muted-foreground">
            에이전트를 선택하여 동적 페르소나 변화를 추적하세요
          </p>
        </div>
      </Card>
    );
  }

  const getTraitKoreanName = (trait: string) => {
    const names = {
      openness: '개방성',
      conscientiousness: '성실성',
      extraversion: '외향성',
      agreeableness: '우호성',
      neuroticism: '신경성'
    };
    return names[trait as keyof typeof names] || trait;
  };

  const getValueKoreanName = (value: string) => {
    const names = {
      self_direction: '자율성',
      stimulation: '자극',
      hedonism: '쾌락주의',
      achievement: '성취',
      power: '권력',
      security: '안전',
      conformity: '순응',
      tradition: '전통',
      benevolence: '자선',
      universalism: '보편주의'
    };
    return names[value as keyof typeof names] || value;
  };

  const generateLifeEvent = () => {
    const events = [
      { action: 'cooperation_community_project', context: 'community_building', impact: 'positive' },
      { action: 'risk_taking_innovation', context: 'technology_adoption', impact: 'growth' },
      { action: 'helping_other_agent', context: 'social_interaction', impact: 'positive' },
      { action: 'creative_problem_solving', context: 'resource_optimization', impact: 'innovation' },
      { action: 'ethical_decision_making', context: 'moral_dilemma', impact: 'values_strengthening' }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    const newEvent: AgentEvent = {
      id: `event-${Date.now()}`,
      agent_id: agent.id,
      action: event.action,
      context: event.context,
      impact_metrics: {
        satisfaction_change: (Math.random() - 0.5) * 0.1,
        social_influence: Math.random() * 0.05,
        resource_efficiency: (Math.random() - 0.5) * 0.05
      },
      philosophical_reasoning: `${event.impact} 영향을 통한 페르소나 발전`,
      timestamp: new Date().toISOString(),
      affected_agents: []
    };
    
    // Add to agent's life log (in real implementation, this would update the simulation state)
    agent.life_log.push(newEvent);
    analyzePersonaEvolution();
  };

  return (
    <div className="space-y-6">
      {/* Agent Overview */}
      <Card className="p-4 bg-gradient-card border-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-depth-primary" />
            <div>
              <h3 className="font-semibold text-depth-primary">동적 페르소나 추적</h3>
              <p className="text-sm text-muted-foreground">에이전트 {agent.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {agent.life_log.length} 이벤트
            </Badge>
            <Button 
              size="sm" 
              onClick={generateLifeEvent}
              className="bg-gradient-deep text-white"
            >
              <Zap className="w-3 h-3 mr-1" />
              이벤트 생성
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">페르소나 버전:</span>
            <span className="ml-2 text-muted-foreground">{agent.updm.schemaVersion}</span>
          </div>
          <div>
            <span className="font-medium">마지막 업데이트:</span>
            <span className="ml-2 text-muted-foreground">
              {new Date(agent.updm.lastUpdated).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="font-medium">만족도:</span>
            <span className="ml-2 text-muted-foreground">
              {(agent.satisfaction_level * 100).toFixed(1)}%
            </span>
          </div>
          <div>
            <span className="font-medium">영향력 네트워크:</span>
            <span className="ml-2 text-muted-foreground">
              {Object.keys(agent.influence_network).length} 연결
            </span>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="traits" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="traits" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            성격 특성
          </TabsTrigger>
          <TabsTrigger value="values" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            가치 체계
          </TabsTrigger>
          <TabsTrigger value="evolution" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            진화 히스토리
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traits">
          <div className="space-y-4">
            {Object.entries(agent.updm.personality_traits).map(([trait, data]) => (
              <Card key={trait} className="p-4 bg-white/50 border-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-depth-primary">
                    {getTraitKoreanName(trait)}
                  </h4>
                  <Badge variant="outline">
                    {(data.score * 100).toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={data.score * 100} className="mb-2" />
                <div className="text-xs text-muted-foreground">
                  최근 증거: "{data.evidence_snippets[0]?.text || '데이터 없음'}"
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="values">
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(agent.updm.value_system).map(([value, score]) => (
              <Card key={value} className="p-3 bg-white/50 border-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-depth-primary">
                    {getValueKoreanName(value)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {(score * 100).toFixed(0)}%
                  </span>
                </div>
                <Progress value={score * 100} className="h-1" />
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="evolution">
          <Card className="p-4 bg-white/50 border-0">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-depth-primary" />
              <h4 className="font-medium text-depth-primary">페르소나 변화 로그</h4>
              {isAnalyzing && (
                <Badge variant="secondary" className="animate-pulse">
                  분석 중...
                </Badge>
              )}
            </div>

            {personaHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>아직 페르소나 변화가 기록되지 않았습니다.</p>
                <p className="text-xs mt-1">에이전트가 활동하면 동적 변화가 추적됩니다.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {personaHistory.slice(-10).reverse().map((change, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-3 bg-gradient-card rounded-lg border"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {change.change > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-depth-primary">
                          {getTraitKoreanName(change.trait)}
                        </span>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">
                            {(change.previousValue * 100).toFixed(1)}%
                          </span>
                          <span>→</span>
                          <span className={change.change > 0 ? 'text-green-600' : 'text-red-600'}>
                            {(change.newValue * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {change.evidence}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {new Date(change.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonaEvolutionTracker;