import request from "@/utils/request";

/**
 * 
 * @param {Array} students 有哪些学生参与本次比赛
 * @param {String} name 本次比赛名称
 * @returns Promise
 */
export function GetAddExamAPI(students, name) {
  return request.post(
    "/exam/add_exam",
    {
      student: students,
      name: name,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}


