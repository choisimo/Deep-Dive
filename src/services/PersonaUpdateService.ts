// Persona Update Service - 시뮬레이션 이벤트 기반 페르소나 동적 업데이트
import type { 
  EventBusMessage, 
  SimulationEvent, 
  PersonaUpdateRequest, 
  PersonaUpdateResult,
  Agent,
  PersonalityTraits,
  SchwartzValueSystem
} from '@/types/simulation';
import { eventBus } from './EventBus';

export class PersonaUpdateService {
  private static instance: PersonaUpdateService;
  private unsubscribeSimulationEvents?: () => void;
  private updateHistory: PersonaUpdateResult[] = [];
  private isActive: boolean = false;

  private constructor() {
    this.initializeEventSubscriptions();
  }

  public static getInstance(): PersonaUpdateService {
    if (!PersonaUpdateService.instance) {
      PersonaUpdateService.instance = new PersonaUpdateService();
    }
    return PersonaUpdateService.instance;
  }

  // 시뮬레이션 이벤트 구독 초기화
  private initializeEventSubscriptions() {
    this.unsubscribeSimulationEvents = eventBus.subscribe('simulation-events', (message) => {
      this.processSimulationEvent(message);
    });
  }

  // 시뮬레이션 이벤트 처리
  private async processSimulationEvent(message: EventBusMessage) {
    if (!this.isActive) return;

    try {
      const updateRequest = this.analyzeEventForPersonaUpdate(message);
      if (updateRequest && updateRequest.confidence_score > 0.3) {
        const updateResult = await this.updatePersona(updateRequest);
        
        if (updateResult) {
          this.updateHistory.push(updateResult);
          
          // 페르소나 업데이트 완료 이벤트 발행
          eventBus.publish('persona-updates', message.agentId, {
            event_id: `persona-update-${Date.now()}`,
            timestamp: new Date().toISOString(),
            event_type: 'social_interaction',
            details: `Persona updated: ${updateResult.changes_summary}`,
            impact_tags: ['persona_evolution', 'dynamic_traits'],
            outcome: 'positive',
            magnitude: updateResult.confidence_score
          });

          console.log(`🧠 [PersonaUpdate] Updated persona for ${message.agentId}:`, updateResult.changes_summary);
        }
      }
    } catch (error) {
      console.error('Error processing simulation event for persona update:', error);
    }
  }

  // 이벤트 분석하여 페르소나 업데이트 필요성 판단
  private analyzeEventForPersonaUpdate(message: EventBusMessage): PersonaUpdateRequest | null {
    const event = message.event;
    const impactMap = this.getEventImpactMapping(event);
    
    if (impactMap.length === 0) return null;

    // 이벤트의 강도와 빈도를 고려한 신뢰도 계산
    const confidence = this.calculateUpdateConfidence(event, impactMap);
    
    if (confidence < 0.3) return null;

    return {
      agentId: message.agentId,
      events: [event],
      update_reason: `Event ${event.event_type}: ${event.details}`,
      confidence_score: confidence
    };
  }

  // 이벤트 타입별 성격/가치 영향 매핑
  private getEventImpactMapping(event: SimulationEvent): Array<{trait: string, change: number, type: 'personality' | 'value'}> {
    const impacts: Array<{trait: string, change: number, type: 'personality' | 'value'}> = [];

    switch (event.event_type) {
      case 'community_participation':
        impacts.push(
          { trait: 'agreeableness', change: 0.02, type: 'personality' },
          { trait: 'universalism', change: 0.015, type: 'value' },
          { trait: 'benevolence', change: 0.01, type: 'value' }
        );
        break;

      case 'technology_adoption':
        impacts.push(
          { trait: 'openness', change: 0.015, type: 'personality' },
          { trait: 'self_direction', change: 0.01, type: 'value' },
          { trait: 'stimulation', change: 0.01, type: 'value' }
        );
        break;

      case 'conflict_resolution':
        impacts.push(
          { trait: 'agreeableness', change: 0.025, type: 'personality' },
          { trait: 'conscientiousness', change: 0.015, type: 'personality' },
          { trait: 'benevolence', change: 0.02, type: 'value' }
        );
        break;

      case 'resource_allocation':
        impacts.push(
          { trait: 'conscientiousness', change: 0.01, type: 'personality' },
          { trait: 'achievement', change: 0.015, type: 'value' },
          { trait: 'security', change: 0.01, type: 'value' }
        );
        break;

      case 'social_interaction':
        impacts.push(
          { trait: 'extraversion', change: 0.01, type: 'personality' },
          { trait: 'agreeableness', change: 0.005, type: 'personality' }
        );
        break;

      case 'policy_support':
        // 정책 내용에 따라 다른 가치에 영향
        if (event.details.includes('universal') || event.details.includes('equality')) {
          impacts.push({ trait: 'universalism', change: 0.02, type: 'value' });
        }
        if (event.details.includes('security') || event.details.includes('safety')) {
          impacts.push({ trait: 'security', change: 0.015, type: 'value' });
        }
        break;
    }

    // 이벤트 결과에 따른 강도 조정
    const outcomeMultiplier = event.outcome === 'positive' ? 1.0 : 
                             event.outcome === 'negative' ? -0.5 : 0.3;
    
    const magnitudeMultiplier = event.magnitude || 1.0;

    return impacts.map(impact => ({
      ...impact,
      change: impact.change * outcomeMultiplier * magnitudeMultiplier
    }));
  }

