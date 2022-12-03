#!/usr/bin/env python3

elf_calories = {}
with open('day1/input.txt') as f:
    lines = f.readlines()
    elf_num = 1
    for line in lines:
        current_elf = "elf" + str(elf_num)
        if elf_calories.get(current_elf): 
            if line == '\n':
                elf_num += 1
            else:
                elf_calories[current_elf] = int(line) + elf_calories.get(current_elf)
        else:
            elf_calories[current_elf] = int(line)
f.close()

sorted_elf_calories = sorted(elf_calories.items(), key=lambda x:x[1], reverse = True)
print(sorted_elf_calories[0])
# ('elf65', 70698)
#------PART 2------#
top_elf_calories = sorted_elf_calories[0][1] + sorted_elf_calories[1][1] + sorted_elf_calories[2][1]
print(top_elf_calories)
# 206643