#!/usr/bin/env python3

def play(n, m):
    score = 0
    if n == 'A':
        if m == 'Y':
            score += 6
            score += 2
        elif m == 'X':
            score += 1
            score += 3
        elif m == 'Z':
            score += 3
    elif n == 'B':
        if m == 'Z': 
            score += 6
            score += 3
        elif m == 'X':
            score += 1
        elif m == 'Y':
            score += 2
            score += 3
    else:
        if m == 'X':
            score += 6
            score += 1
        elif m == 'Y':
            score += 2
        elif m == 'Z':
            score += 3
            score += 3
    return score


def play_two(n, m):
    if n == 'A':
        if m == 'X':
            return 'Z'
        elif m == 'Y':
            return 'X'
        elif m == 'Z':
            return 'Y'
    elif n == 'B':
        if m == 'X':
            return 'X'
        elif m == 'Y':
            return 'Y'
        elif m == 'Z':
            return 'Z'
    else:
        if m == 'X':
            return 'Y'
        elif m == 'Y':
            return 'Z'
        elif m == 'Z':
            return 'X'


total_score = 0
with open('day2/input.txt') as f:
    lines = f.readlines()
    for line in lines:
        total_score += play(line[0], line[2])
f.close()
print(total_score)
# 8890
#------PART 2------#
# X = lose, Y = draw, Z = win
total_score = 0
with open('day2/input.txt') as f:
    lines = f.readlines()
    for line in lines:
        total_score += play(line[0], play_two(line[0], line[2]))
f.close()
print(total_score)
# 10238