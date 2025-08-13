import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BarChart3, Palette, ArrowLeft, Info } from 'lucide-react';
import { FormData } from '../VideoReportGenerator';

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
        <h2 className="text-2xl font-semibold mb-2">Time for the data.</h2>
        <p className="text-muted-foreground">
          Paste your data directly from your spreadsheet. Ensure the columns are in the correct order so I can process them accurately. 
          We will automatically calculate metrics like CTR and Conversion Rate for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campaign Data */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5 text-primary" />
              Upload Your Campaign Metrics
            </CardTitle>
            <CardDescription>
              Paste data with columns separated by tabs or commas. The expected order is: Campaign Name, Platform, Budget, Impressions, Clicks, Conversions, ROAS.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-scene p-4 rounded-lg border">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Expected format:</p>
                    <p className="text-muted-foreground">Campaign Name | Platform | Budget | Impressions | Clicks | Conversions | ROAS</p>
                  </div>
                </div>
              </div>
              
              <Textarea
                placeholder="Summer Sale | Meta Ads | 5000 | 150000 | 7500 | 300 | 4.5
Q3 Lead Gen | Google Ads | 8000 | 250000 | 8500 | 450 | 5.1"
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