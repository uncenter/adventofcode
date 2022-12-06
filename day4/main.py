from funcenter import uncharsplit
def fill_in_range(nums):
    a = int(nums[0])
    b = int(nums[1])
    result_range = []
    while a != b:
        result_range.append(a)
        a += 1
    result_range.append(b)
    return result_range

count = 0
with open('day4/input.txt') as f:
    lines = f.readlines()
    for line in lines:
        pairs = line.split(',')
        rangeA = pairs[0].split('-')
        if '\n' in pairs[1]:
            rangeB = (pairs[1][:len(pairs[1])-1]).split('-')
        else:
            rangeB = pairs[1].split('-')
        rangeA = uncharsplit(fill_in_range(rangeA))
        rangeB = uncharsplit(fill_in_range(rangeB))
        if rangeA == rangeB:
            pass
        elif rangeA in rangeB:
            count += 1
        elif rangeB in rangeA:
            count += 1

print(count)
# 655