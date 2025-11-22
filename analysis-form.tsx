'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Loader2, PlusCircle, Search } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  sandboxReport: z.string().optional(),
  extractedCode: z.string().optional(),
  networkCalls: z.string().optional(),
});

type AnalysisFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

export function AnalysisForm({ onSubmit, isLoading }: AnalysisFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      sandboxReport: '',
      extractedCode: '',
      networkCalls: '',
    },
  });

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">URL to Analyze</FormLabel>
                  <FormControl>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        className="h-12 text-base pl-10 bg-background/50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="optional-fields" className="border-b-0">
                <AccordionTrigger className="text-sm text-muted-foreground hover:no-underline justify-start gap-2 py-2">
                  <PlusCircle className="h-4 w-4" />
                  Add more context (Optional)
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="sandboxReport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sandbox Behavior Report</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste sandbox report here..."
                            {...field}
                            rows={3}
                            className="bg-background/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="extractedCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>HTML/JavaScript Extracted Code</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste extracted code here..."
                            {...field}
                            rows={3}
                            className="bg-background/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="networkCalls"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Network Calls Observed</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste network calls here..."
                            {...field}
                            rows={3}
                            className="bg-background/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-bold"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze URL'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
