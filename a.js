const a = [
   {
      rules: [],
      questions: [
         {
            level: 'Easy',
            description: '123123123',
            options: [
               {
                  option: '123123',
               },
               {
                  option: '23123',
               },
               {
                  option: '123123',
               },
               {
                  option: '13123',
               },
            ],
         },
         {
            level: 'Difficult ',
            description: '123123',
            options: [
               {
                  option: '1231',
               },
               {
                  option: '3123',
               },
               {
                  option: '12312',
               },
               {
                  option: '311',
               },
            ],
         },
         {
            level: 'Easy ',
            description: '2312',
            options: [
               {
                  option: '123',
               },
               {
                  option: '123',
               },
               {
                  option: '123',
               },
               {
                  option: '123',
               },
            ],
         },
         {
            level: 'Medium ',
            description: '12312',
            options: [
               {
                  option: '12312',
               },
               {
                  option: '1231',
               },
               {
                  option: '1323',
               },
               {
                  option: '1231',
               },
            ],
         },
         {
            level: 'Medium ',
            description: '12312',
            options: [
               {
                  option: '12312',
               },
               {
                  option: '1231',
               },
               {
                  option: '1323',
               },
               {
                  option: '1231',
               },
            ],
         },
         {
            level: 'Medium ',
            description: '3123123123',
            options: [
               {
                  option: '2312312',
               },
               {
                  option: '31231',
               },
               {
                  option: '31231',
               },
               {
                  option: '23123',
               },
            ],
         },
         {
            level: 'Easy ',
            description: '1231231',
            options: [
               {
                  option: '3123123',
               },
               {
                  option: '123123',
               },
               {
                  option: '123123',
               },
               {
                  option: '1231',
               },
            ],
         },
         {
            level: 'Easy ',
            description:
               'Một vật dao động điều hòa với phương trình: x = 6cos2(4πt + π/6) cm. Quãng đường vật đi được trong 0,125 s kể từ thời điểm t = 0 là:',
            options: [
               {
                  option: '25,1 cm/s.',
               },
               {
                  option: '2,5 cm/s.',
               },
               {
                  option: ' 63,5 cm/s.  ',
               },
               {
                  option: '6,3 cm/s.',
               },
            ],
         },
         {
            level: 'Difficult ',
            description:
               ' Một vật dao động điều hòa với phương trình: x = 6cos2(4πt + π/6) cm. Quãng đường vật đi được trong 0,125 s kể từ thời điểm t = 0 là:',
            options: [
               {
                  option: '6cm',
               },
               {
                  option: '5cm',
               },
               {
                  option: '4cm',
               },
               {
                  option: '3cm',
               },
            ],
         },
         {
            level: 'Easy ',
            description:
               'Phương trình dao động của một vật dao động điều hòa là: x = - 5cos(10πt + π/6) cm. Chọn đáp án đúng:',
            options: [
               {
                  option: 'Biên độ A = -5 cm',
               },
               {
                  option: ' Pha ban đầu φ = π/6 (rad)',
               },
               {
                  option: 'Chu kì T = 0,2 s',
               },
               {
                  option: 'Li độ ban đầu x0 = 5 cm',
               },
            ],
         },
      ],
      assignedTo: [],
      answers: [1, 2, 1, 1, 1, 2, 2, 3, 3, 1],
      _id: '6586b951f7bba70f8c98aca5',
      testName: 'Lý',
      category: 'lý 1',
      className: 'XII',
      __v: 0,
   },
];

const countQuestionsByLevel = (questions, level) => {
   return questions.filter((question) => question.level.trim().toLowerCase() === level.trim().toLowerCase()).length;
};

const countEasyQuestions = (questions) => countQuestionsByLevel(questions, 'Easy');
const countDifficultQuestions = (questions) => countQuestionsByLevel(questions, 'Difficult');
const countMediumQuestions = (questions) => countQuestionsByLevel(questions, 'Medium');

const countEasy = countEasyQuestions(a[0].questions);
const countDifficult = countDifficultQuestions(a[0].questions);
const countMedium = countMediumQuestions(a[0].questions);

console.log(`Easy: ${countEasy} questions`);
console.log(`Difficult: ${countDifficult} questions`);
console.log(`Medium: ${countMedium} questions`);
