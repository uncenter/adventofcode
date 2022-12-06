import string
alphabet = string.ascii_uppercase
stacks = []
def move_stacks(inp):
    global stacks
    x = int(inp[0])
    stackA = int(inp[1])
    stackB = int(inp[2])
    for i in range(x):
        stacks[stackB-1].insert(0, stacks[stackA-1][0])
        stacks[stackA-1].remove(stacks[stackA-1][0])


#------PART 2------#
def move_stacks_two(inp):
    global stacks
    x = int(inp[0])
    stackA = int(inp[1])
    stackB = int(inp[2])
    items = stacks[stackA-1][0:x]
    count = 0
    for item in items:
        stacks[stackB-1].insert(count, item)
        stacks[stackA-1].remove(item)
        count += 1


with open('day5/input.txt') as f:
    lines = f.readlines()
    for i in range(0, (len(lines[0])+1)//4):
        stacks.append([])
    for line in lines:
        for i in range(0, len(line), 4):
            section = line[i:i+4]
            for char in alphabet:
                if char in section:
                    stacks[i//4].append(char)
        if 'move' in line:
            line = line.split(' ')
            command = []
            for word in line:
                if word not in ['move', 'from', 'to']:
                    command.append(word)
            #move_stacks(command)
            move_stacks_two(command)
f.close()

result = ''
print(stacks)
for stack in stacks:
    result += stack[0]
print(result)
# VCTFTJQCG
#------PART 2------#
# GCFGLDNJZ