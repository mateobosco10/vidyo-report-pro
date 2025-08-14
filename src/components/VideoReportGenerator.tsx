import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { StepThree } from './steps/StepThree';
import { StepFour } from './steps/StepFour';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export interface KPI {
  name: string;
  value: string;
}

export interface FormData {
  // Step 1
  user_email: string;
  agency_name: string;
  agency_logo_url: string;
  
  // Step 2
  client_name: string;
  client_logo_url: string;
  reporting_period: string;
  account_manager_name: string;
  
  // Step 3
  metrics_data: string;
  highlight_kpis: KPI[];
  video_tone: string;
  
  // Webhook (pre-configured)
  webhook_url: string;
}

const VideoReportGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    user_email: '',
    agency_name: '',
    agency_logo_url: '',
    client_name: '',
    client_logo_url: '',
    reporting_period: '',
    account_manager_name: '',
    metrics_data: '',
    highlight_kpis: [],
    video_tone: '',
    webhook_url: 'https://hooks.zapier.com/hooks/catch/5528813/u4krjb2/' // Pre-configured
  });

  const steps = [
    { number: 1, title: "Basic Info", description: "Agency details" },
    { number: 2, title: "Client Info", description: "Client branding" },
    { number: 3, title: "Data & KPIs", description: "Metrics & tone" },
    { number: 4, title: "Generate", description: "Review & send" }
  ];

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 2:
        return <StepTwo formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <StepThree formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <StepFour formData={formData} updateFormData={updateFormData} prevStep={prevStep} />;
      default:
        return null;
    }
  };

  const getProgressValue = () => {
    return (currentStep / 4) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-secondary p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            AI Campaign Video Report Generator
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Turn Your Data Into a Stunning Video Report
          </h1>
          <p className="text-lg text-muted-foreground">
            Create professional campaign videos in minutes
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{currentStep} of 4</span>
              </div>
              <Progress value={getProgressValue()} className="h-2" />
            </div>
            
            {/* Step indicators */}
            <div className="flex justify-between">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    currentStep >= step.number 
                      ? 'bg-gradient-primary text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="text-xs">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-muted-foreground">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Step */}
        <Card className="shadow-card">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoReportGenerator;