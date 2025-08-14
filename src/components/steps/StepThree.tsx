import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BarChart3, Palette, ArrowLeft, Info, Plus, Trash2, Target } from 'lucide-react';
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

        {/* KPIs to Highlight */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              KPIs to Highlight
            </CardTitle>
            <CardDescription>
              Select or type up to 3 KPIs to display in the video (e.g., Investment, Leads, ROI, Impressions, CTR, Engagement Rate, Traffic, Conversion Rate).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.highlight_kpis.map((kpi, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`kpi-name-${index}`} className="text-sm font-medium">
                        KPI Name
                      </Label>
                      <Input
                        id={`kpi-name-${index}`}
                        placeholder="e.g., ROI"
                        value={kpi.name}
                        onChange={(e) => {
                          const newKpis = [...formData.highlight_kpis];
                          newKpis[index] = { ...newKpis[index], name: e.target.value };
                          updateFormData({ highlight_kpis: newKpis });
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`kpi-value-${index}`} className="text-sm font-medium">
                        KPI Value
                      </Label>
                      <Input
                        id={`kpi-value-${index}`}
                        placeholder="e.g., 4.5x"
                        value={kpi.value}
                        onChange={(e) => {
                          const newKpis = [...formData.highlight_kpis];
                          newKpis[index] = { ...newKpis[index], value: e.target.value };
                          updateFormData({ highlight_kpis: newKpis });
                        }}
                      />
                    </div>
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
              ))}
              
              {formData.highlight_kpis.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newKpis = [...formData.highlight_kpis, { name: '', value: '' }];
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