import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Mail, Building, User, Calendar, BarChart3, Palette, CheckCircle } from 'lucide-react';
import { FormData } from '../VideoReportGenerator';
import { useToast } from '@/hooks/use-toast';

interface StepFourProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  prevStep: () => void;
}

export const StepFour: React.FC<StepFourProps> = ({ formData, prevStep }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // Prepare the payload
      const payload = {
        email: formData.user_email,
        agencyName: formData.agency_name,
        agencyLogo: formData.agency_logo_url,
        clientName: formData.client_name,
        clientLogo: formData.client_logo_url,
        reportPeriod: formData.reporting_period,
        accountManager: formData.account_manager_name,
        videoTone: formData.video_tone,
        metricsRaw: formData.metrics_data,
        timestamp: new Date().toISOString(),
        triggered_from: 'video_report_generator'
      };

      // Send to Zapier webhook
      const response = await fetch(formData.webhook_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsCompleted(true);
        toast({
          title: "Video Generation Started!",
          description: `Your professional campaign video is being created and will be sent to ${formData.user_email}`,
        });
      } else {
        throw new Error('Failed to send data');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start video generation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-2">Video Generation Started!</h2>
          <p className="text-muted-foreground mb-4">
            Your professional campaign video is being created and will be sent to <strong>{formData.user_email}</strong> within the next few minutes.
          </p>
          <Badge variant="secondary" className="text-sm">
            Processing time: 3-5 minutes
          </Badge>
        </div>

        <Card className="shadow-scene text-left">
          <CardHeader>
            <CardTitle className="text-lg">What happens next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Your data is being processed and visualized</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Professional video is being generated with your branding</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Final video will be delivered to your email</span>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          size="lg"
        >
          Create Another Video
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">All set!</h2>
        <p className="text-muted-foreground">
          Perfect! I have all the information needed. Please double-check that your email (<strong>{formData.user_email}</strong>) is correct, 
          as this is where we'll send the finished video.
        </p>
      </div>

      {/* Information Review */}
      <div className="grid gap-4">
        {/* Basic Info */}
        <Card className="shadow-scene">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building className="w-5 h-5 text-primary" />
              Agency Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formData.user_email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formData.agency_name}</span>
            </div>
            {formData.agency_logo_url && (
              <div className="flex items-center gap-2">
                <img src={formData.agency_logo_url} alt="Agency logo" className="w-8 h-8 object-contain" />
                <span className="text-sm text-muted-foreground">Agency logo uploaded</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Client Info */}
        <Card className="shadow-scene">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-primary" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formData.client_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formData.reporting_period}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formData.account_manager_name}</span>
            </div>
            {formData.client_logo_url && (
              <div className="flex items-center gap-2">
                <img src={formData.client_logo_url} alt="Client logo" className="w-8 h-8 object-contain" />
                <span className="text-sm text-muted-foreground">Client logo uploaded</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Campaign Data */}
        <Card className="shadow-scene">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5 text-primary" />
              Campaign Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Video tone: {formData.video_tone}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {formData.metrics_data.split('\n').length} campaign(s) data provided
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate Button */}
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Click "Generate Video" to start the process. This may take a few minutes.
        </p>
        
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep} disabled={isGenerating}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            size="lg"
            className="bg-gradient-primary hover:opacity-90"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating Video...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Generate Video
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};