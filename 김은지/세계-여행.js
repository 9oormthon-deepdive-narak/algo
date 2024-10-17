// 항로 M개, 양방향 가능
// 언어 알아야 방문 가능/ 10개 언어
// 언어 하나 추가 공부 후 방문할 수 있는 서로 다른 나라의 최대 개수
// SOL)
// 1. 그래프 만들기 - 각 노드는 노드 번호와 언어를 가짐
// 2. 선택 언어 루프돌기
// 2-1. 언어 종류 Set으로 구해서 loop (1 언어 제외)
// 2-2. 1과 연결된 노드 중 1의 언어와 선택 언어를 가진 경우 dfs 돌리기 + 방문 처리
const readline = require("readline");

const getGraph = (N, languages, path) => {
  const graph = Array.from({ length: N + 1 }, () => []);

  for (const [src, dst] of path) {
    graph[src].push({ node: dst, language: languages[dst - 1] });
    graph[dst].push({ node: src, language: languages[src - 1] });
  }

  return graph;
};

const getForeignLang = (languages, nativeLang) => {
  const foreignLang = new Set(languages);
  foreignLang.delete(nativeLang);
  return [...foreignLang];
};

const isMyLanguage = (language, nativeLang, leanedLang) => {
  return language === nativeLang || language === leanedLang;
};

const dfs = (N, graph, nativeLang, leanedLang) => {
  const visited = Array.from({ length: N + 1 }, () => false);
  const stack = [1];
  visited[1] = true;

  let cnt = 1;
  while (stack.length > 0) {
    const src = stack.pop();

    for (const { node: dst, language } of graph[src]) {
      if (visited[dst]) continue;
      if (!isMyLanguage(language, nativeLang, leanedLang)) continue;
      cnt++;
      stack.push(dst);
      visited[dst] = true;
    }
  }

  return cnt;
};

const solution = (N, M, languages, path) => {
  const graph = getGraph(N, languages, path);
  const nativeLang = languages[0];
  const foreignLang = getForeignLang(languages, nativeLang);

  const cnts = [];
  for (let leanedLang of foreignLang) {
    // 배울 하나의 언어 선택
    cnts.push(dfs(N, graph, nativeLang, leanedLang));
  }

  console.log(Math.max(...cnts));
};

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  const input = [];
  for await (const line of rl) {
    input.push(line.split(" ").map(Number));
    rl.close();
  }

  solution(input[0][0], input[0][1], input[1], input.slice(2));

  process.exit();
})();
