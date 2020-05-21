import Question from "./Question";

class QuestionsResponse {

    constructor(json) {
        this.rows = json.rows.map(i => new Question(i));
        this.total = json.total
        this.page = json.page
        this.pageSize = json.pageSize
        this.totalPages = json.totalPages
    }
}

export default QuestionsResponse;
