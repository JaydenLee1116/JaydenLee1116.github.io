---
emoji: 🌱
title: 230201(수)
date: '2023-02-01 23:00:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 성장일지
---

## 🎄 성장일지 3.1

책 `행복한 이기주의자(웨인 다이어)`의 내용에 자극받아 시작하는 소박한 `성장기록`

> 살아있는 꽃과 죽은 꽃은 어떻게 구별하는가?<br/>
> 성장하고 있는 것이 살아 있는 것이다.<br/>
> 생명의 유일한 증거는 성장이다!

> 🌳 키워드 (1.0)<br/>
> 최대한 간단하게 정리, 추후에 보면서 스스로 설명<br/>
> 🍉 경험 위주로 (2.0)<br/>
> 단순 정보를 전달하기보다 무엇을 배웠고 어떻게 해결했는지 짧고 간단하게 작성<br/>
> ❄️ 정해진 템플릿에 맞춰서 (3.0)<br/>
> 키워드, 경험 모두 좋다. 다만 매일 작성하기로 마음 먹은만큼 핵심만 간결하게 정리할 수 있게 템플릿을 작성
> (3.1) 230102부터 시작되는 학습에 관한 내용 추가

## 🔑 오늘의 키워드

### 최대한 함수형 프로그래밍으로 알고리즘 문제 풀기

기존에 풀었던 알고리즘 문제를 다시 풀 기회가 생겼다. 다시 푸는 김에 타입스크립트 + 함수형 프로그래밍을 최대한 지키면서 풀어보기로 했다.

