#!/usr/bin/env python3

class File:
    def __init__(self, size, name):
        self.name = name
        self.size = int(size)
    def get_size(self):
        return self.size

class Dir:
    def __init__(self, name, parent):
        self.name = name
        self.contains = []
        if parent == None:
            self.parent = self
        else:
            self.parent = parent
    def add(self, thing):
        self.contains.append(thing)
    def get_size(self):
        size = 0
        for file in self.contains:
            size += file.get_size()
        return size
    def get_child(self, name):
        for file in self.contains:
            if file.name == name:
                return file

def run(instruction):
    global current_dir, root
    instruction = instruction.split(' ')
    path = instruction[2]
    if '/' in path:
        current_dir = root
    elif '..' in path:
        current_dir = current_dir.parent
    else:
        current_dir = current_dir.get_child(path)

def add_file(instruction):
    global current_dir
    instruction = instruction.split(' ')
    if instruction[0] == 'dir':
        current_dir.add(Dir(instruction[1], current_dir))
    else:
        current_dir.add(File(instruction[0], instruction[1]))

# MAIN
root = Dir('/', None)
current_dir = root
with open('day7/input.txt') as f:
    lines = f.readlines()
    for line in lines:
        line = line[:-1]
        if line[:4] == '$ cd':
            run(line)
        elif line[:4] != '$ ls':
            print('Adding file:', line.split(' ')[1])
            add_file(line)

def root_size(dir):
    size = 0
    for item in dir.contains:
        if isinstance(item, Dir):
            size += root_size(item)
        else:
            size += int(item.size)
    return size

def gather_dir(dir, level):
    dirs = []
    for item in dir.contains:
        if isinstance(item, Dir):
            dirs.append(item)
            i = gather_dir(item, level+2)
            if i:
                for each in i:
                    dirs.append(each)
    return dirs

def print_file_tree(dir, level):
    print(' '*level + f'- {dir.name} (dir)')
    for item in dir.contains:
        if isinstance(item, Dir):
            print_file_tree(item, level+2)
        else:
            print((' '*level)+'  ' + f'- {item.name} (file, size={item.size})')

print('File Tree:')
print_file_tree(root, 0)

dirs = []
for dir in gather_dir(root, 0):
    size = dir.get_size()
    if size >= 100000:
        pass
    else:
        dirs.append(dir)
total_size = 0
for dir in dirs:
    total_size += dir.get_size()

print(total_size)
# 1297159
#------PART 2------#
dirs = []
unused_space = 70000000 - root_size(root)
needed_space = 30000000 - unused_space
for dir in gather_dir(root, 0):
    size = dir.get_size()
    if size >= needed_space:
        dirs.append(dir)
smallest_dir = [None, None]
for dir in dirs:
    if smallest_dir[1] == None:
        smallest_dir = [dir.name, dir.get_size()]
    else:
        if smallest_dir[1] > dir.get_size():
            smallest_dir = [dir.name, dir.get_size()]
print(smallest_dir)
# ['ghllcw', 3866390]
