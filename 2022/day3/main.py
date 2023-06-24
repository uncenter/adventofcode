#!/usr/bin/env python3

total_priority = 0
with open('day3/input.txt') as f:
    lines = f.readlines()
    for line in lines:
        rucksackA = line[:int(len(line)/2)]
        if len(line) % 2 != 0:
            rucksackB = line[int(len(line)/2):len(line)-1]
        else:
            rucksackB = line[int(len(line)/2):]
        for char in rucksackA:
            if char in rucksackB:
                match = char
                break
        if match.lower() == match:
            total_priority += ord(match) - 96
        else:
            total_priority += ord(match) - 38
f.close()
print(total_priority)
# 7821
#------PART 2------#
total_priority = 0
with open('day3/input.txt') as f:
    lines = f.readlines()
    line_num = 1
    for line in lines:
        if line_num % 3 == 0:
            rucksackC = line
            for char in rucksackA:
                if char in rucksackB:
                    if char in rucksackC:
                        match = char
                        break
            if match.lower() == match:
                total_priority += ord(match) - 96
            else:
                total_priority += ord(match) - 38
            line_num = 1
        elif line_num % 2 == 0:
            rucksackB = line
            line_num += 1
        else:
            rucksackA = line
            line_num += 1
f.close()
print(total_priority)
# 2752