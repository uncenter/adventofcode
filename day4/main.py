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
        rangeA = (fill_in_range(rangeA))
        rangeB = (fill_in_range(rangeB))
        #print(rangeA, rangeB)
        checkA =  all(item in rangeA for item in rangeB)
        checkB =  all(item in rangeB for item in rangeA)
        if checkA or checkB:
            count += 1
            

print(count)
# 644