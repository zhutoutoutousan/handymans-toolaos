#!/bin/bash
# https://tldp.org/LDP/abs/html/string-manipulation.html

# Inserts a blank line between paragraphs of a single-spaced text file.
# Usage: $0 <FILENAME

MINLEN=60   # Change this value? It's a judgement call.
# Assume lines shorter than $MINLEN characters ending in a period
#+ terminate a paragraph.

while read line # For as many lines as the input file has ...
do
    echo "$line"    # Output the line itself

    len=${#line}
    if [[ "$len" -lt]]