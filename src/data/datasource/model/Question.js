import Answer from "./Answer";

class Question {

    constructor(json) {
        this.id = json.id
        this.question = json.question
        this.type = json.type
        this.internal = json.internal
        this.answers = json.answers.map(i => new Answer(i, json.id));
    }
}

export default Question;
