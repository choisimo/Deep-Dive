import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricsPanelProps {
  metrics: {
    socialTrust: number;
    resourceEfficiency: number;
    individualAutonomy: number;
    communityWellbeing: number;
  };
}

const MetricsPanel = ({ metrics }: MetricsPanelProps) => {
  const metricDetails = [
    {
      key: 'socialTrust',
      label: '사회적 신뢰도',
      value: metrics.socialTrust,
      description: '사회 구성원 간의 신뢰 수준',
      trend: 'up',
      color: 'depth-primary'
    },
    {
      key: 'resourceEfficiency',
      label: '자원 효율성',
      value: metrics.resourceEfficiency,
      description: '자원 분배 및 활용의 최적화 정도',
      trend: 'stable',
      color: 'depth-secondary'
    },
    {
      key: 'individualAutonomy',
      label: '개인 자율성',
      value: metrics.individualAutonomy,
      description: '개인의 선택권과 자기결정권 수준',
      trend: 'down',
      color: 'depth-tertiary'
    },
    {
      key: 'communityWellbeing',
      label: '공동체 복리',
      value: metrics.communityWellbeing,
      description: '공동체 전체의 행복과 발전 정도',
      trend: 'up',
      color: 'depth-quaternary'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getProgressColor = (value: number) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {metricDetails.map((metric) => (
          <Card key={metric.key} className="p-6 bg-gradient-card border-0 shadow-card-custom">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-${metric.color}/10 flex items-center justify-center`}>
                  <div className={`w-6 h-6 rounded-full bg-${metric.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-depth-primary">{metric.label}</h3>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(metric.trend)}
                <span className="text-2xl font-bold text-depth-primary">
                  {Math.round(metric.value)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">진행률</span>
                <span className="font-medium">{Math.round(metric.value)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(metric.value)}`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 종합 분석 */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card-custom">
        <h3 className="text-xl font-bold text-depth-primary mb-4">종합 분석</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="font-semibold text-depth-primary mb-1">긍정적 지표</h4>
            <p className="text-sm text-muted-foreground">
              사회적 신뢰도와 공동체 복리가 상승 추세를 보이고 있습니다.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Minus className="w-8 h-8 text-yellow-500" />
            </div>
            <h4 className="font-semibold text-depth-primary mb-1">안정적 지표</h4>
            <p className="text-sm text-muted-foreground">
              자원 효율성은 안정적인 수준을 유지하고 있습니다.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
            <h4 className="font-semibold text-depth-primary mb-1">주의 지표</h4>
            <p className="text-sm text-muted-foreground">
              개인 자율성 지표에 대한 모니터링이 필요합니다.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MetricsPanel;