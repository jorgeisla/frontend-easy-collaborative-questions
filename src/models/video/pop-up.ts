interface Answer {
    label: string;
    value: number;
}

interface Question {
    questionHeader: string;
    answerOptions: Answer[];
    id: number;
    time: number;
    type: 'TOFQ' | 'EQ' | 'AQ';
}

interface CreatedQuestion {
    questionHeader: string;
    id: number;
    time: number;
    type: 'TOFQ' | 'EQ' | 'AQ';
    correctAnswer: number | string;
    answerOptions: Answer[];
}

export type { Question, CreatedQuestion };
