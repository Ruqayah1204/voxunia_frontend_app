import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "./ui/button"
import { useVoteQuestion } from "@/hooks/question-hook"
import { attendeeSession } from "@/lib/attendee-session"
import { cn } from "@/lib/utils"


interface VoteControlProps{
    sessionId: string
    question_id: string
    vote_score: number
    my_vote: number
}

export const VoteControl = ({ sessionId, question_id, vote_score, my_vote }: VoteControlProps) => {
    const voteMutation = useVoteQuestion();

    const handleVote = (value: 1 | -1) => {
        const token = attendeeSession.getToken(sessionId)
        voteMutation.mutate({question_id, value, attendee_token: token ||""})
    }

    return (
        <div className="flex shrink-0 flex-col items-center rounded-xl border border-border bg-background">
            <Button
                type="button"
                variant={my_vote === 1 ? "default" : "ghost"}
                onClick={() => handleVote(1)}
                aria-label="Upvote"
                className="h-9 w-11 rounded-none rounded-t-xl"
            >
                <ChevronUp className="h-5 w-5" />
            </Button>
            <div className="flex items-center justify-center bg-background py-1.5">
                <span className="text-sm font-bold">{vote_score}</span>
            </div>            
            <Button
                type="button"
                variant={my_vote === -1 ? "default" : "ghost"}
                onClick={() => handleVote(-1)}
                aria-label="Downvote"
                className={cn("h-9 w-11 rounded-none rounded-b-xl", my_vote === -1 && "bg-destructive")}
            >
                <ChevronDown className="h-5 w-5" />
            </Button>


        </div>
    )
}