export const greetingInstance = {
    count: "",
    greeting: "",
    greet(name) {
        this.greeting =
            "[" +
            this.count++ +
            "]" +
            ` Hello ${name}! E' il ` +
            new Date().toLocaleString();
    },
};
