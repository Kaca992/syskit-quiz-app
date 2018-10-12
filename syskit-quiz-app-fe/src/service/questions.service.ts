import { fetcher } from "../utils/fetcher";
import { IQuestion, IQuestionRequest } from "common/data";

export function getQuestions(questionRequestInfo: IQuestionRequest): Promise<{ [categoryId: string]: IQuestion[] }> {
    return fetcher(`api/questions/list`, {hasResult: true}, {method: 'POST', body: JSON.stringify(questionRequestInfo)});
}
