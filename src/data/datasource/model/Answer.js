class Answer{

    constructor(json, idParent) {
        this.idParent = idParent
        this.id = json.id
        this.answer = json.answer
        this.value = json.value
        this.selected = false
    }
}

export default Answer;
