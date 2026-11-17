import { toast } from "@/components/ui/toast"
import { questionService } from "@/service/question-service";
import { Question } from "@/types/questions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const usePostQuestions = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ session_id, body, attendee_token }: { session_id: string; body:string; attendee_token: string }) =>
            questionService.postQuestion(session_id, body, attendee_token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions-list"] });
        },
        onError:(error) => {
            const message = error instanceof Error ? error.message : "Action failed";
            toast.add({ type: "error", description: message });
        }
    })
}

export const useGetQuestions = (session_id: string) => {
    return useQuery({
        queryKey: ["questions-list", session_id],
        queryFn: () => questionService.getQuestions(session_id),
        enabled: !!session_id 
    })
}

export const useVoteQuestion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({question_id, value, attendee_token}:{question_id: string, value: 1 | -1, attendee_token: string}) =>
            questionService.voteQuestion(question_id, value, attendee_token),

        onMutate: async ({question_id, value}) => {
            await queryClient.cancelQueries({queryKey: ["questions-list"]});
            const previousQ = queryClient.getQueryData(["questions-list"]);

            queryClient.setQueriesData({ queryKey: ["questions-list"]}, (old: Question[] | undefined) => {
                if(!old) return old;
                return old.map(q => {
                    if(q.id !==question_id) return q;

                    const isRemoving = q.my_vote === value;
                    const isSwitching = q.my_vote !== null && q.my_vote !== value;

                    let scoreDelta = 0;
                    if(isRemoving) scoreDelta = -value;
                    else if(isSwitching) scoreDelta = value * 2;
                    else scoreDelta = value;

                    return {
                        ...q,
                        vote_score: q.vote_score + scoreDelta,
                        my_vote: isRemoving ? null : value,
                    };
                });
            });
            return { previousQ };
        },

        onError: (_err, _var, context) => {
            if(context?.previousQ) {
                queryClient.setQueriesData({queryKey: ["questions-list"]}, context.previousQ);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["questions-list"]});
        },

    });

}