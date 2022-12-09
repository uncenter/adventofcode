#!/usr/bin/env python3

from funcenter import charsplit
with open('day6/input.txt') as f:
    lines = f.readlines()
    code = lines[0]
f.close()

def check(string):
    check = []
    for letter in charsplit(string):
        if letter not in check:
            check.append(letter)
    if len(check) < len(string):
        return False
    else:
        return True

last = ''
character_marker = 0
for char in code:
    character_marker += 1
    if len(last) < 4:
        last += char
    else:
        last = last[1:] + char
        if check(last):
            print('String:',last, 'Marker:', character_marker)
            break
# String: gpfj Marker: 1896
#------PART 2------#
last = ''
character_marker = 0
for char in code:
    character_marker += 1
    if len(last) < 14:
        last += char
    else:
        last = last[1:] + char
        if check(last):
            print('String:',last, 'Marker:', character_marker)
            break
# String: ptdslnzwcjgmvb Marker: 3452