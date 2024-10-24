function combinations(string, num) {
  if (num === 0) return [""];
  const result = [];

  for (let i = 0; i < string.length; i++) {
    const fixed = string[i];
    for (const combination of combinations(string.slice(i + 1), num - 1)) {
      result.push(fixed + combination);
    }
  }

  return result;
}

function solution(orders, course) {
  const result = [];

  const menuCombMap = new Map();
  for (const num of course) {
    for (const order of orders) {
      // course 수 별 나올 수 있는 메뉴 조합
      const menuCombs = combinations([...order].sort().join(""), num);

      // 조합별 주문한 사람 수 업데이트
      menuCombs.forEach((menuComb) => {
        menuCombMap.set(menuComb, (menuCombMap.get(menuComb) || 0) + 1);
      });
    }

    const mostOrderCnt = Math.max(...menuCombMap.values());
    if (mostOrderCnt < 2) continue;
    result.push(...[...menuCombMap.entries()].filter(([, value]) => value === mostOrderCnt).map(([key]) => key));
    menuCombMap.clear();
  }

  return result.sort();
}

// function combinations(string, num) {
//   if (num === 0) return [""];
//   const result = [];

//   for (let i = 0; i < string.length; i++) {
//     const fixed = string[i];
//     for (const combination of combinations(string.slice(i + 1), num - 1)) {
//       result.push(fixed + combination);
//     }
//   }

//   return result;
// }

// function solution(orders, course) {
//   const menuCombMap = new Map();

//   for (const order of orders) {
//     for (const num of course) {
//       if (!menuCombMap.has(num)) menuCombMap.set(num, new Map());

//       // course 수 별 나올 수 있는 메뉴 조합
//       const menuCombs = combinations([...order].sort().join(""), num);

//       // 조합별 주문한 사람 수 업데이트
//       menuCombs.forEach((menuComb) => {
//         menuCombMap.get(num).set(menuComb, (menuCombMap.get(num).get(menuComb) || 0) + 1);
//       });
//     }
//   }

//   return [...menuCombMap.values()]
//     .flatMap((courseMap) => {
//       if (courseMap.size === 0) return [];
//       const mostOrderCnt = Math.max(...courseMap.values());
//       if (mostOrderCnt < 2) return [];
//       return [...courseMap.entries()].filter(([, value]) => value === mostOrderCnt).map(([key]) => key);
//     })
//     .sort();
// }
