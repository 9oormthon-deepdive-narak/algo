// 3명의 가수 섭외
// 한 가수 팬클럽 영향력이 두 가수 합보다 작거나 같아야 함
const readline = require("readline");

const solution = (N, powers) => {
  powers.sort((a, b) => a - b);

  let cnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      for (let k = j + 1; k < N; k++) {
        if (powers[k] <= powers[i] + powers[j]) cnt++;
        else break;
      }
    }
  }

  console.log(cnt);
};

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  const input = [];
  for await (const line of rl) {
    input.push(line);
    rl.close();
  }
  solution(Number(input[0]), input[1].split(" ").map(Number));
  process.exit();
})();
