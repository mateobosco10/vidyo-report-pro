import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Building, Calendar, User, ArrowLeft } from 'lucide-react';
import { FormData } from '../VideoReportGenerator';

interface StepTwoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const StepTwo: React.FC<StepTwoProps> = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.client_name) {
      newErrors.client_name = 'Client name is required';
    }
    
    if (!formData.client_logo_url) {
      newErrors.client_logo_url = 'Client logo is required';
    }
    
    if (!formData.reporting_period) {
      newErrors.reporting_period = 'Reporting period is required';
    }
    
    if (!formData.account_manager_name) {
      newErrors.account_manager_name = 'Account manager name is required';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateFormData({ client_logo_url: url });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Now, tell me about your client.</h2>
        <p className="text-muted-foreground">
          A great report feels custom-made. Let's add your client's branding and define the reporting period.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client Name */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building className="w-5 h-5 text-primary" />
              Client's Brand Name
            </CardTitle>
            <CardDescription>
              This will be prominently featured in the video
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="e.g., RapidLaunch Sneakers"
              value={formData.client_name}
              onChange={(e) => updateFormData({ client_name: e.target.value })}
              className={errors.client_name ? 'border-destructive' : ''}
            />
            {errors.client_name && (
              <p className="text-destructive text-sm mt-2">{errors.client_name}</p>
            )}
          </CardContent>
        </Card>

        {/* Client Logo Upload */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Upload className="w-5 h-5 text-primary" />
              Client's Logo
            </CardTitle>
            <CardDescription>
              Please upload a high-quality .PNG or .JPG file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <label htmlFor="client-logo" className="cursor-pointer">
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  formData.client_logo_url ? 'border-primary bg-primary/5' : 'border-muted-foreground hover:border-primary'
                } ${errors.client_logo_url ? 'border-destructive' : ''}`}>
                  {formData.client_logo_url ? (
                    <div className="space-y-2">
                      <img 
                        src={formData.client_logo_url} 
                        alt="Client logo preview" 
                        className="h-16 mx-auto object-contain"
                      />
                      <p className="text-sm text-primary font-medium">Logo uploaded successfully</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload client logo</p>
                    </div>
                  )}
                </div>
                <input
                  id="client-logo"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {errors.client_logo_url && (
                <p className="text-destructive text-sm">{errors.client_logo_url}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reporting Period */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-primary" />
              Reporting Period
            </CardTitle>
            <CardDescription>
              The time period this report covers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="e.g., Q2 2025, July 2025"
              value={formData.reporting_period}
              onChange={(e) => updateFormData({ reporting_period: e.target.value })}
              className={errors.reporting_period ? 'border-destructive' : ''}
            />
            {errors.reporting_period && (
              <p className="text-destructive text-sm mt-2">{errors.reporting_period}</p>
            )}
          </CardContent>
        </Card>

        {/* Account Manager */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-primary" />
              Account Manager's Name
            </CardTitle>
            <CardDescription>
              This person will be featured in the intro/outro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="e.g., Jane Doe"
              value={formData.account_manager_name}
              onChange={(e) => updateFormData({ account_manager_name: e.target.value })}
              className={errors.account_manager_name ? 'border-destructive' : ''}
            />
            {errors.account_manager_name && (
              <p className="text-destructive text-sm mt-2">{errors.account_manager_name}</p>
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
            Continue to Campaign Data
          </Button>
        </div>
      </form>
    </div>
  );
};