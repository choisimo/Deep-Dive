// Data management interface for variables and parameters
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Plus, 
  Edit, 
  Search,
  Filter,
  Download,
  Upload
} from "lucide-react";
import { coreVariables, currentParameters, getVariablesByCategory } from "@/data/variables";
import type { Variable, Parameter } from "@/types/simulation";

const DataManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVariable, setSelectedVariable] = useState<Variable | null>(null);

  const categories = [
    { id: "all", name: "전체", color: "bg-gradient-primary" },
    { id: "technology", name: "기술", color: "bg-gradient-tech" },
    { id: "psychology", name: "심리", color: "bg-gradient-psych" },
    { id: "philosophy", name: "철학", color: "bg-gradient-phil" },
    { id: "resource", name: "자원", color: "bg-gradient-resource" }
  ];

  const filteredVariables = coreVariables.filter(variable => {
    const matchesSearch = variable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         variable.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || variable.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getParametersForVariable = (variableId: string) => {
    return currentParameters.filter(p => p.variable_id === variableId);
  };

  return (
    <div className="min-h-screen bg-gradient-surface p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-depth-primary mb-2 flex items-center gap-3">
              <Database className="w-8 h-8" />
              데이터 관리 시스템
            </h1>
            <p className="text-muted-foreground">
              다차원 변수 모델링을 위한 변수 및 파라미터 관리
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              가져오기
            </Button>
            <Button className="bg-gradient-deep text-white">
              <Plus className="w-4 h-4 mr-2" />
              새 변수
            </Button>
          </div>
        </div>

        <Tabs defaultValue="variables" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="variables">변수 관리</TabsTrigger>
            <TabsTrigger value="parameters">파라미터 관리</TabsTrigger>
            <TabsTrigger value="analytics">데이터 분석</TabsTrigger>
          </TabsList>

          <TabsContent value="variables" className="space-y-6">
            {/* Search and Filter */}
            <Card className="p-4 bg-gradient-card border-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="변수 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  필터
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedCategory === category.id ? category.color + " text-white" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Variables List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-depth-primary">
                  변수 목록 ({filteredVariables.length})
                </h3>
                
                <div className="space-y-3">
                  {filteredVariables.map(variable => {
                    const paramCount = getParametersForVariable(variable.id).length;
                    return (
                      <Card 
                        key={variable.id}
                        className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                          selectedVariable?.id === variable.id ? 'ring-2 ring-depth-primary' : ''
                        }`}
                        onClick={() => setSelectedVariable(variable)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {variable.category}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {paramCount} 파라미터
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <h4 className="font-medium text-depth-primary mb-1">
                          {variable.name}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {variable.description}
                        </p>
                        
                        <div className="text-xs text-muted-foreground mt-2">
                          ID: {variable.id}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Variable Detail */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-depth-primary">
                  변수 상세 정보
                </h3>
                
                {selectedVariable ? (
                  <Card className="p-6 bg-gradient-card border-0">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">변수명</Label>
                        <p className="text-depth-primary font-medium">{selectedVariable.name}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">카테고리</Label>
                        <Badge className="ml-2" variant="outline">
                          {selectedVariable.category}
                        </Badge>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">설명</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedVariable.description}
                        </p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">파라미터 이력</Label>
                        <div className="space-y-2 mt-2">
                          {getParametersForVariable(selectedVariable.id).map(param => (
                            <div key={param.id} className="p-3 bg-background/50 rounded border">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">
                                  {param.effective_date}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                  {Object.keys(param.metrics).length} 지표
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {param.source}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6 bg-gradient-card border-0">
                    <p className="text-muted-foreground text-center">
                      변수를 선택하면 상세 정보가 표시됩니다
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="parameters">
            <Card className="p-6 bg-gradient-card border-0">
              <h3 className="text-lg font-semibold text-depth-primary mb-4">
                파라미터 관리
              </h3>
              <p className="text-muted-foreground">
                파라미터 상세 관리 기능이 구현될 예정입니다.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-6 bg-gradient-card border-0">
              <h3 className="text-lg font-semibold text-depth-primary mb-4">
                데이터 분석
              </h3>
              <p className="text-muted-foreground">
                변수 및 파라미터 분석 대시보드가 구현될 예정입니다.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataManagement;