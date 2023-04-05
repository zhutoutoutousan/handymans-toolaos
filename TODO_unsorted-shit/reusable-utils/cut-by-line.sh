# ----------------------------------------------------------------------------
# If you add `read line` up front, then it will jump the first one

# Sample input
# Hello
# World
# how are you

# Sample output
# Hell
# Worl
# how 
while read line
do
    echo $line | cut -c 1-4
done
# ----------------------------------------------------------------------------

