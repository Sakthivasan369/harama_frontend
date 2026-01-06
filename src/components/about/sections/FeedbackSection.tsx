'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import confetti from 'canvas-confetti';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { Star } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
  rating: z.number().min(1, "Please give a rating"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function FeedbackSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        rating: 0
    }
  });

  const rating = watch("rating");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#ec4899', '#8b5cf6']
    });
  };

  return (
    <section className="py-32 bg-brand-feedback-bg relative overflow-hidden flex items-center justify-center min-h-screen">
       {/* Background glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-feedback-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

       <div className="container px-4 max-w-xl relative z-10">
         <h2 className="text-4xl font-bold text-center mb-10 text-slate-900">Share Your <span className="text-brand-hero-secondary">Thoughts</span></h2>
         
         {!isSuccess ? (
             <Card variant="glass" className="backdrop-blur-2xl bg-white/60 border-white/50 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input 
                        label="Name" 
                        placeholder="John Doe" 
                        {...register("name")} 
                        error={errors.name?.message} 
                        className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-hero-primary focus:ring-brand-hero-primary/20"
                    />
                    
                    <Input 
                        label="Email" 
                        type="email" 
                        placeholder="john@example.com" 
                        {...register("email")} 
                        error={errors.email?.message}
                        className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-hero-primary focus:ring-brand-hero-primary/20"
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
                        <select 
                            className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-hero-primary/20 focus-visible:border-brand-hero-primary"
                            {...register("role")}
                        >
                            <option value="">Select your role</option>
                            <option value="Judge">Judge</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                            <option value="Developer">Developer</option>
                        </select>
                        {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>}
                    </div>

                    <div>
                         <label className="mb-2 block text-sm font-medium text-slate-700">Rating</label>
                         <div className="flex gap-2">
                             {[1, 2, 3, 4, 5].map((star) => (
                                 <button
                                    key={star}
                                    type="button"
                                    onClick={() => setValue("rating", star, { shouldValidate: true })}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                 >
                                     <Star 
                                        className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} 
                                     />
                                 </button>
                             ))}
                         </div>
                         {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>}
                    </div>

                    <Textarea 
                        label="Message" 
                        placeholder="What do you think about HARAMA?" 
                        {...register("message")}
                        error={errors.message?.message}
                        className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-hero-primary focus:ring-brand-hero-primary/20"
                    />

                    <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800" isLoading={isSubmitting}>
                        Submit Feedback
                    </Button>
                </form>
             </Card>
         ) : (
             <Card variant="neon" className="text-center py-20 animate-in zoom-in duration-500 bg-white border-brand-solution-accent/30">
                 <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                     <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                     </svg>
                 </div>
                 <h3 className="text-3xl font-bold text-slate-900 mb-4">Thank You!</h3>
                 <p className="text-slate-500">Your feedback helps us build the future of education.</p>
                 <Button className="mt-8 text-slate-700 border-slate-200 hover:bg-slate-50" variant="outline" onClick={() => setIsSuccess(false)}>
                     Send Another
                 </Button>
             </Card>
         )}
       </div>
    </section>
  );
}
