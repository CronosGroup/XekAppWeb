class Utils {

    static TypesEnum = {"YES_NO": "YES_NO", "SELECT": "SELECT", "MULTIPLE": "MULTIPLE"}
    static Gender = {female: 2, male: 1}
    static Levels = {low: 1, medium: 2, high: 3, infected: 4}

    static validateEmail(email): boolean {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return reg.test(email)
    }
}

export default Utils;
