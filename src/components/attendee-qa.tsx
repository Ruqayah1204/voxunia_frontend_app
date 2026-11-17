// import { SessionList } from "@/types/session"
import { Question } from "@/types/questions"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { useMemo, useState } from "react"
import { VoteControl } from "./vote-control"


interface AttendeeLiveSessionObj {
    questions: Question[],
    sessionId: string,
}

type SortMode = "top" | "newest"

export const AttendeeLiveSession = ({questions, sessionId}: AttendeeLiveSessionObj) => {
    const [sortMode, setSortMode] = useState<SortMode>("top");
    
    const sortedQuestions = useMemo(() => {
        const copy = [...questions]; 
        if(sortMode === "top"){
            return copy.sort((a,b) => b.vote_score - a.vote_score);
        }
        return copy.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }, [questions, sortMode]);

    if(!questions.length) {
        return (
            <p className="text-center text-sm text-muted-foreground">
                    No questions yet. Add a question to get the ball rolling.
            </p>
        )
    }
    
    return (
        <section>
            
            <div className="mb-4 flex items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">Sort:</p>
                    <Button
                        size="sm"
                        variant={sortMode === "top" ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => setSortMode("top")}
                    >
                        Top votes
                    </Button>
                    <Button
                        size="sm"
                        variant={sortMode === "newest" ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => setSortMode("newest")}
                    >
                        Newest
                    </Button>
            </div>

            <div className="space-y-4">
                {sortedQuestions.map((question, index) => (
                    <Card key={question.id} className="shadow-soft">
                        {/* <CardContent className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"> */}
                        <CardContent >
                            <div className="flex gap-4 items-start">
                                <VoteControl
                                    sessionId={sessionId}
                                    question_id={question.id}
                                    vote_score={question.vote_score}
                                    my_vote={question.my_vote}
                                />
                                <div>
                                    {/* rank position  by highest vote */}
                                    {sortMode === "top" && (
                                        <span className="bg-background text-muted-foreground text-sm rounded-full p-1">#{index + 1}</span>
                                    )}
                                    <p className="text font-semibold font-bricolage">
                                        {question.body}
                                    </p>
                                    <p className="text-sm text-muted-foreground">— {question.display_name}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))} 
            </div>
        </section>
    )

}