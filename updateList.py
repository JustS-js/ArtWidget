from os import listdir
from os.path import isfile, join,  dirname
from sys import executable

mypath = dirname(executable)
print(mypath)

files = [f for f in listdir(join(mypath, "images")) if isfile(join(mypath, "images", f))]

with open("ArtWidget_JS.js") as js:
    jsfile = js.readlines()
    jsfile[-2] = f"var filesList = {files};\n"
with open("ArtWidget_JS.js", 'w') as js:
    [js.write(line) for line in jsfile]