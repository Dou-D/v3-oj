import request from "@/utils/request";

/**
 * 创建实验
 * @param {Array} students 有哪些学生参与本次比赛
 * @param {String} name 本次比赛名称
 * @returns Promise
 */
export function GetAddExamAPI(students, name) {
  return request.post(
    "/exam/add_exam",
    {
      student: students,
      name,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * 添加题目
 * @param {Array} id
 * @returns Promise
 */
export function GetAddQuestionAPI(id, exam_id) {
  return request.post(
    "/exam/add_question",
    { id, exam_id },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * 检查进度
 * @param {number} id
 * @returns Promise
 */
export function GetInspectAPI(id) {
  return request.get("/exam/inspect", { params: { id: id } });
}

export function GetExamListAPI(page, number) {
  return request.get(
    "/exam/list",
    { params: { page, number } },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function GetExamQuestionAPI(id) {
  return request.get(
    "/exam/detail",
    { params: { id } },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
