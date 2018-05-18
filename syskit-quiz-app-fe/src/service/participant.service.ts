import { fetcher } from "../utils/fetcher";
import { IParticipantResult, IParticipant, IParticipantAnswers } from "common/data";

export function addParticipant(participant: IParticipant, answers: IParticipantAnswers[]): Promise<IParticipantResult> {
    return fetcher(`api/participant`,
        { hasResult: true },
        {
            method: 'POST',
            body: JSON.stringify({participant, answers})
        });
}
