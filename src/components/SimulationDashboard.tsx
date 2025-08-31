import { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Database,
  Activity,
  Scale
} from "lucide-react";

// Import components directly for now to avoid lazy loading issues
import AgentNetworkFlow from "./AgentNetworkFlow";
import ScenarioSelector from "./ScenarioSelector";
import MetricsPanel from "./MetricsPanel";
import VariableControl from "./VariableControl";

import EventBusMonitor from "./EventBusMonitor";
import { SimulationEngine } from "@/data/simulationEngine";
import { scenarioConfigs } from "@/data/scenarios";
import type { SimulationState } from "@/types/simulation";

const SimulationDashboard = () => {
  // Initialize simulation engine
  const [simulationEngine] = useState(() => new SimulationEngine("empathic"));
  const [simState, setSimState] = useState<SimulationState>(simulationEngine.getState());
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  
  // Get current scenario config
  const currentScenario = useMemo(() => {
    return scenarioConfigs[simState.selectedScenario];
  }, [simState.selectedScenario]);

  // Enhanced simulation execution
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (simState.isRunning && simState.currentStep < simState.totalSteps) {
      interval = setInterval(() => {
        simulationEngine.step();
        const newState = simulationEngine.getState();
        setSimState(newState);
      }, 300); // Slightly slower for better visualization
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simState.isRunning, simState.currentStep, simState.totalSteps, simulationEngine]);

  const handlePlayPause = useCallback(() => {
    const newState = { ...simState, isRunning: !simState.isRunning };
    simulationEngine.setState(newState);
    setSimState(newState);
  }, [simState, simulationEngine]);

  const handleReset = useCallback(() => {
    simulationEngine.changeScenario(simState.selectedScenario);
    const resetState = simulationEngine.getState();
    setSimState(resetState);
  }, [simState.selectedScenario, simulationEngine]);

  const handleScenarioChange = useCallback((scenario: string) => {
    simulationEngine.changeScenario(scenario);
    const newState = simulationEngine.getState();
    setSimState(newState);
  }, [simulationEngine]);

  // Simple charts placeholder for now
  const SimpleChartsPlaceholder = () => (
    <Card className="p-6 bg-gradient-card border-0">
      <h3 className="text-lg font-semibold text-depth-primary mb-4">시뮬레이션 차트</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-white/50 rounded-lg">
          <div className="text-2xl font-bold text-depth-primary">{Math.round(simState.globalMetrics.socialTrust)}%</div>
          <div className="text-sm text-muted-foreground">사회적 신뢰</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-lg">
          <div className="text-2xl font-bold text-depth-primary">{Math.round(simState.globalMetrics.totalHappiness)}%</div>
          <div className="text-sm text-muted-foreground">전체 행복도</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-lg">
          <div className="text-2xl font-bold text-depth-primary">{Math.round(simState.globalMetrics.resourceEfficiency)}%</div>
          <div className="text-sm text-muted-foreground">자원 효율성</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-lg">
          <div className="text-2xl font-bold text-depth-primary">{Math.round(simState.globalMetrics.individualAutonomy)}%</div>
          <div className="text-sm text-muted-foreground">개인 자율성</div>
        </div>
      </div>
    </Card>
  );

  // Simple persona interaction placeholder
  const PersonaPlaceholder = () => (
    <Card className="p-6 bg-gradient-card border-0">
      <h3 className="text-lg font-semibold text-depth-primary mb-4">페르소나 상호작용</h3>
      <p className="text-muted-foreground mb-4">
        에이전트와의 Echo/Anti-Echo 상호작용 기능이 곧 활성화됩니다.
      </p>
      {selectedAgent ? (
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">선택된 에이전트:</span> {selectedAgent}</p>
          <div className="p-3 bg-white/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              동적 페르소나 시스템을 통해 이 에이전트의 성격 특성과 가치관이 시뮬레이션 과정에서 변화합니다.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">네트워크에서 에이전트를 선택해주세요.</p>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-surface p-6">
      <div className="container mx-auto max-w-7xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-depth-primary mb-2">
              시뮬레이션 대시보드
            </h1>
            <p className="text-muted-foreground">
              다차원 변수 모델링 기반 미래 사회 시뮬레이션
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm">
              Step {simState.currentStep}/{simState.totalSteps}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border-depth-primary/30"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              리셋
            </Button>
            <Button
              onClick={handlePlayPause}
              className="bg-gradient-deep text-white"
            >
              {simState.isRunning ? (
                <Pause className="w-4 h-4 mr-2" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {simState.isRunning ? '일시정지' : '시작'}
            </Button>
          </div>
        </div>

        {/* 진행률 */}
        <Card className="p-4 mb-6 bg-gradient-card border-0 shadow-card-custom">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-depth-primary">시뮬레이션 진행률</span>
            <span className="text-sm text-muted-foreground">
              {Math.round((simState.currentStep / simState.totalSteps) * 100)}%
            </span>
          </div>
          <Progress 
            value={(simState.currentStep / simState.totalSteps) * 100} 
            className="h-2"
          />
        </Card>

        {/* 메인 콘텐츠 */}
        <Tabs defaultValue="network" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              네트워크
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              지표
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              시나리오
            </TabsTrigger>
            <TabsTrigger value="variables" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              변수 조정
            </TabsTrigger>
            <TabsTrigger value="persona" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              페르소나
            </TabsTrigger>
            <TabsTrigger value="eventbus" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              이벤트 버스
            </TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="space-y-4">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <AgentNetworkFlow 
                  agents={simState.agents}
                  scenario={simState.selectedScenario}
                  isRunning={simState.isRunning}
                  onAgentSelect={setSelectedAgent}
                />
              </div>
              <div className="space-y-4">
                <Card className="p-4 bg-gradient-card border-0">
                  <h3 className="font-semibold text-depth-primary mb-3">에이전트 정보</h3>
                  {selectedAgent ? (
                    (() => {
                      const agent = simState.agents.find(a => a.id === selectedAgent);
                      return agent ? (
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">ID:</span> {agent.id}</p>
                          <p><span className="font-medium">유형:</span> {agent.type}</p>
                          <p><span className="font-medium">철학적 성향:</span> {agent.philosophical_alignment}</p>
                          <p><span className="font-medium">연결 수:</span> {agent.connections.length}</p>
                          <div>
                            <span className="font-medium">성격 특성 (Big 5):</span>
                            <div className="ml-2 mt-1 space-y-1">
                              {Object.entries(agent.updm.personality_traits).map(([key, trait]) => (
                                <div key={key} className="flex justify-between text-xs">
                                  <span className="capitalize">{key}:</span>
                                  <span>{(trait.score * 100).toFixed(0)}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">에이전트 정보를 찾을 수 없습니다</p>
                      );
                    })()
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      에이전트를 선택해주세요
                    </p>
                  )}
                </Card>
                
                <Card className="p-4 bg-gradient-card border-0">
                  <h3 className="font-semibold text-depth-primary mb-3">시나리오 정보</h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-depth-primary">{currentScenario?.name}</p>
                    <p className="text-muted-foreground text-xs">{currentScenario?.description}</p>
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between">
                        <span>총 에이전트:</span>
                        <span className="font-medium">{simState.agents.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>총 연결:</span>
                        <span className="font-medium">
                          {simState.agents.reduce((sum, agent) => sum + agent.connections.length, 0) / 2}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>주요 기술:</span>
                        <span className="font-medium">{currentScenario?.keyTechnologies.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metrics">
            <div className="space-y-6">
              <MetricsPanel metrics={simState.globalMetrics} />
              <SimpleChartsPlaceholder />
            </div>
          </TabsContent>

          <TabsContent value="scenarios">
            <ScenarioSelector 
              selectedScenario={simState.selectedScenario}
              onScenarioChange={handleScenarioChange}
            />
          </TabsContent>

          <TabsContent value="variables">
            <VariableControl 
              variableState={simState.variableState}
              onVariableChange={(variableId, newValue) => {
                // Handle variable updates
                console.log('Variable change:', variableId, newValue);
              }}
            />
          </TabsContent>

          <TabsContent value="persona">
            <PersonaPlaceholder />
          </TabsContent>

          <TabsContent value="eventbus">
            <EventBusMonitor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SimulationDashboard;