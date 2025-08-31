import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Cpu, User, CheckCircle } from "lucide-react";

interface ScenarioSelectorProps {
  selectedScenario: string;
  onScenarioChange: (scenario: string) => void;
}

const scenarios = [
  {
    id: 'empathic',
    title: '공감과 연결의 시대',
    subtitle: 'Empathic Renaissance',
    icon: Heart,
    philosophy: ['공동체주의', '의무론'],
    technologies: ['감성 컴퓨팅', '심리 상담 AI', '탈중앙화 소셜 플랫폼'],
    metrics: ['정신 건강 지수', '사회적 신뢰도', '공동체 참여율'],
    description: '인간의 감정과 공감 능력을 중심으로 한 기술 발전을 통해 더 따뜻한 사회를 만드는 시나리오입니다.',
    color: 'from-pink-500/20 to-purple-500/20',
    borderColor: 'border-pink-500/30'
  },
  {
    id: 'optimized',
    title: '효율과 최적화의 시대',
    subtitle: 'Optimized Society',
    icon: Cpu,
    philosophy: ['공리주의'],
    technologies: ['중앙화된 초거대 AI', '사회 신용 시스템', '예측적 거버넌스'],
    metrics: ['자원 분배 효율성', 'GDP 성장률', '범죄율 감소'],
    description: '데이터와 AI 기반의 최적화를 통해 사회 전체의 효율성과 생산성을 극대화하는 시나리오입니다.',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30'
  },
  {
    id: 'sovereign',
    title: '개인 주권의 시대',
    subtitle: 'Sovereign Individual',
    icon: User,
    philosophy: ['실존주의'],
    technologies: ['탈중앙화 AI', '영지식 증명', '개인 데이터 저장소'],
    metrics: ['경제적 자율성', '데이터 주권 지수', '사회적 변동성'],
    description: '개인의 자율성과 선택권을 최대화하며, 각자가 자신만의 길을 선택할 수 있는 사회를 그리는 시나리오입니다.',
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30'
  }
];

const ScenarioSelector = ({ selectedScenario, onScenarioChange }: ScenarioSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-depth-primary mb-3">시나리오 선택</h2>
        <p className="text-muted-foreground">
          다양한 철학적 렌즈가 지배하는 미래 사회 시나리오 중 하나를 선택하여 시뮬레이션을 실행해보세요
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <Card 
            key={scenario.id}
            className={`relative p-6 bg-gradient-to-br ${scenario.color} border ${scenario.borderColor} shadow-card-custom hover:shadow-depth transition-all duration-300 cursor-pointer ${
              selectedScenario === scenario.id ? 'ring-2 ring-depth-primary' : ''
            }`}
            onClick={() => onScenarioChange(scenario.id)}
          >
            {selectedScenario === scenario.id && (
              <div className="absolute top-4 right-4">
                <CheckCircle className="w-6 h-6 text-depth-primary" />
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <scenario.icon className="w-7 h-7 text-depth-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-depth-primary mb-1">
                  {scenario.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {scenario.subtitle}
                </p>
              </div>
            </div>

            <p className="text-sm text-foreground mb-4 leading-relaxed">
              {scenario.description}
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-depth-primary mb-2">지배 철학</h4>
                <div className="flex flex-wrap gap-1">
                  {scenario.philosophy.map((phil, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {phil}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-depth-primary mb-2">핵심 기술</h4>
                <div className="space-y-1">
                  {scenario.technologies.slice(0, 2).map((tech, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-depth-primary" />
                      <span className="text-xs text-foreground">{tech}</span>
                    </div>
                  ))}
                  {scenario.technologies.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      +{scenario.technologies.length - 2}개 더
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-depth-primary mb-2">주요 지표</h4>
                <div className="space-y-1">
                  {scenario.metrics.slice(0, 2).map((metric, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-depth-secondary" />
                      <span className="text-xs text-foreground">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                className={`w-full ${
                  selectedScenario === scenario.id 
                    ? 'bg-gradient-deep text-white' 
                    : 'bg-white/30 backdrop-blur-sm text-depth-primary hover:bg-white/50'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onScenarioChange(scenario.id);
                }}
              >
                {selectedScenario === scenario.id ? '선택됨' : '시나리오 선택'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* ���나리오 비교 */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card-custom">
        <h3 className="text-lg font-bold text-depth-primary mb-4">시나리오 비교 분석</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-depth-primary/20">
                <th className="text-left p-2 text-depth-primary font-semibold">구분</th>
                <th className="text-left p-2 text-depth-primary font-semibold">공감과 연결</th>
                <th className="text-left p-2 text-depth-primary font-semibold">효율과 최적화</th>
                <th className="text-left p-2 text-depth-primary font-semibold">개인 주권</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-depth-primary/10">
                <td className="p-2 font-medium text-muted-foreground">주요 가치</td>
                <td className="p-2">공동체, 신뢰</td>
                <td className="p-2">효율성, 최적화</td>
                <td className="p-2">자율성, 선택권</td>
              </tr>
              <tr className="border-b border-depth-primary/10">
                <td className="p-2 font-medium text-muted-foreground">기술 접근</td>
                <td className="p-2">인간 중심적</td>
                <td className="p-2">데이터 중심적</td>
                <td className="p-2">개인 중심적</td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-muted-foreground">거버넌스</td>
                <td className="p-2">참여형 민주주의</td>
                <td className="p-2">기술관료제</td>
                <td className="p-2">분산형 자치</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ScenarioSelector;