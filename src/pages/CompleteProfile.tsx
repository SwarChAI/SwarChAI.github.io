import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Briefcase, Target, GraduationCap, Users } from 'lucide-react';
import { UserRole } from '@/services/api/authApi';
import { ProfilePhotoUpload } from '@/components/ProfilePhotoUpload';

const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Marketing',
  'Consulting',
  'Legal',
  'Engineering',
  'Design',
  'Other',
];

const experienceLevels = [
  '0-2 years',
  '3-5 years',
  '6-10 years',
  '10+ years',
];

export default function CompleteProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(user?.avatar || null);
  
  const [formData, setFormData] = useState({
    userRole: '' as UserRole | '',
    currentRole: '',
    targetRole: '',
    industry: '',
    experience: '',
    linkedIn: '',
    bio: '',
    company: '',
    expertise: '',
    motivation: '',
    availability: '',
  });

  const handlePhotoChange = (file: File | null, previewUrl: string | null) => {
    setProfilePhoto(file);
    setProfilePhotoPreview(previewUrl);
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.userRole) {
      newErrors.userRole = 'Please select whether you want to be a mentor or mentee';
    }
    
    if (!formData.currentRole.trim()) {
      newErrors.currentRole = 'Current role is required';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Please select your industry';
    }
    
    if (!formData.experience) {
      newErrors.experience = 'Please select your experience level';
    }
    
    if (formData.userRole === 'mentee' && !formData.targetRole.trim()) {
      newErrors.targetRole = 'Target role is required for mentees';
    }
    
    if (formData.userRole === 'mentor' && !formData.expertise.trim()) {
      newErrors.expertise = 'Please describe your areas of expertise';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Please fix the errors',
        description: 'Some required fields are missing or invalid.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Upload profilePhoto to your WordPress backend here
      // Example: const uploadedUrl = await uploadToWordPress(profilePhoto);
      
      updateProfile({
        userRole: formData.userRole as UserRole,
        currentRole: formData.currentRole,
        targetRole: formData.targetRole,
        industry: formData.industry,
        experience: formData.experience,
        linkedIn: formData.linkedIn,
        bio: formData.bio,
        company: formData.company,
        expertise: formData.expertise,
        motivation: formData.motivation,
        availability: formData.availability,
        avatar: profilePhotoPreview || undefined,
        profileComplete: true,
      });

      toast({
        title: 'Profile Completed!',
        description: 'Your profile has been saved. Your application is now under review.',
      });

      navigate('/application-status');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <Layout>
      <div className="min-h-[80vh] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <ProfilePhotoUpload
                currentPhoto={profilePhotoPreview || undefined}
                onPhotoChange={handlePhotoChange}
                userName={user.name}
              />
              <h1 className="text-2xl font-bold text-foreground mb-4 mt-4">
                Welcome, {user.name}!
              </h1>
              <p className="text-muted-foreground">
                Complete your profile to get started with SC Mentorship
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">I want to join as a *</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleChange('userRole', 'mentee')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.userRole === 'mentee'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <GraduationCap className={`h-8 w-8 mx-auto mb-2 ${formData.userRole === 'mentee' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className={`font-medium ${formData.userRole === 'mentee' ? 'text-primary' : 'text-foreground'}`}>Mentee</div>
                    <div className="text-xs text-muted-foreground mt-1">Get guidance from experts</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('userRole', 'mentor')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.userRole === 'mentor'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Users className={`h-8 w-8 mx-auto mb-2 ${formData.userRole === 'mentor' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className={`font-medium ${formData.userRole === 'mentor' ? 'text-primary' : 'text-foreground'}`}>Mentor</div>
                    <div className="text-xs text-muted-foreground mt-1">Share your experience</div>
                  </button>
                </div>
                {errors.userRole && <p className="text-sm text-destructive">{errors.userRole}</p>}
              </div>

              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentRole">Current Role *</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="currentRole"
                      placeholder="e.g., Software Engineer"
                      value={formData.currentRole}
                      onChange={(e) => handleChange('currentRole', e.target.value)}
                      className={`pl-10 ${errors.currentRole ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.currentRole && <p className="text-sm text-destructive">{errors.currentRole}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="e.g., Google"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Industry *</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleChange('industry', value)}>
                    <SelectTrigger className={errors.industry ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && <p className="text-sm text-destructive">{errors.industry}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Experience *</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleChange('experience', value)}>
                    <SelectTrigger className={errors.experience ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.experience && <p className="text-sm text-destructive">{errors.experience}</p>}
                </div>
              </div>

              {/* Mentee-specific fields */}
              {formData.userRole === 'mentee' && (
                <div className="space-y-2">
                  <Label htmlFor="targetRole">Target Role *</Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="targetRole"
                      placeholder="e.g., Product Manager"
                      value={formData.targetRole}
                      onChange={(e) => handleChange('targetRole', e.target.value)}
                      className={`pl-10 ${errors.targetRole ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.targetRole && <p className="text-sm text-destructive">{errors.targetRole}</p>}
                </div>
              )}

              {/* Mentor-specific fields */}
              {formData.userRole === 'mentor' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="expertise">Areas of Expertise *</Label>
                    <Textarea
                      id="expertise"
                      placeholder="e.g., Leadership, Product Strategy, Career Transitions..."
                      value={formData.expertise}
                      onChange={(e) => handleChange('expertise', e.target.value)}
                      className={errors.expertise ? 'border-destructive' : ''}
                      rows={3}
                    />
                    {errors.expertise && <p className="text-sm text-destructive">{errors.expertise}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      placeholder="e.g., 2 hours per week"
                      value={formData.availability}
                      onChange={(e) => handleChange('availability', e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* LinkedIn */}
              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                <Input
                  id="linkedIn"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedIn}
                  onChange={(e) => handleChange('linkedIn', e.target.value)}
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself..."
                  value={formData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Motivation */}
              <div className="space-y-2">
                <Label htmlFor="motivation">
                  {formData.userRole === 'mentor' 
                    ? 'Why do you want to mentor?' 
                    : 'What do you hope to achieve?'}
                </Label>
                <Textarea
                  id="motivation"
                  placeholder={formData.userRole === 'mentor' 
                    ? "Share why you're passionate about mentoring..."
                    : "Describe your goals and what you hope to learn..."
                  }
                  value={formData.motivation}
                  onChange={(e) => handleChange('motivation', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving Profile...
                  </>
                ) : (
                  'Complete Profile'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}