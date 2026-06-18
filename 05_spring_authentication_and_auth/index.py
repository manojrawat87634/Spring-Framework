# def f(s):
#     if s == '':
#         return "" 
#     return f(s[1:]) + s[0]

# s = input("Enter ")
# if (s == f(s)):
#     print('plaindrome')
# else:
#     print("not ")
# # print(f("abc"))

# def gdc(a, b):
#     if b == 0:
#         return a 
#     return gdc(b, a % b)

# a = int(input("Enter "))
# b = int(input("Enter "))
# print(gdc(a, b))

def changeS(name):
    if name == '':
        return ''
    if name[0] in 'aeiou':
        return  '1' + changeS(name[1:]) 
    return name[0] + changeS(name[1:])   
print(changeS("abc"))