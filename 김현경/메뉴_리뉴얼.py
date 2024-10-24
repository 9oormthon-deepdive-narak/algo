from itertools import combinations
from collections import Counter

def solution(orders, course):
    answer = []
    
    for c in course:
        menu = []
        for order in orders:
            menu += combinations(sorted(order), c)
        most_ordered = Counter(menu)
        
        for m, cnt in most_ordered.items():
            if cnt > 1 and cnt == max(most_ordered.values()):
                answer.append(''.join(m))
    return sorted(answer)