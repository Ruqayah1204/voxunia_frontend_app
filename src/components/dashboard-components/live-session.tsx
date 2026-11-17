// import { SessionList } from "@/types/session"
import {  CheckCircle2, EyeOff, ThumbsUp } from "lucide-react"
import { Question } from "@/types/questions"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import {Lottie} from "lottie-react"
import waitingAnimation from "@/assets/ConfusingAnalyst.json"


interface LiveSessionObj {
    questions: Question[]
    status: string
    onModerate: (questionId: string, status: "answered" | "hidden") => void;

}

export const LiveQAView = ({ questions, status, onModerate }: LiveSessionObj) => {
    return (
        <section>
            {status === "upcoming" && (
                <>
                    <p className="text-sm text-muted-foreground">
                        Click the Start Session to get the question rolling in.
                    </p>
                    <div className="mx-auto lg:mx-0 lg:ml-20 w-48 sm:w-70">
                        <Lottie src={waitingAnimation} loop autoplay />
                    </div>
                </>
            )}
            {status === "live" && (
                <div className="">
                    {questions.length === 0 && (
                        <>
                            <p className="text-center text-sm text-muted-foreground">
                                No questions yet. Share the session code to start receiving questions.
                            </p>
                            <div className="mx-auto lg:mx-0 lg:ml-20 w-48 sm:w-70">
                                <Lottie src={waitingAnimation} loop autoplay />
                            </div>
                        </>
                    )}
                    <div className="space-y-4">
                        {questions.map((question, index) => (
                            <Card key={question.id} className={cn("shadow-soft", {
                                "opacity-50": question.status === "hidden",
                                "bg-primary/5 ring-primary/40": question.status === "answered"
                            })}>
                                <CardContent className="flex gap-4 items-start">
                                    {/* <div className="flex gap-4 items-start "> */}
                                        <div className="flex shrink-0 flex-col justify-center items-center rounded-xl px-3 py-2 space-y-1 bg-primary/10">
                                            <ThumbsUp className="w-4 h-4 text-primary"/>
                                            <p className="text-lg font-semibold">{question.vote_score}</p>
                                        </div>
                                        <div className=" space-y-2">
                                            {/* rank position  by highest vote */}
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-md bg-secondary px-1.5 py-1 text-[10px] font-semibold text-muted-foreground">#{index + 1}</span>
                                                {question.status === "answered" && (
                                                <span className="inline-flex items-center gap-1 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                                                    <CheckCircle2 className="h-3 w-3" /> Answered
                                                </span>
                                                )}
                                            </div>
                                            <p className="font-semibold font-bricolage">
                                                {question.body}
                                            </p>
                                            <p className="text-sm text-muted-foreground">— {question.display_name}</p>
                                        </div>
                                        <div className="ml-auto flex shrink-0 flex-col sm:flex-row items-center gap-1">
                                            <Button
                                                onClick={() => onModerate(question.id, "answered")}
                                                title="Mark answered"
                                                variant={question.status === "answered" ? "default" : "outline"}
                                                className={cn("w-9 h-9 rounded-full border border-border transition", {
                                                    "bg-primary text-primary-foreground": question.status === "answered",
                                                })}
                                            >
                                                <CheckCircle2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                onClick={() => onModerate(question.id, "hidden")}
                                                title="Hide"
                                                variant={question.status === "hidden" ? "default" : "outline"}
                                                className={cn("w-9 h-9 rounded-full border border-border transition", {
                                                    "bg-primary text-primary-foreground": question.status === "hidden",
                                                })}
                                            >
                                                <EyeOff className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    {/* </div> */}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}