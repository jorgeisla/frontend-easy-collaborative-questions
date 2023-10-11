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

export type { Question };
