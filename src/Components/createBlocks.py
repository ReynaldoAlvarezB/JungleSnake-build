

for i in range(16):
    
    num = 255-(i*16)

    print (f'<Block c={{{num - 0}}}/> <Block c={{{num -1}}}/> <Block c={{{num-2}}}/> <Block c={{{num -3}}}/> <Block c={{{num - 4}}}/> <Block c={{{num - 5}}}/> <Block c={{{num - 6}}}/> <Block c={{{num - 7}}}/>')

    num = num- 8

    print (f'<Block c={{{num - 0}}}/> <Block c={{{num -1}}}/> <Block c={{{num-2}}}/> <Block c={{{num -3}}}/> <Block c={{{num - 4}}}/> <Block c={{{num - 5}}}/> <Block c={{{num - 6}}}/> <Block c={{{num - 7}}}/>')