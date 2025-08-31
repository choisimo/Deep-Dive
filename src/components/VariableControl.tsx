import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cpu, 
  Brain, 
  Scale, 
  Lightbulb,
  RotateCcw,
  Save,
  Upload
} from "lucide-react";

interface VariableControlProps {
  variableState?: Record<string, any>;
  onVariableChange?: (variableId: string, newValue: any) => void;
}

interface VariableState {
  // 기술/자원 변수
  aiMaturity: number;
  quantumComputing: number;
  energyAvailability: number;
  dataAccessibility: number;
  
  // 심리적 동인 변수
  connectionNeed: number;
  growthMotivation: number;
  safetyDesire: number;
  pleasureSeeking: number;
  
  // 철학적 렌즈 변수
  utilitarianWeight: number;
  deontologicalWeight: number;
  existentialWeight: number;
  communitarianWeight: number;
  
  // 제3의 쿠다 변수
  trustInfrastructure: number;
  meaningDesignPlatform: number;
  valueAlignmentProtocol: number;
}

const VariableControl = ({ variableState, onVariableChange }: VariableControlProps) => {
  const [variables, setVariables] = useState<VariableState>({
    // 기술/자원 변수 (0-100)
    aiMaturity: 65,
    quantumComputing: 25,
    energyAvailability: 70,
    dataAccessibility: 80,
    
    // 심리적 동인 변수 (0-100)
    connectionNeed: 75,
    growthMotivation: 68,
    safetyDesire: 72,
    pleasureSeeking: 55,
    
    // 철학적 렌즈 변수 (0-100, 합이 100이 되도록 정규화)
    utilitarianWeight: 25,
    deontologicalWeight: 25,
    existentialWeight: 25,
    communitarianWeight: 25,
    
    // 제3의 쿠다 변수 (0-100)
    trustInfrastructure: 45,
    meaningDesignPlatform: 35,
    valueAlignmentProtocol: 40,
  });

  const [presets] = useState([
    { name: '현재 상태', id: 'current' },
    { name: '기술 낙관적', id: 'tech-optimistic' },
    { name: '인간 중심', id: 'human-centric' },
    { name: '균형적 발전', id: 'balanced' },
  ]);

  const updateVariable = (key: keyof VariableState, value: number[]) => {
    const newState = {
      ...variables,
      [key]: value[0]
    };
    setVariables(newState);
    
    // Call external handler if provided
    if (onVariableChange) {
      onVariableChange(key, value[0]);
    }
  };

  const resetToDefaults = () => {
    setVariables({
      aiMaturity: 65,
      quantumComputing: 25,
      energyAvailability: 70,
      dataAccessibility: 80,
      connectionNeed: 75,
      growthMotivation: 68,
      safetyDesire: 72,
      pleasureSeeking: 55,
      utilitarianWeight: 25,
      deontologicalWeight: 25,
      existentialWeight: 25,
      communitarianWeight: 25,
      trustInfrastructure: 45,
      meaningDesignPlatform: 35,
      valueAlignmentProtocol: 40,
    });
  };

  const VariableSlider = ({ 
    label, 
    value, 
    onChange, 
    description,
    min = 0,
    max = 100 
  }: {
    label: string;
    value: number;
    onChange: (value: number[]) => void;
    description: string;
    min?: number;
    max?: number;
  }) => (
    <Card className="p-4 bg-gradient-card border-0">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-depth-primary">{label}</h4>
        <Badge variant="outline" className="text-xs">
          {value}%
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <Slider
        value={[value]}
        onValueChange={onChange}
        max={max}
        min={min}
        step={1}
        className="w-full"
      />
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-depth-primary mb-2">변수 조정 패널</h2>
          <p className="text-muted-foreground">
            시뮬레이션 변수를 조정하여 다양한 시나리오의 영향을 테스트해보세요
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={resetToDefaults}>
            <RotateCcw className="w-4 h-4 mr-2" />
            초기화
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            불러오기
          </Button>
          <Button className="bg-gradient-deep text-white">
            <Save className="w-4 h-4 mr-2" />
            저장
          </Button>
        </div>
      </div>

      {/* 프리셋 선택 */}
      <Card className="p-4 bg-gradient-card border-0">
        <h3 className="font-semibold text-depth-primary mb-3">프리셋</h3>
        <div className="flex gap-2 flex-wrap">
          {presets.map((preset) => (
            <Button 
              key={preset.id}
              variant="outline"
              size="sm"
              className="border-depth-primary/30"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </Card>

      <Tabs defaultValue="technology" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="technology" className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            기술/자원
          </TabsTrigger>
          <TabsTrigger value="psychology" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            심리적 동인
          </TabsTrigger>
          <TabsTrigger value="philosophy" className="flex items-center gap-2">
            <Scale className="w-4 h-4" />
            철학적 렌즈
          </TabsTrigger>
          <TabsTrigger value="cuda" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            제3의 쿠다
          </TabsTrigger>
        </TabsList>

        <TabsContent value="technology" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <VariableSlider
              label="AI 기술 성숙도"
              value={variables.aiMaturity}
              onChange={(value) => updateVariable('aiMaturity', value)}
              description="인공지능 기술의 발전 수준과 사회적 통합 정도"
            />
            <VariableSlider
              label="양자 컴퓨팅"
              value={variables.quantumComputing}
              onChange={(value) => updateVariable('quantumComputing', value)}
              description="양자 컴퓨팅 기술의 상용화 및 활용 범위"
            />
            <VariableSlider
              label="에너지 가용성"
              value={variables.energyAvailability}
              onChange={(value) => updateVariable('energyAvailability', value)}
              description="청정 에너지의 공급량과 접근 가능성"
            />
            <VariableSlider
              label="데이터 접근성"
              value={variables.dataAccessibility}
              onChange={(value) => updateVariable('dataAccessibility', value)}
              description="개인과 기업의 데이터 접근 및 활용 용이성"
            />
          </div>
        </TabsContent>

        <TabsContent value="psychology" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <VariableSlider
              label="연결/소속감 욕구"
              value={variables.connectionNeed}
              onChange={(value) => updateVariable('connectionNeed', value)}
              description="사회적 관계와 소속감에 대한 인간의 기본적 욕구"
            />
            <VariableSlider
              label="성장/자아실현 동기"
              value={variables.growthMotivation}
              onChange={(value) => updateVariable('growthMotivation', value)}
              description="개인적 발전과 자아실현을 추구하는 동력"
            />
            <VariableSlider
              label="안전/통제 욕구"
              value={variables.safetyDesire}
              onChange={(value) => updateVariable('safetyDesire', value)}
              description="안전과 예측 가능성에 대한 인간의 기본 욕구"
            />
            <VariableSlider
              label="쾌락/유희 추구"
              value={variables.pleasureSeeking}
              onChange={(value) => updateVariable('pleasureSeeking', value)}
              description="즐거움과 만족을 추구하는 인간의 기본 성향"
            />
          </div>
        </TabsContent>

        <TabsContent value="philosophy" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <VariableSlider
              label="공리주의 가중치"
              value={variables.utilitarianWeight}
              onChange={(value) => updateVariable('utilitarianWeight', value)}
              description="최대 행복을 추구하는 공리주의적 가치관의 영향력"
            />
            <VariableSlider
              label="의무론적 가중치"
              value={variables.deontologicalWeight}
              onChange={(value) => updateVariable('deontologicalWeight', value)}
              description="도덕적 의무와 원칙을 중시하는 가치관의 영향력"
            />
            <VariableSlider
              label="실존주의 가중치"
              value={variables.existentialWeight}
              onChange={(value) => updateVariable('existentialWeight', value)}
              description="개인의 자유와 선택을 강조하는 가치관의 영향력"
            />
            <VariableSlider
              label="공동체주의 가중치"
              value={variables.communitarianWeight}
              onChange={(value) => updateVariable('communitarianWeight', value)}
              description="공동체의 가치와 연대를 중시하는 가치관의 영향력"
            />
          </div>
        </TabsContent>

        <TabsContent value="cuda" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <VariableSlider
              label="신뢰 인프라"
              value={variables.trustInfrastructure}
              onChange={(value) => updateVariable('trustInfrastructure', value)}
              description="인간과 기술 간 신뢰를 보장하는 시스템적 장치"
            />
            <VariableSlider
              label="의미 설계 플랫폼"
              value={variables.meaningDesignPlatform}
              onChange={(value) => updateVariable('meaningDesignPlatform', value)}
              description="개인이 새로운 삶의 목적을 찾도록 지원하는 시스템"
            />
            <VariableSlider
              label="가치 충돌 해결 프로토콜"
              value={variables.valueAlignmentProtocol}
              onChange={(value) => updateVariable('valueAlignmentProtocol', value)}
              description="상충하는 가치에 대한 사회적 합의 도출 시스템"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* 변수 요약 */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card-custom">
        <h3 className="text-lg font-bold text-depth-primary mb-4">현재 설정 요약</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-depth-primary mb-2">기술/자원</h4>
            <p>AI 성숙도: {variables.aiMaturity}%</p>
            <p>양자컴퓨팅: {variables.quantumComputing}%</p>
            <p>에너지: {variables.energyAvailability}%</p>
            <p>데이터: {variables.dataAccessibility}%</p>
          </div>
          <div>
            <h4 className="font-semibold text-depth-primary mb-2">심리적 동인</h4>
            <p>연결욕구: {variables.connectionNeed}%</p>
            <p>성장동기: {variables.growthMotivation}%</p>
            <p>안전욕구: {variables.safetyDesire}%</p>
            <p>쾌락추구: {variables.pleasureSeeking}%</p>
          </div>
          <div>
            <h4 className="font-semibold text-depth-primary mb-2">철학적 렌즈</h4>
            <p>공리주의: {variables.utilitarianWeight}%</p>
            <p>의무론: {variables.deontologicalWeight}%</p>
            <p>실존주의: {variables.existentialWeight}%</p>
            <p>공동체주의: {variables.communitarianWeight}%</p>
          </div>
          <div>
            <h4 className="font-semibold text-depth-primary mb-2">제3의 쿠다</h4>
            <p>신뢰인프라: {variables.trustInfrastructure}%</p>
            <p>의미설계: {variables.meaningDesignPlatform}%</p>
            <p>가치정렬: {variables.valueAlignmentProtocol}%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VariableControl;