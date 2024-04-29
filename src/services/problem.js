import request from "@/utils/request";

/**
 * 题目列表
 * @param {number} page
 * @param {number} number
 * @returns Promise<any>
 */
export function fetchProblemList({ page, number }) {
  return request.get(
    `/question/list`,
    {
      params: { page: page, number: number },
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
/**
 * 做题界面
 * @param {string} problemId
 * @returns Promise<any>
 */
export function fetchProblemDetail(problemId) {
  return request.get(
    "/question/get_question_msg",
    { params: { id: problemId } },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
/**
 *
 * @param {string} answer
 * @param {number} id
 * @returns
 */
export function fetchUploadAnswer(answer, id) {
  return request.post("/question/commit_answer", { answer, id });
}

export function fetchUploadQuestion({ title, content, degree, tag, io }) {
  return request.post(
    "/question/add_question",
    {
      title,
      content,
      degree,
      tag,
      io,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