1. [프로그래머스 - K번째 수](https://school.programmers.co.kr/learn/courses/30/lessons/42748)

새로운 풀이

```ts
type NumberArray = number[];

  const solution = (
    array: NumberArray,
    commands: NumberArray[],
  ): NumberArray => {
    return commands.map(
      (command) =>
        array.slice(command[0] - 1, command[1]).sort((a, b) => a - b)[
          command[2] - 1
        ],
    );
  };
```

기존 풀이

```js
function solution(array, commands) {
  let answer = [];
  for (let command of commands) {
    let arr = new Array(...array);
    let i = command[0];
    let j = command[1];
    let k = command[2];
    let tempArr = arr.splice(i - 1, j - i + 1);
    tempArr.sort((a,b) => a-b);
    let num = tempArr[k - 1];
    answer.push(num);
  }
  return answer;
}
```

2. [프로그래머스 - 이상한 문자 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/12930)

새로운 풀이(커링 함수 사용)

```ts
type ChangeString = (word: string) => string;
  const changeOddCapital = (word: string): string => {
    return [...word]
      .map((l, i) => (i % 2 ? l.toLowerCase() : l.toUpperCase()))
      .join('');
  };

  const solutionCurrying =
    (fn: ChangeString) =>
    (s: string): string => {
      return s.split(' ').map(fn).join(' ');
    };

  const solution = solutionCurrying(changeOddCapital);
```

기존 풀이

```js
function solution(s) {
    let words = s.split(' ');
    const changeUpperLower = (word) => {
        let arrWord = [...word]
        for (let i = 0; i < arrWord.length; i++) {
            arrWord[i] = i % 2 === 0 ? arrWord[i].toUpperCase() : arrWord[i].toLowerCase();
        }
        return arrWord.join('');
    }
    return words.map((word) => changeUpperLower(word)).join(' ');
}
```

3. [프로그래머스 - 모의고사](https://school.programmers.co.kr/learn/courses/30/lessons/42840)

새로운 풀이(지저분해도 커링을 극대화 해보기)

```ts
const solutionCurrying =
    (firstPattern: number[]) =>
    (secondPattern: number[]) =>
    (thirdPattern: number[]) =>
    (answers: number[]): number[] => {
      const scores = [
        answers.filter(
          (answer, i) => answer === firstPattern[i % firstPattern.length],
        ).length,
        answers.filter(
          (answer, i) => answer === secondPattern[i % secondPattern.length],
        ).length,
        answers.filter(
          (answer, i) => answer === thirdPattern[i % thirdPattern.length],
        ).length,
      ];
      const maxScore = Math.max(...scores);
      return scores
        .map((score, i) => (score === maxScore ? i + 1 : 0))
        .filter((score) => score);
    };

  let [firstPatterns, secondPatterns, thirdPatterns] = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  const solution =
    solutionCurrying(firstPatterns)(secondPatterns)(thirdPatterns);
```

기존 풀이

```js
function solution(answers) {
    const lengthAns = answers.length;
    const first = [1,2,3,4,5];
    const second = [2,1,2,3,2,4,2,5];
    const third = [3,3,1,1,2,2,4,4,5,5];
    const firstAns = new Array(Math.ceil(lengthAns / first.length)).fill(first).flat();
    const secondAns = new Array(Math.ceil(lengthAns / second.length)).fill(second).flat();
    const thirdAns = new Array(Math.ceil(lengthAns / third.length)).fill(third).flat();
    let countFirst = 0;
    let countSecond = 0;
    let countThird = 0;
    for (let i=0; i < lengthAns; i++) {
        if (answers[i] === firstAns[i]) {
            countFirst++;
        }
        if (answers[i] === secondAns[i]) {
            countSecond++;
        }
        if (answers[i] === thirdAns[i]) {
            countThird++;
        }
    }
    let answer = [];
    let temp = [countFirst, countSecond, countThird];
    let countMax = Math.max(...temp);
    for (let i = 0; i < 3; i++) {
        if (temp[i] === countMax) {
            answer.push(i+1)
        }
    }
    return answer;
    }
```

4. [프로그래머스 - 크레인 인형뽑기 게임](https://programmers.co.kr/learn/courses/30/lessons/64061)

새로운 풀이

```ts
type NumberArray = number[];
  type NumberStack = (number | undefined)[];
  const solution = (board: NumberArray[], moves: NumberArray): number => {
    const stack: NumberStack = [];
    let count: number = 0;
    const machineStacks: NumberArray[] = new Array(board.length)
      .fill(0)
      .map((_, i) =>
        board.flat().filter((num, j) => num && j % board.length === i),
      );
    const pickedNums = moves
      .map((move) => {
        let picked = machineStacks[move - 1].shift();
        return picked ? picked : -1;
      })
      .filter((num) => num >= 0);
    pickedNums.forEach((pickedNum) => {
      let stackPick = stack.pop();
      stackPick === pickedNum ? count++ : stack.push(stackPick, pickedNum);
    });
    return count * 2;
  };
```

기존 풀이

```js
function solution(board, moves) {
    let answer = 0;
    const n = board.length;
    let basket = [];
    let moveToIndex = moves.map((move) => move - 1);

    for (let move of moveToIndex) {
        for (let i = 0; i < n; i++) {
            if (board[i][move]) {
                if (basket[basket.length - 1] === board[i][move]) {
                    basket.pop();
                    board[i][move] = 0;
                    answer += 2;
                    break;
                } else {
                basket.push(board[i][move]);
                board[i][move] = 0;
                break;
                }
            }
        }
    }

    return answer;
}
```

#### 참고자료

- [프로그래머스 - K번째 수](https://school.programmers.co.kr/learn/courses/30/lessons/42748)
- [프로그래머스 - 이상한 문자 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/12930)
- [프로그래머스 - 모의고사](https://school.programmers.co.kr/learn/courses/30/lessons/42840)
- [프로그래머스 - 크레인 인형뽑기 게임](https://programmers.co.kr/learn/courses/30/lessons/64061)

## 📝 요약 및 하루 간단 회고

과거의 코드도 아주 오래전은 아니지만, 이렇게 현재의 코드와 비교해보니 감회가 새롭다. 시간복잡도에 대한 효율성을 테스트해본 것은 아니지만, 목표로 했던 타입스크립트 + 나름의 함수형으로 완성해서
정말 기쁘다. 함수형 프로그래밍을 정말 조금이라도 고려하면서 알고리즘에 적용해본 경험이 정말 값지다. 솔직히 좀더 함수형 느낌으로 순수함수들을 구분하고 파이프를 구축하듯이 하고 싶었는데, 역시나 쉽지는 않았다.
이 정도 공부하고 쉽게쉽게 함수형이 나오면 그것도 재미없으니까..!<br/>
앞으로도 알고리즘을 풀 때, 좀더 다양한 관점으로 접근하도록 노력해봐야겠다. 아직 공부할 것도 많고 나아갈 길도 많지만, 이렇게 이전의 나와 비교해보니 색다른 재미가 있는 것 같다! 

## 오늘의 잘한 점

- 새벽 6시에 일어나서 헬스장 드디어 갔다!!!!!!!
- 타입스크립트에 대해 조금 익숙해진 점
- 함수형 프로그래밍으로 알고리즘을 접근해본 것!(고민해보는 시간이 정말 좋았다!)
  - 조금은 지저분하고 억지스럽지만 커링도 써보려하고, 한줄한줄 함수형으로 고민해본 시간이 정말 뜻깊었다.

## 오늘의 아쉬운 점

- 오늘... 흠... 없다..! 오늘은 그냥 다 잘했다!!! 그렇게 생각하자 ㅎㅎ

```toc

```