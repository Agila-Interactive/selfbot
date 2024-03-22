interface QuestionBase {
    question : string;
}

interface Number extends QuestionBase {
    type : "number";
    min : number;
    max : number;
}

interface Boolean extends QuestionBase {
    type : "boolean",
    default : boolean;
}

interface String extends QuestionBase {
    type : "string";
}

type Question = Number | Boolean | String;


async function getInput() : Promise<string> {
    let input : string = "";
    for await (const line of console) {
        input = line;
        break;
    }
    return input;
}


async function getBoolean(question : Boolean) : Promise<boolean> {
    let hint = question.default === true ? "(Y/n)" : "(y/N)";
    process.stdout.write(`${question.question} ${hint} `);
    let input : string = await getInput();
    return input === "" || input.toLowerCase() === "y";
}


async function getString(question : String) : Promise<string> {
    process.stdout.write(`${question.question} `);
    let input : string = await getInput();
    if (input === "") {
        process.stdout.write("Input cannot be empty!\n");
        return getString(question);
    }
    return input;
}

async function getNumber(question : Number) : Promise<number> {
    let hint = `(${question.min}-${question.max})`;
    process.stdout.write(`${question.question} ${hint} `);
    let input : number = Number(await getInput());
    if (Number.isNaN(input)) {
        process.stdout.write("Input must be a number!\n");
        return getNumber(question);
    }
    if (input < question.min || input > question.max) {
        process.stdout.write("Input out of range!\n");
        return getNumber(question);
    }
    return input;
}

export async function prompt(question : Question) : Promise<string | boolean | number> {
    switch(question.type) {
        case "boolean":
            return await getBoolean(question);
        case "string":
            return await getString(question);
        case "number":
            return await getNumber(question);
    }
}

console.log(await prompt({
    type: "number",
    question: "Enter a number",
    min: 0,
    max: 5,
}));

console.log(await prompt({
    type: "boolean",
    question: "Are you sure",
    default: true,
}));


console.log(await prompt({
    type: "boolean",
    question: "Are you sure",
    default: false,
}));

console.log(await prompt({
    type: "string",
    question: "Enter a string",

}));
