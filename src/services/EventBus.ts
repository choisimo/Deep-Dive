// Event Bus Service - 시뮬레이션 이벤트 기반 통신 시스템
import type { EventBusMessage, SimulationEvent } from '@/types/simulation';

type EventHandler = (message: EventBusMessage) => void;

export class EventBus {
  private static instance: EventBus;
  private subscribers: Map<string, EventHandler[]> = new Map();
  private messageHistory: EventBusMessage[] = [];
  private isActive: boolean = true;

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  // 토픽에 이벤트 발행 (Simulation Engine에서 사용)
  public publish(topic: string, agentId: string, event: SimulationEvent, metadata?: Record<string, any>): void {
    if (!this.isActive) return;

    const message: EventBusMessage = {
      messageId: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      topic,
      timestamp: new Date().toISOString(),
      agentId,
      event,
      metadata
    };

    // 메시지 히스토리에 저장 (최근 1000개만 유지)
    this.messageHistory.push(message);
    if (this.messageHistory.length > 1000) {
      this.messageHistory.splice(0, 100); // 100개씩 제거
    }

    // 구독자들에게 메시지 전달
    const handlers = this.subscribers.get(topic) || [];
    handlers.forEach(handler => {
      try {
        handler(message);
      } catch (error) {
        console.error(`Event handler error for topic ${topic}:`, error);
      }
    });

    console.log(`📡 [EventBus] Published to ${topic}:`, {
      agentId,
      eventType: event.event_type,
      details: event.details.substring(0, 50) + '...'
    });
  }

  // 토픽 구독 (Persona Update Service에서 사용)
  public subscribe(topic: string, handler: EventHandler): () => void {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, []);
    }
    
    this.subscribers.get(topic)!.push(handler);
    
    console.log(`🔔 [EventBus] New subscriber for topic: ${topic}`);

    // 구독 해제 함수 반환
    return () => {
      const handlers = this.subscribers.get(topic) || [];
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    };
  }

  // 특정 에이전트의 이벤트 히스토리 조회
  public getAgentEventHistory(agentId: string): EventBusMessage[] {
    return this.messageHistory.filter(msg => msg.agentId === agentId);
  }

  // 토픽별 메시지 조회
  public getTopicMessages(topic: string, limit: number = 50): EventBusMessage[] {
    return this.messageHistory
      .filter(msg => msg.topic === topic)
      .slice(-limit);
  }

  // 전체 메시지 통계
  public getStatistics() {
    const topicStats = new Map<string, number>();
    this.messageHistory.forEach(msg => {
      topicStats.set(msg.topic, (topicStats.get(msg.topic) || 0) + 1);
    });

    return {
      totalMessages: this.messageHistory.length,
      activeSubscribers: Array.from(this.subscribers.entries()).map(([topic, handlers]) => ({
        topic,
        handlerCount: handlers.length
      })),
      topicMessageCounts: Object.fromEntries(topicStats),
      isActive: this.isActive
    };
  }

  // 이벤트 버스 활성화/비활성화
  public setActive(active: boolean) {
    this.isActive = active;
    console.log(`🔄 [EventBus] ${active ? 'Activated' : 'Deactivated'}`);
  }

  // 메시지 히스토리 초기화
  public clearHistory() {
    this.messageHistory = [];
    console.log('🧹 [EventBus] Message history cleared');
  }
}

// 전역 이벤트 버스 인스턴스
export const eventBus = EventBus.getInstance();