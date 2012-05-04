#!/usr/bin/python 
"""
Given a list of directories, prints out a JavaScript array of paths to files 
that end in "_test.html". The output will look something like: 
var _allTests = [ 
	"example/emailvalidator_test.html", 
	"example/factorial_test.html"]; 
""" 
import os.path 
import sys 

def add_test_files(test_files, dirname, names): 
  """File names that end in "_test.html" are added to test_files.""" 
  for name in names: 
    path = os.path.join(dirname, name) 
    if os.path.isfile(path) and name.endswith('_test.html'): 
      pathJsArg = ('"' + path + '"').replace('\\', '/') 
      test_files.append(pathJsArg) 
      
def find_test_files(directory): 
  """Returns the list of files in directory that end in "_test.html".""" 
  if not os.path.exists(directory) or not os.path.isdir(directory): 
    raise Exception('Not a directory: ' + directory) 
  test_files = [] 
  os.path.walk(directory, add_test_files, test_files) 
  return test_files 
  
def usage(): 
  """Displays a message to the user when invalid input is supplied.""" 
  print 'Specify a list of directories that contain _test.html files' 
  
def main(): 
  """Prints the list of JS test files to standard out.""" 
  if len(sys.argv) < 2: 
    usage() 
    sys.exit(-1) 
  else: 
    test_files = [] 
    for directory in sys.argv[1:]: 
      test_files.extend(find_test_files(directory)) 
    print 'var _allTests = [\n\t', 
    print ', \n\t'.join(test_files) + '];' 
if __name__ == '__main__': 
  main() 