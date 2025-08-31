import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

interface SimulationChartsProps {
  metricsHistory?: Array<{
    socialTrust: number;
    resourceEfficiency: number;
    individualAutonomy: number;
    communityWellbeing: number;
    totalHappiness: number;
    privacyScore: number;
    freedomIndex: number;
  }>;
}

const SimulationCharts = ({ metricsHistory = [] }: SimulationChartsProps) => {
  // Generate time series data from metrics history or use fallback
  const timeSeriesData = metricsHistory.length > 0 
    ? metricsHistory.map((metrics, index) => ({
        step: index,
        ...metrics
      }))
    : [
        { step: 0, socialTrust: 65, resourceEfficiency: 72, individualAutonomy: 58, communityWellbeing: 69, totalHappiness: 66, privacyScore: 75, freedomIndex: 70 },
        { step: 10, socialTrust: 68, resourceEfficiency: 74, individualAutonomy: 55, communityWellbeing: 71, totalHappiness: 68, privacyScore: 76, freedomIndex: 72 },
        { step: 20, socialTrust: 72, resourceEfficiency: 73, individualAutonomy: 52, communityWellbeing: 74, totalHappiness: 70, privacyScore: 74, freedomIndex: 69 },
        { step: 30, socialTrust: 75, resourceEfficiency: 75, individualAutonomy: 50, communityWellbeing: 77, totalHappiness: 72, privacyScore: 77, freedomIndex: 71 },
      ];

  // Get current metrics (last item in history)
  const currentMetrics = metricsHistory.length > 0 
    ? metricsHistory[metricsHistory.length - 1] 
    : {
        socialTrust: 75,
        resourceEfficiency: 78,
        individualAutonomy: 68,
        communityWellbeing: 77,
        totalHappiness: 72,
        privacyScore: 77,
        freedomIndex: 71
      };

  const pieData = [
    { name: '사회적 신뢰', value: currentMetrics.socialTrust, color: '#10b981' },
    { name: '자원 효율성', value: currentMetrics.resourceEfficiency, color: '#3b82f6' },
    { name: '개인 자율성', value: currentMetrics.individualAutonomy, color: '#8b5cf6' },
    { name: '공동체 웰빙', value: currentMetrics.communityWellbeing, color: '#f59e0b' }
  ];

  const barData = [
    { name: '신뢰도', value: currentMetrics.socialTrust },
    { name: '효율성', value: currentMetrics.resourceEfficiency },
    { name: '자율성', value: currentMetrics.individualAutonomy },
    { name: '웰빙', value: currentMetrics.communityWellbeing },
    { name: '행복도', value: currentMetrics.totalHappiness },
    { name: '프라이버시', value: currentMetrics.privacyScore },
    { name: '자유도', value: currentMetrics.freedomIndex }
  ];

  return (
    <div className="space-y-6">
      {/* 시계열 지표 변화 */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card-custom">
        <h3 className="text-xl font-bold text-depth-primary mb-4">시뮬레이션 진행에 따른 지표 변화</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="step" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="socialTrust" 
                stroke="hsl(var(--depth-primary))" 
                strokeWidth={3}
                name="사회적 신뢰도"
              />
              <Line 
                type="monotone" 
                dataKey="resourceEfficiency" 
                stroke="hsl(var(--depth-secondary))" 
                strokeWidth={3}
                name="자원 효율성"
              />
              <Line 
                type="monotone" 
                dataKey="individualAutonomy" 
                stroke="hsl(var(--depth-tertiary))" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="개인 자율성"
              />
              <Line 
                type="monotone" 
                dataKey="communityWellbeing" 
                stroke="hsl(var(--depth-quaternary))" 
                strokeWidth={3}
                name="공동체 복리"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 지표별 현황 */}
        <Card className="p-6 bg-gradient-card border-0 shadow-card-custom">
          <h3 className="text-lg font-bold text-depth-primary mb-4">핵심 지표 현황</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 전체 지표 비교 */}
        <Card className="p-6 bg-gradient-card border-0 shadow-card-custom">
          <h3 className="text-lg font-bold text-depth-primary mb-4">전체 지표 비교</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--depth-primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SimulationCharts;