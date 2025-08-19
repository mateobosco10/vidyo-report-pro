import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Palette, ArrowLeft, Info, Plus, Trash2, Target, TrendingUp, Lightbulb } from 'lucide-react';
import { FormData, KPI } from '../VideoReportGenerator';
import { Input } from '@/components/ui/input';

interface StepThreeProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const StepThree: React.FC<StepThreeProps> = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const kpiOptions = [
    {
      type: 'CPL',
      name: 'Cost per Lead (CPL)',
      formula: 'Investment ÷ Leads Generated',
      inputs: ['investment', 'leads']
    },
    {
      type: 'CTR',
      name: 'Click Through Rate (CTR)',
      formula: 'Clicks ÷ Impressions × 100',
      inputs: ['clicks', 'impressions']
    },
    {
      type: 'Conversion Rate',
      name: 'Conversion Rate',
      formula: 'Conversions ÷ Clicks × 100',
      inputs: ['conversions', 'clicks']
    },
    {
      type: 'Engagement Rate',
      name: 'Engagement Rate',
      formula: 'Interactions ÷ Followers × 100',
      inputs: ['interactions', 'followers']
    },
    {
      type: 'ROI/ROAS',
      name: 'ROI/ROAS',
      formula: 'Attributed Revenue ÷ Investment',
      inputs: ['revenue', 'investment']
    }
  ];

  const calculateKPI = (kpi: KPI) => {
    const { type, inputData } = kpi;
    const getNum = (key: string) => parseFloat(inputData[key]) || 0;

    switch (type) {
      case 'CPL':
        return getNum('leads') > 0 ? (getNum('investment') / getNum('leads')).toFixed(2) : '0';
      case 'CTR':
        return getNum('impressions') > 0 ? ((getNum('clicks') / getNum('impressions')) * 100).toFixed(1) + '%' : '0%';
      case 'Conversion Rate':
        return getNum('clicks') > 0 ? ((getNum('conversions') / getNum('clicks')) * 100).toFixed(1) + '%' : '0%';
      case 'Engagement Rate':
        return getNum('followers') > 0 ? ((getNum('interactions') / getNum('followers')) * 100).toFixed(1) + '%' : '0%';
      case 'ROI/ROAS':
        return getNum('investment') > 0 ? (getNum('revenue') / getNum('investment')).toFixed(1) + 'x' : '0x';
      default:
        return '0';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.monthly_goal) {
      newErrors.monthly_goal = 'Monthly goal is required';
    }
    
    if (!formData.main_result) {
      newErrors.main_result = 'Main result is required';
    }
    
    if (!formData.metrics_data) {
      newErrors.metrics_data = 'Campaign data is required';
    }
    
    if (!formData.video_tone) {
      newErrors.video_tone = 'Please select a video tone';
    }

    if (!formData.best_campaign) {
      newErrors.best_campaign = 'Best campaign field is required';
    }

    if (!formData.what_didnt_work) {
      newErrors.what_didnt_work = 'What didnt work field is required';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  const videoToneOptions = [
    {
      value: 'Friendly',
      label: 'Friendly',
      description: 'Warm and conversational tone'
    },
    {
      value: 'Professional',
      label: 'Professional',
      description: 'Business-focused and formal'
    },
    {
      value: 'Data-driven',
      label: 'Data-driven',
      description: 'Numbers-focused and analytical'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Time for the data & KPIs.</h2>
        <p className="text-muted-foreground">
          Paste your data directly from your spreadsheet and provide the key performance indicators you want to highlight. We will automatically calculate metrics like CTR and Conversion Rate for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Monthly Goal */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              Monthly Goal
            </CardTitle>
            <CardDescription>
              What was the main objective for this reporting period?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Increase lead generation by 30% while maintaining cost efficiency"
              value={formData.monthly_goal}
              onChange={(e) => updateFormData({ monthly_goal: e.target.value })}
              className={`min-h-[80px] ${errors.monthly_goal ? 'border-destructive' : ''}`}
              rows={3}
            />
            {errors.monthly_goal && (
              <p className="text-destructive text-sm mt-2">{errors.monthly_goal}</p>
            )}
          </CardContent>
        </Card>

        {/* Main Result */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              Main Result
            </CardTitle>
            <CardDescription>
              What was the key achievement or main outcome from this period?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Exceeded lead generation target by 42% with improved cost per lead of $18.50"
              value={formData.main_result}
              onChange={(e) => updateFormData({ main_result: e.target.value })}
              className={`min-h-[80px] ${errors.main_result ? 'border-destructive' : ''}`}
              rows={3}
            />
            {errors.main_result && (
              <p className="text-destructive text-sm mt-2">{errors.main_result}</p>
            )}
          </CardContent>
        </Card>
        {/* Campaign Data */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5 text-primary" />
              Paste your raw campaign data
            </CardTitle>
            <CardDescription>
              Paste data with columns separated by tabs or commas. Expected order: Campaign Name, Platform, Budget, Impressions, Clicks, Conversions, ROAS, Leads, Followers, Interactions, Revenue (optional).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-scene p-4 rounded-lg border">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Expected format:</p>
                    <p className="text-muted-foreground">Campaign Name | Platform | Budget | Impressions | Clicks | Conversions | ROAS | Leads | Followers | Interactions | Revenue</p>
                  </div>
                </div>
              </div>
              
              <Textarea
                placeholder="Summer Sale | Meta Ads | 5000 | 150000 | 7500 | 300 | 4.5 | 250 | 25000 | 5000 | 22500
Q3 Lead Gen | Google Ads | 8000 | 250000 | 8500 | 450 | 5.1 | 400 | 18000 | 3200 | 40800"
                value={formData.metrics_data}
                onChange={(e) => updateFormData({ metrics_data: e.target.value })}
                className={`min-h-[120px] ${errors.metrics_data ? 'border-destructive' : ''}`}
                rows={6}
              />
              {errors.metrics_data && (
                <p className="text-destructive text-sm">{errors.metrics_data}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Featured KPIs */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              Featured KPIs
            </CardTitle>
            <CardDescription>
              Select up to 3 KPIs from the dropdown. Input the required data and we'll calculate the results automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {formData.highlight_kpis.map((kpi, index) => {
                const selectedKpiOption = kpiOptions.find(option => option.type === kpi.type);
                return (
                  <div key={index} className="p-4 border rounded-lg bg-gradient-scene">
                    <div className="flex gap-3 items-start mb-4">
                      <div className="flex-1">
                        <Label className="text-sm font-medium mb-2 block">
                          Select KPI Type
                        </Label>
                        <Select
                          value={kpi.type}
                          onValueChange={(value) => {
                            const selectedOption = kpiOptions.find(opt => opt.type === value);
                            const newKpis = [...formData.highlight_kpis];
                            newKpis[index] = {
                              type: value,
                              name: selectedOption?.name || '',
                              value: '',
                              inputData: {}
                            };
                            updateFormData({ highlight_kpis: newKpis });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a KPI..." />
                          </SelectTrigger>
                          <SelectContent>
                            {kpiOptions.map((option) => (
                              <SelectItem key={option.type} value={option.type}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newKpis = formData.highlight_kpis.filter((_, i) => i !== index);
                          updateFormData({ highlight_kpis: newKpis });
                        }}
                        className="mt-6"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {selectedKpiOption && (
                      <div className="space-y-3">
                        <div className="text-xs text-muted-foreground bg-background/50 p-2 rounded">
                          Formula: {selectedKpiOption.formula}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {selectedKpiOption.inputs.map((inputKey) => (
                            <div key={inputKey}>
                              <Label className="text-sm font-medium capitalize">
                                {inputKey}
                              </Label>
                              <Input
                                type="number"
                                placeholder={`Enter ${inputKey}`}
                                value={kpi.inputData[inputKey] || ''}
                                onChange={(e) => {
                                  const newKpis = [...formData.highlight_kpis];
                                  newKpis[index] = {
                                    ...newKpis[index],
                                    inputData: {
                                      ...newKpis[index].inputData,
                                      [inputKey]: e.target.value
                                    }
                                  };
                                  // Auto-calculate the result
                                  newKpis[index].value = calculateKPI(newKpis[index]);
                                  updateFormData({ highlight_kpis: newKpis });
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        
                        {kpi.value && (
                          <div className="mt-3 p-3 bg-primary/10 rounded-lg">
                            <Label className="text-sm font-medium">Calculated Result:</Label>
                            <div className="text-lg font-semibold text-primary">{kpi.value}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {formData.highlight_kpis.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newKpis = [...formData.highlight_kpis, { type: '', name: '', value: '', inputData: {} }];
                    updateFormData({ highlight_kpis: newKpis });
                  }}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add KPI ({formData.highlight_kpis.length}/3)
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Key Insights & Next Steps */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
              Key Insights & Next Steps
            </CardTitle>
            <CardDescription>
              Provide strategic insights and planning for the next period to complete your video report.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Best Campaign */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="best_campaign" className="text-sm font-medium">
                  Best Performing Campaign/Channel
                </Label>
                <Input
                  id="best_campaign"
                  placeholder="e.g., Meta Ads Q3 Campaign"
                  value={formData.best_campaign}
                  onChange={(e) => updateFormData({ best_campaign: e.target.value })}
                  className={errors.best_campaign ? 'border-destructive' : ''}
                />
                {errors.best_campaign && (
                  <p className="text-destructive text-sm mt-1">{errors.best_campaign}</p>
                )}
              </div>
              <div>
                <Label htmlFor="best_campaign_reason" className="text-sm font-medium">
                  Why it performed best
                </Label>
                <Input
                  id="best_campaign_reason"
                  placeholder="e.g., Better targeting and creative"
                  value={formData.best_campaign_reason}
                  onChange={(e) => updateFormData({ best_campaign_reason: e.target.value })}
                />
              </div>
            </div>

            {/* What didn't work */}
            <div>
              <Label htmlFor="what_didnt_work" className="text-sm font-medium">
                What didn't work and what we learned
              </Label>
              <Textarea
                id="what_didnt_work"
                placeholder="e.g., Display ads had low CTR due to poor creative alignment with audience interests"
                value={formData.what_didnt_work}
                onChange={(e) => updateFormData({ what_didnt_work: e.target.value })}
                className={`min-h-[80px] ${errors.what_didnt_work ? 'border-destructive' : ''}`}
                rows={3}
              />
              {errors.what_didnt_work && (
                <p className="text-destructive text-sm mt-1">{errors.what_didnt_work}</p>
              )}
            </div>

            {/* User behavior changes */}
            <div>
              <Label htmlFor="user_behavior_changes" className="text-sm font-medium">
                Changes in user behavior observed
              </Label>
              <Textarea
                id="user_behavior_changes"
                placeholder="e.g., Increased mobile traffic, higher engagement on video content"
                value={formData.user_behavior_changes}
                onChange={(e) => updateFormData({ user_behavior_changes: e.target.value })}
                className="min-h-[80px]"
                rows={3}
              />
            </div>

            {/* Next Period Planning */}
            <div className="space-y-4 p-4 bg-gradient-scene rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-primary" />
                <h4 className="font-medium">Plan for Next Period</h4>
              </div>
              
              <div>
                <Label htmlFor="next_period_improvements" className="text-sm font-medium">
                  Improvements or tests to run
                </Label>
                <Textarea
                  id="next_period_improvements"
                  placeholder="e.g., A/B test new ad creatives, optimize landing page load speed"
                  value={formData.next_period_improvements}
                  onChange={(e) => updateFormData({ next_period_improvements: e.target.value })}
                  className="min-h-[60px]"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="upcoming_campaigns" className="text-sm font-medium">
                  Upcoming campaigns or ideas
                </Label>
                <Textarea
                  id="upcoming_campaigns"
                  placeholder="e.g., Holiday season campaign with video ads, influencer partnerships"
                  value={formData.upcoming_campaigns}
                  onChange={(e) => updateFormData({ upcoming_campaigns: e.target.value })}
                  className="min-h-[60px]"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="strategic_recommendations" className="text-sm font-medium">
                  Strategic recommendations
                </Label>
                <Textarea
                  id="strategic_recommendations"
                  placeholder="e.g., Increase budget allocation to high-performing channels, implement retargeting strategy"
                  value={formData.strategic_recommendations}
                  onChange={(e) => updateFormData({ strategic_recommendations: e.target.value })}
                  className="min-h-[60px]"
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Tone Selection */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Palette className="w-5 h-5 text-primary" />
              Choose the video's tone
            </CardTitle>
            <CardDescription>
              Select the style that best fits your client relationship
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={formData.video_tone}
              onValueChange={(value) => updateFormData({ video_tone: value })}
              className="space-y-3"
            >
              {videoToneOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer p-3 rounded-lg hover:bg-gradient-scene transition-colors"
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.video_tone && (
              <p className="text-destructive text-sm mt-2">{errors.video_tone}</p>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button type="submit" size="lg" className="bg-gradient-primary hover:opacity-90">
            Review & Generate
          </Button>
        </div>
      </form>
    </div>
  );
};