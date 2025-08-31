import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  MessageSquare, 
  TrendingUp, 
  Zap, 
  Users,
  Clock,
  BarChart3,
  RefreshCw
} from "lucide-react";
import { eventBus } from '@/services/EventBus';
import { personaUpdateService } from '@/services/PersonaUpdateService';
import type { EventBusMessage } from '@/types/simulation';

const EventBusMonitor = () => {
  const [messages, setMessages] = useState<EventBusMessage[]>([]);
  const [busStats, setBusStats] = useState<any>({});
  const [personaStats, setPersonaStats] = useState<any>({});
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMonitoring) {
      // 실시간 모니터링 업데이트
      interval = setInterval(() => {
        updateStats();
        updateMessages();
      }, 1000);
      
      updateStats();
      updateMessages();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring]);

  const updateStats = () => {
    setBusStats(eventBus.getStatistics());
    setPersonaStats(personaUpdateService.getStatistics());
  };

  const updateMessages = () => {
    const recentMessages = eventBus.getTopicMessages('simulation-events', 50);
    setMessages(recentMessages.reverse()); // 최신순으로 정렬
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    if (!isMonitoring) {
      // 모니터링 시작 시 이벤트 버스와 페르소나 업데이트 서비스 활성화
      eventBus.setActive(true);
      personaUpdateService.setActive(true);
    }
  };

  const clearHistory = () => {
    eventBus.clearHistory();
    setMessages([]);
    updateStats();
  };

  const getEventTypeColor = (eventType: string) => {
    const colors = {
      'community_participation': 'bg-green-100 text-green-800',
      'technology_adoption': 'bg-blue-100 text-blue-800',
      'social_interaction': 'bg-purple-100 text-purple-800',
      'conflict_resolution': 'bg-orange-100 text-orange-800',
      'policy_support': 'bg-indigo-100 text-indigo-800',
      'resource_allocation': 'bg-yellow-100 text-yellow-800'
    };
    return colors[eventType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'positive': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'negative': return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
      default: return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <Card className="p-4 bg-gradient-card border-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-depth-primary" />
            <div>
              <h3 className="font-semibold text-depth-primary">이벤트 버스 모니터</h3>
              <p className="text-sm text-muted-foreground">v2.0 이벤트 기반 아키텍처 실시간 모니터링</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearHistory}
              disabled={!isMonitoring}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              초기화
            </Button>
            <Button 
              onClick={toggleMonitoring}
              className={isMonitoring ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
            >
              <Zap className="w-4 h-4 mr-2" />
              {isMonitoring ? '모니터링 중지' : '모니터링 시작'}
            </Button>
          </div>
        </div>

        {/* 실시간 통계 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white/50 rounded-lg">
            <div className="text-lg font-bold text-depth-primary">{busStats.totalMessages || 0}</div>
            <div className="text-xs text-muted-foreground">총 메시지</div>
          </div>
          <div className="text-center p-3 bg-white/50 rounded-lg">
            <div className="text-lg font-bold text-depth-primary">{personaStats.totalUpdates || 0}</div>
            <div className="text-xs text-muted-foreground">페르소나 업데이트</div>
          </div>
          <div className="text-center p-3 bg-white/50 rounded-lg">
            <div className="text-lg font-bold text-depth-primary">{busStats.activeSubscribers?.length || 0}</div>
            <div className="text-xs text-muted-foreground">활성 구독자</div>
          </div>
          <div className="text-center p-3 bg-white/50 rounded-lg">
            <div className="text-lg font-bold text-depth-primary">
              {personaStats.averageConfidence ? (personaStats.averageConfidence * 100).toFixed(1) : 0}%
            </div>
            <div className="text-xs text-muted-foreground">평균 신뢰도</div>
          </div>
        </div>
      </Card>

      {/* 탭 컨텐츠 */}
      <Tabs defaultValue="events" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            실시간 이벤트
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            통계
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            에이전트 추적
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <Card className="p-4 bg-gradient-card border-0">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-depth-primary" />
              <h4 className="font-medium text-depth-primary">실시간 시뮬레이션 이벤트</h4>
              <Badge variant="outline" className={isMonitoring ? "border-green-500 text-green-700" : "border-gray-500"}>
                {isMonitoring ? 'LIVE' : 'STOPPED'}
              </Badge>
            </div>
            
            <ScrollArea className="h-96">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>이벤트가 없습니다</p>
                  <p className="text-xs mt-1">시뮬레이션을 시작하고 모니터링을 활성화하세요</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map((message, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg border">
                      <div className="flex-shrink-0 mt-1">
                        {getOutcomeIcon(message.event.outcome || 'neutral')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-depth-primary">
                              {message.agentId}
                            </span>
                            <Badge 
                              className={`text-xs px-2 py-0 ${getEventTypeColor(message.event.event_type)}`}
                            >
                              {message.event.event_type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {formatTimestamp(message.timestamp)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {message.event.details}
                        </p>
                        {message.event.impact_tags && message.event.impact_tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {message.event.impact_tags.map((tag, tagIndex) => (
                              <Badge 
                                key={tagIndex} 
                                variant="secondary" 
                                className="text-xs px-1 py-0"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid gap-4">
            <Card className="p-4 bg-gradient-card border-0">
              <h4 className="font-medium text-depth-primary mb-3">이벤트 버스 통계</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>상태:</span>
                  <span className={busStats.isActive ? "text-green-600" : "text-gray-500"}>
                    {busStats.isActive ? '활성' : '비활성'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>총 메시지:</span>
                  <span>{busStats.totalMessages || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>구독자 수:</span>
                  <span>{busStats.activeSubscribers?.length || 0}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-card border-0">
              <h4 className="font-medium text-depth-primary mb-3">페르소나 업데이트 통계</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>총 업데이트:</span>
                  <span>{personaStats.totalUpdates || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>평균 신뢰도:</span>
                  <span>{personaStats.averageConfidence ? (personaStats.averageConfidence * 100).toFixed(1) + '%' : '0%'}</span>
                </div>
                <div className="flex justify-between">
                  <span>서비스 상태:</span>
                  <span className={personaStats.isActive ? "text-green-600" : "text-gray-500"}>
                    {personaStats.isActive ? '활성' : '비활성'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents">
          <Card className="p-4 bg-gradient-card border-0">
            <h4 className="font-medium text-depth-primary mb-3">에이전트별 활동 추적</h4>
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>에이전트별 상세 통계</p>
              <p className="text-xs mt-1">개발 중인 기능입니다</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventBusMonitor;