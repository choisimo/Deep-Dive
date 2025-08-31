import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Cpu, Heart, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-surface flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-depth-primary/5 via-transparent to-depth-secondary/5" />
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-depth-tertiary/20 blur-xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-depth-quaternary/20 blur-xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-deep bg-clip-text text-transparent">
              Deep Dive
            </h1>
            <p className="text-xl md:text-2xl text-depth-primary font-medium mb-4">
              프로젝트: 딥 다이브
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              기술-자원 중심의 미래 예측을 넘어, 인간의 심리적 동인과 철학적 가치관을 융합한<br />
              새로운 미래 설계 프레임워크
            </p>
          </div>
          
          {/* Four Dimensions Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="group p-6 rounded-2xl bg-gradient-card shadow-card-custom hover:shadow-depth transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-depth-primary/10 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-depth-primary" />
              </div>
              <h3 className="font-semibold text-sm text-depth-primary">기술/자원</h3>
            </div>
            
            <div className="group p-6 rounded-2xl bg-gradient-card shadow-card-custom hover:shadow-depth transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-depth-secondary/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-depth-secondary" />
              </div>
              <h3 className="font-semibold text-sm text-depth-secondary">심리적 동인</h3>
            </div>
            
            <div className="group p-6 rounded-2xl bg-gradient-card shadow-card-custom hover:shadow-depth transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-depth-tertiary/30 flex items-center justify-center">
                <Scale className="w-6 h-6 text-depth-primary" />
              </div>
              <h3 className="font-semibold text-sm text-depth-primary">철학적 렌즈</h3>
            </div>
            
            <div className="group p-6 rounded-2xl bg-gradient-card shadow-card-custom hover:shadow-depth transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-depth-quaternary/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-depth-quaternary" />
              </div>
              <h3 className="font-semibold text-sm text-depth-quaternary">제3의 쿠다</h3>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/simulation">
              <Button 
                size="lg" 
                className="bg-gradient-deep text-white border-0 hover:shadow-depth transition-all duration-300 px-8"
              >
                시뮬레이션 탐색하기
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-depth-primary text-depth-primary hover:bg-depth-primary/5 px-8"
            >
              백서 읽기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;