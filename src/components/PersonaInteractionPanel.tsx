import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, Lightbulb, AlertTriangle, User, Target } from "lucide-react";
import type { Agent } from "@/types/simulation";

interface PersonaInteractionPanelProps {
  selectedAgent: Agent | null;
  onInteractionComplete?: (result: any) => void;
}

const PersonaInteractionPanel = ({ selectedAgent, onInteractionComplete }: PersonaInteractionPanelProps) => {
  const [userMessage, setUserMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [echoResponse, setEchoResponse] = useState('');
  const [antiEchoResponse, setAntiEchoResponse] = useState('');

  if (!selectedAgent) {
    return (
      <Card className="p-6 bg-gradient-card border-0">
        <div className="text-center py-8">
          <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-depth-primary mb-2">
            에이전트를 선택해주세요
          </h3>
          <p className="text-muted-foreground">
            페르소나 기반 상호작용을 위해 네트워크에서 에이전트를 선택하세요
          </p>
        </div>
      </Card>
    );
  }

  const generateEchoResponse = async (message: string) => {
    setIsProcessing(true);
    try {
      // Simulate Echo mode response based on agent's UPDM
      const personality = selectedAgent.updm.personality_traits;
      const values = selectedAgent.updm.value_system;
      
      // Create a personality-aligned response
      const traits = {
        openness: personality.openness.score,
        conscientiousness: personality.conscientiousness.score,
        extraversion: personality.extraversion.score,
        agreeableness: personality.agreeableness.score,
        neuroticism: personality.neuroticism.score
      };

      let response = '';
      
      if (traits.agreeableness > 0.7) {
        response = `저는 그 의견에 대해 공감하면서 생각해보게 됩니다. `;
      } else if (traits.openness > 0.7) {
        response = `흥미로운 관점이네요. 다양한 각도에서 생각해볼 필요가 있겠어요. `;
      } else if (traits.conscientiousness > 0.7) {
        response = `체계적으로 접근해봐야겠습니다. `;
      }

      if (values.universalism > 0.7) {
        response += `모든 사람에게 도움이 되는 방향으로 생각해보면, `;
      } else if (values.achievement > 0.7) {
        response += `성과를 중심으로 생각해보면, `;
      } else if (values.security > 0.7) {
        response += `안전성을 고려했을 때, `;
      }

      response += `"${message}"에 대한 제 생각은 이렇습니다...`;

      setEchoResponse(response);
    } catch (error) {
      console.error('Echo response generation failed:', error);
      setEchoResponse('응답 생성 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const generateAntiEchoResponse = async (message: string) => {
    setIsProcessing(true);
    try {
      // Simulate Anti-Echo mode using Chain-of-Thought approach
      const personality = selectedAgent.updm.personality_traits;
      const values = selectedAgent.updm.value_system;

      // Create contrasting persona
      const antiPersonality = {
        openness: 1 - personality.openness.score,
        conscientiousness: 1 - personality.conscientiousness.score,
        extraversion: 1 - personality.extraversion.score,
        agreeableness: 1 - personality.agreeableness.score,
        neuroticism: 1 - personality.neuroticism.score
      };

      let response = `**분석 과정:**\n\n`;
      response += `1. **현재 페르소나 특성**: `;
      if (personality.agreeableness.score > 0.7) response += `높은 우호성, `;
      if (personality.openness.score > 0.7) response += `높은 개방성, `;
      if (personality.conscientiousness.score > 0.7) response += `높은 성실성`;
      
      response += `\n\n2. **대조적 관점에서 보면**: `;
      if (antiPersonality.agreeableness > 0.7) {
        response += `때로는 더 비판적이고 직접적인 접근이 필요할 수 있습니다. `;
      }
      if (antiPersonality.openness > 0.7) {
        response += `기존의 검증된 방식에 집중하는 것도 중요합니다. `;
      }

      response += `\n\n**건설적 피드백:**\n`;
      response += `"${message}"에 대해 다른 각도에서 생각해보면, 당신의 접근 방식에는 몇 가지 고려해볼 점들이 있습니다...`;

      setAntiEchoResponse(response);
    } catch (error) {
      console.error('Anti-Echo response generation failed:', error);
      setAntiEchoResponse('비판적 분석 생성 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerate = async () => {
    if (!userMessage.trim()) return;
    
    await Promise.all([
      generateEchoResponse(userMessage),
      generateAntiEchoResponse(userMessage)
    ]);

    onInteractionComplete?.({
      agentId: selectedAgent.id,
      message: userMessage,
      echoResponse,
      antiEchoResponse,
      timestamp: new Date().toISOString()
    });
  };

  const getDominantTrait = () => {
    const traits = selectedAgent.updm.personality_traits;
    const scores = {
      openness: traits.openness.score,
      conscientiousness: traits.conscientiousness.score,
      extraversion: traits.extraversion.score,
      agreeableness: traits.agreeableness.score,
      neuroticism: traits.neuroticism.score
    };
    const dominant = Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b);
    return { trait: dominant[0], score: dominant[1] };
  };

  const getDominantValue = () => {
    const values = selectedAgent.updm.value_system;
    const dominant = Object.entries(values).reduce((a, b) => values[a[0]] > values[b[0]] ? a : b);
    return { value: dominant[0], score: dominant[1] };
  };

  const dominantTrait = getDominantTrait();
  const dominantValue = getDominantValue();

  return (
    <div className="space-y-6">
      {/* Agent Persona Summary */}
      <Card className="p-4 bg-gradient-card border-0">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-5 h-5 text-depth-primary" />
          <h3 className="font-semibold text-depth-primary">동적 페르소나 프로필</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">주요 성격 특성:</span>
            <Badge variant="outline" className="ml-2">
              {dominantTrait.trait} ({(dominantTrait.score * 100).toFixed(0)}%)
            </Badge>
          </div>
          <div>
            <span className="font-medium">핵심 가치:</span>
            <Badge variant="outline" className="ml-2">
              {dominantValue.value} ({(dominantValue.score * 100).toFixed(0)}%)
            </Badge>
          </div>
          <div>
            <span className="font-medium">철학적 성향:</span>
            <span className="ml-2 text-muted-foreground">{selectedAgent.philosophical_alignment}</span>
          </div>
          <div>
            <span className="font-medium">생활 로그:</span>
            <span className="ml-2 text-muted-foreground">{selectedAgent.life_log.length}개 이벤트</span>
          </div>
        </div>
      </Card>

      {/* Interaction Input */}
      <Card className="p-4 bg-gradient-card border-0">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-depth-primary" />
            <label className="font-medium text-depth-primary">메시지 입력</label>
          </div>
          
          <Textarea
            placeholder="에이전트와 상호작용할 메시지를 입력하세요... (예: '어려운 상황에서 어떻게 의사결정을 하시나요?')"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="min-h-[100px] bg-white/50"
          />
          
          <Button 
            onClick={handleGenerate}
            disabled={!userMessage.trim() || isProcessing}
            className="w-full bg-gradient-deep text-white"
          >
            {isProcessing ? '분석 중...' : '에코/안티-에코 생성'}
          </Button>
        </div>
      </Card>

      {/* Results */}
      {(echoResponse || antiEchoResponse) && (
        <Tabs defaultValue="echo" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="echo" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              에코 모드
            </TabsTrigger>
            <TabsTrigger value="anti-echo" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              안티-에코 모드
            </TabsTrigger>
          </TabsList>

          <TabsContent value="echo">
            <Card className="p-4 bg-gradient-card border-0">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-green-500" />
                <h4 className="font-medium text-depth-primary">페르소나 시뮬레이션 응답</h4>
                <Badge variant="secondary">Echo</Badge>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {echoResponse || '응답을 생성하려면 메시지를 입력하고 생성 버튼을 클릭하세요.'}
                </p>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                💡 이 응답은 선택된 에이전트의 성격 특성과 가치관을 반영하여 생성되었습니다.
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="anti-echo">
            <Card className="p-4 bg-gradient-card border-0">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <h4 className="font-medium text-depth-primary">건설적 비판 분석</h4>
                <Badge variant="destructive">Anti-Echo</Badge>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {antiEchoResponse || '응답을 생성하려면 메시지를 입력하고 생성 버튼을 클릭하세요.'}
                </p>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                🎯 이 분석은 Chain-of-Thought 프롬프팅을 통해 대조적 관점에서 생성된 건설적 피드백입니다.
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default PersonaInteractionPanel;