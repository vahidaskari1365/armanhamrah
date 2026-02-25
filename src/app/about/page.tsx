
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Editable } from "@/components/inline-editing/Editable";
import { useContent } from "@/contexts/ContentContext";


const teamMembers = [
    { name: <Editable contentKey="about_team_member1_name" />, role: <Editable contentKey="about_team_member1_role" />, image: "/placeholder.svg" },
    { name: <Editable contentKey="about_team_member2_name" />, role: <Editable contentKey="about_team_member2_role" />, image: "/placeholder.svg" },
    { name: <Editable contentKey="about_team_member3_name" />, role: <Editable contentKey="about_team_member3_role" />, image: "/placeholder.svg" },
];

export default function AboutPage() {
  const { loading } = useContent();

  if (loading) {
      return <div className="container mx-auto text-center p-20">در حال بارگذاری محتوا...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Our Story */}
        <section>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl text-center">
                        <Editable contentKey="about_story_title" as="h1" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none mx-auto text-muted-foreground">
                     <Editable contentKey="about_story_content" isRichText={true} />
                </CardContent>
            </Card>
        </section>

        {/* Our Team */}
        <section>
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">
                    <Editable contentKey="about_team_title" />
                </h2>
                <p className="mt-3 md:mt-4 max-w-xl mx-auto text-muted-foreground">
                    <Editable contentKey="about_team_subtitle" />
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <Card key={index} className="text-center">
                        <CardContent className="flex flex-col items-center p-6">
                            <Avatar className="w-24 h-24 mb-4">
                                <AvatarImage src={member.image} alt={typeof member.name === 'string' ? member.name : 'team member'} />
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-primary">{member.role}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    </div>
  );
}
