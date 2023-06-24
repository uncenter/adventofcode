#!/usr/bin/env python3
from commoner import reverse

def check_y(y_pos, x_pos, check_tree):
    global lines
    hidden = False
    for i in range(y_pos): # checking trees from the first line until the line of the tree we are on
        if int(lines[i][x_pos]) >= check_tree:
            hidden = True # if this tree is the same height or taller than the tree we are comparing
    if hidden:
        while y_pos != (len(lines)-1): # while the line is not the last line
            if int(lines[y_pos][x_pos]) >= check_tree:
                hidden = True
            y_pos += 1
    return hidden

def check_x(line, x_pos, check_tree):
    hidden = False
    if x_pos != 0 and (x_pos+1) != len(line): # making sure this isnt the first character or last character (automatically visible)
        for tree in line[:x_pos]: # check trees up until our tree
            if int(tree) >= check_tree:
                hidden = True
                break
        if hidden:
            hidden = False
            for tree in line[x_pos+1:]: # check trees after our tree
                if int(tree) >= check_tree:
                    hidden = True
                    break
    return hidden
    

# with open('day8/input.txt') as f:
#     lines = f.readlines()
#     visible = 0
#     y_pos = 0
#     for line in lines:
#         line = line.strip() # remove new line characters
#         x_pos = 0
#         for tree in line:
#             tree = int(tree)
#             if (y_pos+1 != len(lines)) and y_pos != 0: # automatically skipping the first and last lines
#                 if check_x(line, x_pos, tree): # check horizontally
#                     if check_y(y_pos, x_pos, tree) == False: # check vertically
#                         visible += 1
#                         print(tree, 'on line', y_pos+1, 'is visible vertically.')
#                 else:
#                     visible += 1
#                     print(tree, 'on line', y_pos+1, 'is visible horizontally.')
#             else:
#                 visible += 1
#                 print(tree, 'on line', y_pos+1, 'is visible vertically (top or bottom).')
#             x_pos += 1
#         y_pos += 1

# print('Visible trees:', visible)
# Visible trees: 1362
# --- Part Two ---

coordinate_plane = []
y_pos = 0
x_pos = 0
for line in open('day8/input.txt').readlines():
    line = line.strip()
    for tree in line:
        coordinate_plane.append({'x': x_pos, 'y': y_pos, 'height': int(tree)})
        x_pos += 1
    y_pos += 1
    x_pos = 0

def getTree(x, y):
    for tree in coordinate_plane:
        if tree['x'] == x and tree['y'] == y:
            return tree

def countVisibleTrees(x, y, height):
    def getAbove(x, y):
        trees = []
        for tree in coordinate_plane:
            if tree['x'] == x and tree['y'] < y:
                trees.append(tree)
        return trees
    def getBelow(x, y):
        trees = []
        for tree in coordinate_plane:
            if tree['x'] == x and tree['y'] > y:
                trees.append(tree)
        return trees
    def getLeft(x, y):
        trees = []
        for tree in coordinate_plane:
            if tree['y'] == y and tree['x'] < x:
                trees.append(tree)
        return trees
    def getRight(x, y):
        trees = []
        for tree in coordinate_plane:
            if tree['y'] == y and tree['x'] > x:
                trees.append(tree)
        return trees
    above = reverse(getAbove(x, y))
    below = getBelow(x, y)
    left = reverse(getLeft(x, y))
    right = getRight(x, y)
    def checkTrees(trees, height):
        visible = 0
        for tree in trees:
            visible += 1
            if tree['height'] >= height:
                break
        return visible
    return checkTrees(above, height) * checkTrees(below, height) * checkTrees(left, height) * checkTrees(right, height)


most_visible = 0
best_tree = None
for tree in coordinate_plane:
    visible = countVisibleTrees(tree['x'], tree['y'], tree['height'])
    if visible > most_visible:
        most_visible = visible
        best_tree = tree

print('Most visible:', most_visible)
print('Best tree:', best_tree)
# Most visible: 252000
# Best tree: {'x': 48, 'y': 7, 'height': 8}
