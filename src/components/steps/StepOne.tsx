import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Building, Mail } from 'lucide-react';
import { FormData } from '../VideoReportGenerator';

interface StepOneProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
}

export const StepOne: React.FC<StepOneProps> = ({ formData, updateFormData, nextStep }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.user_email) {
      newErrors.user_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = 'Please enter a valid email';
    }
    
    if (!formData.agency_name) {
      newErrors.agency_name = 'Agency name is required';
    }
    
    if (!formData.agency_logo_url) {
      newErrors.agency_logo_url = 'Agency logo is required';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload this to a file storage service
      // For now, we'll create a mock URL
      const url = URL.createObjectURL(file);
      updateFormData({ agency_logo_url: url });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Let's create your video report!</h2>
        <p className="text-muted-foreground">
          Welcome! I'm here to help you create a professional video highlighting your campaign results in minutes. 
          To get started, I just need a few details. The final video will be sent to the email address you provide.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="w-5 h-5 text-primary" />
              Your Work Email
            </CardTitle>
            <CardDescription>
              We'll send the finished video to this email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="email"
              placeholder="your.name@agency.com"
              value={formData.user_email}
              onChange={(e) => updateFormData({ user_email: e.target.value })}
              className={errors.user_email ? 'border-destructive' : ''}
            />
            {errors.user_email && (
              <p className="text-destructive text-sm mt-2">{errors.user_email}</p>
            )}
          </CardContent>
        </Card>

        {/* Agency Name */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building className="w-5 h-5 text-primary" />
              Your Agency's Name
            </CardTitle>
            <CardDescription>
              This will appear in the video branding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="e.g., Growth Marketing Pros"
              value={formData.agency_name}
              onChange={(e) => updateFormData({ agency_name: e.target.value })}
              className={errors.agency_name ? 'border-destructive' : ''}
            />
            {errors.agency_name && (
              <p className="text-destructive text-sm mt-2">{errors.agency_name}</p>
            )}
          </CardContent>
        </Card>

        {/* Agency Logo Upload */}
        <Card className="shadow-scene">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Upload className="w-5 h-5 text-primary" />
              Your Agency's Logo
            </CardTitle>
            <CardDescription>
              Please upload a high-quality .PNG or .JPG file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="agency-logo" className="cursor-pointer">
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  formData.agency_logo_url ? 'border-primary bg-primary/5' : 'border-muted-foreground hover:border-primary'
                } ${errors.agency_logo_url ? 'border-destructive' : ''}`}>
                  {formData.agency_logo_url ? (
                    <div className="space-y-2">
                      <img 
                        src={formData.agency_logo_url} 
                        alt="Agency logo preview" 
                        className="h-16 mx-auto object-contain"
                      />
                      <p className="text-sm text-primary font-medium">Logo uploaded successfully</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload your logo</p>
                    </div>
                  )}
                </div>
                <Input
                  id="agency-logo"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </Label>
              {errors.agency_logo_url && (
                <p className="text-destructive text-sm">{errors.agency_logo_url}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="bg-gradient-primary hover:opacity-90">
            Continue to Client Info
          </Button>
        </div>
      </form>
    </div>
  );
};