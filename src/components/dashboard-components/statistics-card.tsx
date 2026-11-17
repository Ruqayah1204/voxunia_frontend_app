import { CirclePlay, Layers, MessageSquare, ThumbsUp, Users, } from "lucide-react"
import { Card, CardContent } from "../ui/card"


type DashboardStatProps = {
    totalGroup: number;
    totalSession: number;
    totalQuestions: number;
    totalAttendees: number;
}

export const Stats = ({ totalGroup, totalSession, totalQuestions, totalAttendees }: DashboardStatProps) => {
    const statsCard = [
        {
            id: 1,
            title: "Total Group",
            figure: totalGroup,
            icon: Layers,
        },
        {
            id: 2,
            title: "Sessions Run",
            figure: totalSession,
            icon: CirclePlay,
        },
        {
            id: 3,
            title: "Total Attendee",
            figure: totalAttendees,
            icon: CirclePlay,
        },
        {
            id: 4,
            title: "Total Question",
            figure: totalQuestions,
            icon: ThumbsUp,
        },
    ]
    return (
        <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 ">
            {statsCard.map((stat) => {
                const IconComponent = stat.icon
                return (
                    <Card key={stat.id} className="group hover:bg-accent/80 transition">
                        <CardContent className="space-y-3">
                            <div className="flex gap-3 items-center text-muted-foreground">
                                <IconComponent className="w-4 h-4 group-hover:text-primary "/>
                                <span>{stat.title}</span>
                            </div>
                            <p className="text-3xl font-bold font-bricolage group-hover:text-primary">{stat.figure}</p>
                        </CardContent>
                    </Card>
                )
            })}
        </section>
    )
}

type GroupStatProps = {
    totalSession: number;
    totalQuestions: number;
    totalVotes: number;
    totalAttendees: number;
}


export const GroupStat = ({totalSession, totalQuestions, totalVotes, totalAttendees}: GroupStatProps) => {
    
    const singleGroupStats = [
        { id: 1, title: "Total Sessions", figure: totalSession, icon: CirclePlay,},
        { id: 2, title: "Questions asked", figure: totalQuestions, icon: MessageSquare,},
        { id: 3, title: "Total Votes", figure: totalVotes, icon: ThumbsUp,},
        { id: 4, title: "Avg. Attendees", figure: totalAttendees, icon: Users,},
    ]
    return (
        <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 ">
            {singleGroupStats.map((stat) => {
                const IconComponent = stat.icon
                return (
                    <Card key={stat.id} className="group hover:bg-accent/80 transition shadow-soft">
                        <CardContent className="space-y-3">
                            <div className="flex gap-3 items-center text-muted-foreground">
                                <IconComponent className="w-4 h-4 group-hover:text-primary "/>
                                <span>{stat.title}</span>
                            </div>
                            <p className="text-3xl font-bold font-bricolage group-hover:text-primary">{stat.figure}</p>
                        </CardContent>
                    </Card>
                )
            })}
        </section>
    )
}