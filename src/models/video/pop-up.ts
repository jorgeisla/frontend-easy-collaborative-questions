interface Answer {
    label: string;
    value: number;
}

interface Question {
    questioHeader: string;
    answerOptions: Answer[];
    id: number;
    time: number;
}

export type { Question };
