stringZ=abcABC123ABCabc



echo ${stringZ/abc/xyz} # Replace first match of 'abc' with 'xyz'

echo ${stringZ//abc/xyz} # Replace all matches of 'abc' with # 'xyz'


echo --------------------
echo "$stringZ"
echo --------------------

# Can the match and replacement strings be parameterized?
match=abc
repl=000
echo ${stringZ/$match/$repl}
#
echo ${stringZ//$match/$repl}

slash=asdasd/asgasg

match=/
repl=\\/
echo ${slash//$match/$repl}