  // 업데이트 신뢰도 계산
  private calculateUpdateConfidence(event: SimulationEvent, impacts: any[]): number {
    let baseConfidence = 0.5;

    // 영향 태그 개수에 따른 신뢰도 증가
    if (event.impact_tags && event.impact_tags.length > 0) {
      baseConfidence += event.impact_tags.length * 0.1;
    }

    // 이벤트 강도에 따른 조정
    if (event.magnitude) {
      baseConfidence *= event.magnitude;
    }

    // 영향 범위에 따른 조정
    baseConfidence += impacts.length * 0.05;

    return Math.min(1.0, Math.max(0.0, baseConfidence));
  }

  // 실제 페르소나 업데이트 수행
  private async updatePersona(request: PersonaUpdateRequest): Promise<PersonaUpdateResult | null> {
    // 실제 구현에서는 데이터베이스에서 에이전트 정보를 가져오고 업데이트
    // 여기서는 시뮬레이션을 위한 로직
    
    const changes: string[] = [];
    const updatedTraits: Partial<PersonalityTraits> = {};
    const updatedValues: Partial<SchwartzValueSystem> = {};

    for (const event of request.events) {
      const impacts = this.getEventImpactMapping(event);
      
      for (const impact of impacts) {
        if (impact.type === 'personality') {
          changes.push(`${impact.trait}: ${impact.change > 0 ? '+' : ''}${(impact.change * 100).toFixed(1)}%`);
        } else if (impact.type === 'value') {
          changes.push(`${impact.trait}: ${impact.change > 0 ? '+' : ''}${(impact.change * 100).toFixed(1)}%`);
        }
      }
    }

    if (changes.length === 0) return null;

    return {
      agentId: request.agentId,
      updated_traits: updatedTraits,
      updated_values: updatedValues,
      changes_summary: changes.join(', '),
      confidence_score: request.confidence_score
    };
  }

  // 에이전트의 페르소나 업데이트 히스토리 조회
  public getAgentUpdateHistory(agentId: string): PersonaUpdateResult[] {
    return this.updateHistory.filter(update => update.agentId === agentId);
  }

  // 서비스 통계
  public getStatistics() {
    const agentUpdateCounts = new Map<string, number>();
    this.updateHistory.forEach(update => {
      agentUpdateCounts.set(update.agentId, (agentUpdateCounts.get(update.agentId) || 0) + 1);
    });

    return {
      totalUpdates: this.updateHistory.length,
      agentUpdateCounts: Object.fromEntries(agentUpdateCounts),
      averageConfidence: this.updateHistory.length > 0 
        ? this.updateHistory.reduce((sum, update) => sum + update.confidence_score, 0) / this.updateHistory.length 
        : 0,
      isActive: this.isActive
    };
  }

  // 서비스 활성화/비활성화
  public setActive(active: boolean) {
    this.isActive = active;
    console.log(`🔄 [PersonaUpdate] Service ${active ? 'activated' : 'deactivated'}`);
  }

  // 서비스 정리
  public destroy() {
    if (this.unsubscribeSimulationEvents) {
      this.unsubscribeSimulationEvents();
    }
    this.isActive = false;
  }
}

// 전역 페르소나 업데이트 서비스 인스턴스
export const personaUpdateService = PersonaUpdateService.getInstance();