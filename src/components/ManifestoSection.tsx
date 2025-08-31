import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";

const ManifestoSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-depth-primary">
              미래 선언문
            </h2>
            <p className="text-lg text-muted-foreground">
              '제3의 쿠다'를 중심으로 한 바람직한 미래상과<br />
              이를 실현하기 위한 기술적, 윤리적 원칙
            </p>
          </div>

          <Card className="p-12 bg-gradient-card shadow-depth border-0 mb-12">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-deep flex items-center justify-center flex-shrink-0">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-depth-primary mb-3">
                  Project: Deep Dive Manifesto
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  '딥 다이브'가 그리는 바람직한 미래상과 핵심 원칙들을 담은 선언문입니다. 
                  발굴된 '제3의 쿠다'를 구축하고 운영하기 위한 가이드라인과 
                  현실화를 위한 단계별 실행 계획을 제시합니다.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-depth-primary/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-depth-primary" />
                </div>
                <h4 className="font-semibold text-depth-primary mb-2">비전</h4>
                <p className="text-sm text-muted-foreground">바람직한 미래상</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-depth-secondary/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-depth-secondary" />
                </div>
                <h4 className="font-semibold text-depth-primary mb-2">원칙</h4>
                <p className="text-sm text-muted-foreground">핵심 가이드라인</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-depth-quaternary/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-depth-quaternary" />
                </div>
                <h4 className="font-semibold text-depth-primary mb-2">로드맵</h4>
                <p className="text-sm text-muted-foreground">실행 계획</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-deep text-white border-0 hover:shadow-depth transition-all duration-300">
                <Download className="mr-2 w-4 h-4" />
                선언문 다운로드
              </Button>
              <Button variant="outline" className="border-depth-primary text-depth-primary hover:bg-depth-primary/5">
                <ExternalLink className="mr-2 w-4 h-4" />
                상세 백서 보기
              </Button>
            </div>
          </Card>

          <div className="bg-gradient-to-r from-depth-primary/5 to-depth-secondary/5 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-bold text-depth-primary mb-4">
              "불확실한 미래의 바다를 항해하는 우리 모두를 위한 깊이 있는 지도"
            </h3>
            <p className="text-muted-foreground">
              프로젝트: 딥 다이브는 미래에 대한 논의를 '무엇이 가능한가'에서<br />
              '무엇이 바람직한가'로 전환시키는 것을 목표로 합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;