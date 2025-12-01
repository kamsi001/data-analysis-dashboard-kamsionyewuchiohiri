import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutProject = () => (
  <Card className="mt-8 bg-gray-700 border border-gray-900 max-w-3xl mx-auto shadow-xl">
    <CardHeader>
      <CardTitle className='text-blue-200'>About This Project</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-white mb-4">
        This data analysis tool was built as part of a 10-week React/TypeScript development course. 
        It demonstrates modern web development practices including responsive design, 
        data visualization, AI integration, and user experience optimization.
      </p>
      <div className="flex flex-wrap gap-2">
        {["React", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "shadcn/ui"].map(tech => (
          <Badge key={tech} variant="secondary">{tech}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default AboutProject;