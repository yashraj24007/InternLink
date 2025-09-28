import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Users, Building, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4">About InternLink</h1>
          <p className="text-xl text-muted-foreground">
            Transforming campus placement management through innovative technology
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                InternLink was created to solve the chaos of campus placement processes. We replace scattered WhatsApp groups, 
                endless email chains, and manual spreadsheets with one intelligent, automated platform that serves students, 
                mentors, recruiters, and placement cells.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <GraduationCap className="w-12 h-12 text-primary mb-4" />
                <CardTitle>For Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  One digital profile, smart opportunity matching, and seamless application tracking from internship to placement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle>For Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Streamlined approval processes, automated notifications, and comprehensive student progress tracking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building className="w-12 h-12 text-primary mb-4" />
                <CardTitle>For Organizations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access to pre-screened candidates, integrated feedback systems, and placement analytics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "AI-powered opportunity matching",
                "Automated approval workflows", 
                "Real-time application tracking",
                "Digital certificate generation",
                "Comprehensive analytics dashboard",
                "Mobile-responsive design",
                "Role-based access control",
                "Integration with academic calendars"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;