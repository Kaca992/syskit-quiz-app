import { fetcher } from "../utils/fetcher";
import { IQuestion } from "common/data";

export function getQuestions(questionNumber: number): Promise<IQuestion[]> {
    return fetcher(`api/questions/${questionNumber}`, {hasResult: true});
}
