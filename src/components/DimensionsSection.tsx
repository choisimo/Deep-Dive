import { Card } from "@/components/ui/card";
import { Brain, Cpu, Scale, Lightbulb, Users, Shield, Zap, Target } from "lucide-react";

const DimensionsSection = () => {
  const dimensions = [
    {
      title: "기술/자원 벡터",
      subtitle: "Technology & Resource Vectors",
      icon: Cpu,
      color: "depth-primary",
      description: "AI, BCI, 양자컴퓨팅 등 핵심 기술과 에너지, 데이터 등 자원의 제약을 모델링합니다.",
      items: ["인공지능 (LLM, AGI)", "뇌-컴퓨터 인터페이스", "양자 컴퓨팅", "탈중앙화 기술"]
    },
    {
      title: "심리적 동인 매트릭스",
      subtitle: "Psychological Driver Matrix",
      icon: Brain,
      color: "depth-secondary",
      description: "인간 행동을 유발하는 4대 동인을 정의하고 각 기술이 어떤 동인을 자극하는지 매핑합니다.",
      items: ["연결/소속감", "성장/자아실현", "안전/통제", "쾌락/유희"]
    },
    {
      title: "철학적 렌즈 프레임워크",
      subtitle: "Philosophical Lens Framework",
      icon: Scale,
      color: "depth-primary",
      description: "미래 사회의 '목표 함수' 역할을 하는 철학적 가치관을 시스템 아키텍처에 적용합니다.",
      items: ["공리주의", "의무론", "실존주의", "공동체주의"]
    },
    {
      title: "제3의 쿠다 발굴",
      subtitle: "The 3rd Cuda Discovery",
      icon: Lightbulb,
      color: "depth-quaternary",
      description: "여러 시나리오에서 공통으로 긍정적 결과를 도출하는 핵심 '기반 시스템'을 발굴합니다.",
      items: ["신뢰 인프라", "의미 설계 플랫폼", "가치 충돌 해결 프로토콜", "사회 운영체제"]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-depth-primary">
            다차원 변수 모델링
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            미래 사회를 시뮬레이션하기 위한 4개 차원의 통합적 접근법
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {dimensions.map((dimension, index) => (
            <Card 
              key={index} 
              className="p-8 bg-gradient-card shadow-card-custom hover:shadow-depth transition-all duration-300 border-0"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-${dimension.color}/10 flex items-center justify-center flex-shrink-0`}>
                  <dimension.icon className={`w-8 h-8 text-${dimension.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-depth-primary mb-1">
                    {dimension.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {dimension.subtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {dimension.description}
              </p>
              
              <div className="space-y-2">
                {dimension.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-${dimension.color}`} />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DimensionsSection;