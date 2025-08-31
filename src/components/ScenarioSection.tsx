import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Cpu, User, ArrowRight } from "lucide-react";

const ScenarioSection = () => {
  const scenarios = [
    {
      title: "공감과 연결의 시대",
      subtitle: "Empathic Renaissance",
      icon: Heart,
      philosophy: "공동체주의 + 의무론",
      technologies: ["감성 컴퓨팅", "심리 상담 AI", "탈중앙화 소셜 플랫폼"],
      metrics: ["정신 건강 지수", "사회적 신뢰도", "공동체 참여율"],
      color: "bg-gradient-to-br from-pink-500/20 to-purple-500/20",
      borderColor: "border-pink-500/30"
    },
    {
      title: "효율과 최적화의 시대",
      subtitle: "Optimized Society",
      icon: Cpu,
      philosophy: "공리주의",
      technologies: ["중앙화된 초거대 AI", "사회 신용 시스템", "예측적 거버넌스"],
      metrics: ["자원 분배 효율성", "GDP 성장률", "범죄율 감소"],
      color: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      title: "개인 주권의 시대",
      subtitle: "Sovereign Individual",
      icon: User,
      philosophy: "실존주의",
      technologies: ["탈중앙화 AI", "영지식 증명", "개인 데이터 저장소"],
      metrics: ["경제적 자율성", "데이터 주권 지수", "사회적 변동성"],
      color: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    }
  ];

  return (
    <section className="py-24 bg-gradient-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-depth-primary">
            세계관 시나리오 시뮬레이션
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            다양한 철학적 렌즈가 지배하는 가상 사회 시나리오를 통해<br />
            미래 사회의 다양한 가능성을 탐색합니다
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {scenarios.map((scenario, index) => (
            <Card 
              key={index}
              className={`p-8 ${scenario.color} border ${scenario.borderColor} shadow-card-custom hover:shadow-depth transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <scenario.icon className="w-7 h-7 text-depth-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-depth-primary mb-1">
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {scenario.subtitle}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-depth-primary mb-2">지배 철학</h4>
                <p className="text-sm bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 text-depth-primary">
                  {scenario.philosophy}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-depth-primary mb-3">핵심 기술</h4>
                <div className="space-y-2">
                  {scenario.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-depth-primary" />
                      <span className="text-sm text-foreground">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-depth-primary mb-3">주요 지표</h4>
                <div className="space-y-2">
                  {scenario.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-depth-secondary" />
                      <span className="text-sm text-foreground">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-depth-primary/30 text-depth-primary hover:bg-depth-primary/10"
              >
                시나리오 탐색
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScenarioSection;